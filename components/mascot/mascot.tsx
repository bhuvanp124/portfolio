"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { OUTFITS, buildCharacter } from "@/components/mascot/character";
import { cn } from "@/lib/utils";

type Side = "left" | "right" | "away";
/** "hello" waves for a few seconds on arrival, then settles to idle. */
type Mood = "idle" | "hello" | "wave" | "point" | "thumbs";

interface Cue {
  side: Side;
  say: string;
  accent?: string;
  dark: boolean;
  mood: Mood;
  outfit: number;
}

/**
 * Sections opt in with data attributes:
 *   data-mascot="left|right|away"  data-say="Text with *highlight*"
 *   data-accent="#hex"             data-bubble="dark"
 *   data-mood="idle|hello|wave|point|thumbs"   data-outfit="<index into OUTFITS>"
 * The innermost marker that spans the middle of the viewport wins.
 */
function readCue(): Cue {
  const mid = window.innerHeight * 0.5;
  let hit: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>("[data-mascot]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom > mid) hit = el;
  });
  if (!hit) return { side: "away", say: "", dark: false, mood: "idle", outfit: 0 };
  const el = hit as HTMLElement;
  return {
    side: (el.dataset.mascot as Side) ?? "away",
    say: el.dataset.say ?? "",
    accent: el.dataset.accent,
    dark: el.dataset.bubble === "dark",
    mood: (el.dataset.mood as Mood) ?? "idle",
    outfit: Number(el.dataset.outfit ?? 0),
  };
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

// Turns the rendered character into ink dots on paper, with an ink outline.
const FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 res;
  uniform float cell;
  uniform vec3 ink;
  uniform vec3 paper;
  varying vec2 vUv;
  void main() {
    vec2 px = vUv * res;
    float a = texture2D(tScene, vUv).a;
    if (a < 0.5) { gl_FragColor = vec4(0.0); return; }

    vec2 d = vec2(cell * 0.6) / res;
    float n = texture2D(tScene, vUv + vec2(d.x, 0.0)).a
            * texture2D(tScene, vUv - vec2(d.x, 0.0)).a
            * texture2D(tScene, vUv + vec2(0.0, d.y)).a
            * texture2D(tScene, vUv - vec2(0.0, d.y)).a;
    if (n < 0.5) { gl_FragColor = vec4(ink, 1.0); return; }

    vec2 c = (floor(px / cell) + 0.5) * cell;
    vec4 s = texture2D(tScene, c / res);
    float lum = pow(dot(s.rgb, vec3(0.299, 0.587, 0.114)), 1.0 / 2.2);
    float dark = clamp(1.0 - lum, 0.0, 1.0);
    float r = sqrt(dark) * cell * 0.74;
    float dotMask = 1.0 - smoothstep(r - 0.6, r + 0.6, length(px - c));
    gl_FragColor = vec4(mix(paper, ink, dotMask), 1.0);
  }
`;

function Say({ text, accent }: { text: string; accent?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") ? (
          <span key={i} style={accent ? { color: accent } : undefined} className="bubble-accent">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export default function Mascot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<HTMLButtonElement>(null);
  const [cue, setCue] = useState<Cue>({ side: "away", say: "", dark: false, mood: "idle", outfit: 0 });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const bubble = bubbleRef.current!;
    const hit = hitRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // WebGL can be missing or disabled; without it, the character simply
    // doesn't appear rather than throwing and taking the page down.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    const halfH = Math.tan(THREE.MathUtils.degToRad(15)) * 12;

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-4, 5, 6);
    scene.add(key);

    const ch = buildCharacter();
    const SCALE = 0.84;
    ch.root.scale.setScalar(SCALE);
    scene.add(ch.root);

    const target = new THREE.WebGLRenderTarget(1, 1);
    const post = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      uniforms: {
        tScene: { value: target.texture },
        res: { value: new THREE.Vector2() },
        cell: { value: 4 * dpr },
        ink: { value: new THREE.Vector3(0.043, 0.043, 0.047) },
        paper: { value: new THREE.Vector3(0.969, 0.969, 0.949) },
      },
    });
    const quadScene = new THREE.Scene();
    quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post));
    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let halfW = halfH;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      halfW = halfH * camera.aspect;
      const size = renderer.getDrawingBufferSize(new THREE.Vector2());
      target.setSize(size.x, size.y);
      post.uniforms.res.value.copy(size);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---- state ------------------------------------------------------------ */
    let side: Side = "away";
    let x = 0;
    let y = -9; // starts below the fold and pops up
    let vx = 0; // horizontal velocity while gliding between sides
    let walk = 0; // phase of the little step-bounce while gliding
    let mood: Mood = "idle";
    let moodSince = 0;
    let cheerUntil = 0; // grin after a trick or a change of clothes
    let nodT = -1; // little nod whenever the line changes
    let turn = 0; // body turned toward the content
    let scrollV = 0; // smoothed scroll velocity, px/s
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    let outfit = 0;
    let dressedByHand = false;
    let trickT = -1;
    let nextBlink = 2;
    let mouseX = 0;
    let mouseY = 0;
    let lastSay = "";
    let lastKey = "";
    const clock = new THREE.Clock();

    const sideX = (s: Side) => (s === "left" ? -halfW + 1.7 : halfW - 1.7);

    const wear = (n: number) => {
      outfit = n % OUTFITS.length;
      for (const [name, part] of Object.entries(ch.gear))
        part.visible = OUTFITS[outfit].includes(name as keyof typeof ch.gear);
    };

    const applyCue = () => {
      const c = readCue();
      side = c.side;
      if (c.mood !== mood) {
        mood = c.mood;
        moodSince = clock.getElapsedTime();
      }
      if (c.say !== lastSay) {
        lastSay = c.say;
        if (nodT < 0) nodT = 0;
      }
      if (!dressedByHand && c.outfit !== outfit) wear(c.outfit);
      const key = `${c.side}|${c.say}|${c.dark}`;
      if (key !== lastKey) {
        lastKey = key;
        setCue(c);
      }
    };

    let cueFrame = 0;
    const onScroll = () => {
      const now = performance.now();
      const v = ((window.scrollY - lastScrollY) / Math.max(8, now - lastScrollT)) * 1000;
      scrollV = scrollV * 0.6 + v * 0.4;
      lastScrollY = window.scrollY;
      lastScrollT = now;
      if (!cueFrame)
        cueFrame = requestAnimationFrame(() => {
          cueFrame = 0;
          applyCue();
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const cheer = (seconds: number) => {
      cheerUntil = clock.getElapsedTime() + seconds;
    };
    const trick = () => {
      if (trickT < 0) trickT = 0;
      cheer(1.4);
    };
    const dress = () => {
      dressedByHand = true;
      wear(outfit + 1);
      cheer(1.6);
    };
    window.addEventListener("mascot:trick", trick);
    window.addEventListener("mascot:dress", dress);
    hit.addEventListener("click", trick);

    /* ---- loop ------------------------------------------------------------- */
    const headWorld = new THREE.Vector3();
    let raf = 0;
    applyCue();
    setShown(true);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      // Swapping sides: glide across on a critically damped spring, so it
      // eases out, travels, and settles without overshooting.
      const restY = side === "away" ? -9 : 0;
      if (side !== "away") {
        const tx = sideX(side);
        if (y < -6) {
          // Still below the fold: rise in place rather than sliding in.
          x = tx;
          vx = 0;
        } else if (reduced) {
          x = tx;
        } else {
          const k = 22;
          vx += ((tx - x) * k - vx * 2 * Math.sqrt(k)) * dt;
          x += vx * dt;
        }
      }
      y += (restY - y) * Math.min(1, dt * (reduced ? 60 : 6));
      const speed = Math.min(1, Math.abs(vx) / 6);
      const moving = speed > 0.12;

      // While gliding: a small step-bounce and a lean into the direction of
      // travel. At rest: idle bob, head follows the pointer and the content.
      walk += dt * Math.abs(vx) * 1.8;
      const step = Math.abs(Math.sin(walk)) * 0.3 * speed;
      const facing = side === "left" ? 1 : -1;
      const bob = reduced ? 0 : Math.sin(t * 1.6) * 0.06 * (1 - speed);
      ch.root.position.set(x, y + bob + step, 0);
      const lean = THREE.MathUtils.clamp(-vx * 0.035, -0.2, 0.2);
      ch.root.rotation.z += (lean - ch.root.rotation.z) * Math.min(1, dt * 8);

      // Which pose and face to show right now.
      let pose: Mood = mood === "hello" ? (t - moodSince < 3.2 ? "wave" : "idle") : mood;
      if (moving || reduced) pose = "idle";
      scrollV *= Math.exp(-dt * 5);
      const happy = t < cheerUntil || pose === "thumbs";
      const surprised = !happy && Math.abs(scrollV) > 2200;
      ch.smile.visible = !happy && !surprised;
      ch.grin.visible = happy;
      ch.ooh.visible = surprised;
      const browY = 0.42 + (happy ? 0.05 : 0) + (surprised ? 0.1 : 0);
      ch.brows.forEach((b) => (b.position.y += (browY - b.position.y) * Math.min(1, dt * 12)));

      // Body turns toward the content; the head follows the pointer, glances
      // the way you're scrolling, and nods when the line changes.
      const turnTarget = moving ? Math.sign(vx) * 0.6 : facing * 0.4;
      turn += (turnTarget - turn) * Math.min(1, dt * 5);
      if (nodT >= 0) {
        nodT += dt / 0.55;
        if (nodT >= 1) nodT = -1;
      }
      const nod = nodT >= 0 ? Math.sin(Math.PI * nodT) * 0.22 : 0;
      const scrollLook = THREE.MathUtils.clamp(scrollV / 5000, -0.18, 0.18);
      ch.head.rotation.y += (mouseX * 0.3 - ch.head.rotation.y) * dt * 4;
      ch.head.rotation.x += (mouseY * 0.18 + scrollLook + nod - ch.head.rotation.x) * Math.min(1, dt * 10);
      ch.head.rotation.z = reduced ? 0 : Math.sin(t * 0.9) * 0.04;

      // Arms. The one on the content side does the gesture; the other rests.
      // An arm hangs down at rotation 0; positive z swings it toward +x.
      for (const arm of ch.arms) {
        const s = arm.side;
        const active = s === facing;
        let sh = s * 0.12 + (reduced ? 0 : Math.sin(t * 1.4 + s) * 0.03);
        let el = 0;
        if (active && pose === "wave") {
          sh = s * 2.5;
          el = s * (0.4 + 0.35 * Math.sin(t * 9));
        } else if (active && pose === "point") {
          sh = s * (Math.PI / 2 + 0.3 + Math.sin(t * 3) * 0.04);
          el = -s * 0.08;
        } else if (active && pose === "thumbs") {
          sh = s * 0.9;
          el = s * (2.2 + Math.sin(t * 4) * 0.06);
        }
        arm.shoulder.rotation.z += (sh - arm.shoulder.rotation.z) * Math.min(1, dt * 8);
        arm.elbow.rotation.z += (el - arm.elbow.rotation.z) * Math.min(1, dt * 10);
        arm.digit.visible =
          active && (pose === "point" || pose === "thumbs") && Math.abs(sh - arm.shoulder.rotation.z) < 0.4;
      }

      // Trick: a hop with a full spin.
      let spin = 0;
      if (trickT >= 0) {
        trickT += dt / 1.0;
        const k = Math.min(trickT, 1);
        spin = k * Math.PI * 2;
        ch.root.position.y += Math.sin(Math.PI * k) * 1.4;
        if (trickT >= 1) trickT = -1;
      }
      ch.root.rotation.y = turn + spin;

      // Blink.
      if (t > nextBlink) {
        const b = t - nextBlink;
        const sy = b < 0.07 ? 1 - b / 0.07 : b < 0.14 ? (b - 0.07) / 0.07 : 1;
        ch.eyes.forEach((e) => (e.scale.y = 1.15 * Math.max(0.08, sy)));
        if (b >= 0.14) nextBlink = t + 2.5 + Math.random() * 3;
      }

      renderer.setRenderTarget(target);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(quadScene, quadCam);

      // Anchor the bubble and the click target to the head.
      headWorld.set(ch.root.position.x, ch.root.position.y + (ch.headTop + 0.35) * SCALE, 0).project(camera);
      const hx = (headWorld.x * 0.5 + 0.5) * window.innerWidth;
      const hy = (-headWorld.y * 0.5 + 0.5) * window.innerHeight;
      const bw = bubble.offsetWidth;
      const left = Math.max(16, Math.min(window.innerWidth - bw - 16, hx - bw / 2));
      bubble.style.transform = `translate3d(${left}px, ${hy - bubble.offsetHeight - 14}px, 0)`;
      bubble.style.setProperty("--tail", `${hx - left}px`);
      const visible = side !== "away" && !moving && Math.abs(y) < 0.5;
      bubble.classList.toggle("is-on", visible && lastSay !== "");

      const headPx = ((2.6 * SCALE) / (halfH * 2)) * window.innerHeight;
      hit.style.transform = `translate3d(${hx - headPx / 2}px, ${hy + 10}px, 0)`;
      hit.style.width = hit.style.height = `${headPx}px`;
      hit.style.pointerEvents = visible ? "auto" : "none";
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(cueFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mascot:trick", trick);
      window.removeEventListener("mascot:dress", dress);
      hit.removeEventListener("click", trick);
      target.dispose();
      post.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-30 h-svh w-screen transition-opacity duration-500",
          shown ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={bubbleRef}
        aria-live="polite"
        data-theme={cue.dark ? "dark" : "light"}
        className="bubble pointer-events-none fixed left-0 top-0 z-40"
      >
        <p key={cue.say} className="bubble__text">
          <Say text={cue.say} accent={cue.accent} />
        </p>
      </div>
      <button
        ref={hitRef}
        type="button"
        aria-label="Make the character do a trick"
        className="fixed left-0 top-0 z-40 cursor-pointer rounded-full"
        style={{ pointerEvents: "none" }}
      />
    </>
  );
}
