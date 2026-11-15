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
  /** On phones, stand full-size here (the hero) instead of sitting in the badge. */
  big: boolean;
}

/**
 * Sections opt in with data attributes:
 *   data-mascot="left|right|away"  data-say="Text with *highlight*"
 *   data-accent="#hex"             data-bubble="dark"
 *   data-mood="idle|hello|wave|point|thumbs"   data-outfit="<index into OUTFITS>"
 *   data-phone="big"  (phones only: stand full-size instead of the corner badge)
 * The innermost marker that spans the middle of the viewport wins.
 */
function readCue(): Cue {
  const mid = window.innerHeight * 0.5;
  let hit: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>("[data-mascot]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom > mid) hit = el;
  });
  if (!hit) return { side: "away", say: "", dark: false, mood: "idle", outfit: 0, big: false };
  const el = hit as HTMLElement;
  return {
    side: (el.dataset.mascot as Side) ?? "away",
    say: el.dataset.say ?? "",
    accent: el.dataset.accent,
    dark: el.dataset.bubble === "dark",
    mood: (el.dataset.mood as Mood) ?? "idle",
    outfit: Number(el.dataset.outfit ?? 0),
    big: el.dataset.phone === "big",
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
  const discRef = useRef<HTMLDivElement>(null);
  const [cue, setCue] = useState<Cue>({
    side: "away",
    say: "",
    dark: false,
    mood: "idle",
    outfit: 0,
    big: false,
  });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const bubble = bubbleRef.current!;
    const hit = hitRef.current!;
    const disc = discRef.current!;
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    const halfH = Math.tan(THREE.MathUtils.degToRad(15)) * 12;

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-4, 5, 6);
    scene.add(key);

    const ch = buildCharacter();
    scene.add(ch.root);

    const target = new THREE.WebGLRenderTarget(1, 1);
    const post = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      uniforms: {
        tScene: { value: target.texture },
        res: { value: new THREE.Vector2() },
        cell: { value: 4 },
        ink: { value: new THREE.Vector3(0.043, 0.043, 0.047) },
        paper: { value: new THREE.Vector3(0.969, 0.969, 0.949) },
      },
    });
    const quadScene = new THREE.Scene();
    quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post));
    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let halfW = halfH;
    let phone = false;
    let dpr = 1;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      phone = w < 1024;
      dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
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
    let big = false;
    // Position (world units) and size, each on its own spring.
    let x = 0;
    let y = -9; // starts below the fold and pops up
    let s = 0.84;
    let vx = 0;
    let vy = 0;
    let vs = 0;
    let badge = 0; // 0 = full character, 1 = shrunk into the corner badge (phones)
    let showUntil = 0; // phones: the bubble only shows for a moment
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
      big = c.big;
      if (c.mood !== mood) {
        mood = c.mood;
        moodSince = clock.getElapsedTime();
      }
      if (c.say !== lastSay) {
        lastSay = c.say;
        if (nodT < 0) nodT = 0;
        showUntil = clock.getElapsedTime() + 4;
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
    // Phone project scenes advance on a timer, not on scroll.
    const poll = window.setInterval(applyCue, 600);

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
    const tap = () => {
      trick();
      showUntil = clock.getElapsedTime() + 4;
    };
    window.addEventListener("mascot:trick", trick);
    window.addEventListener("mascot:dress", dress);
    hit.addEventListener("click", tap);

    /* ---- loop ------------------------------------------------------------- */
    const HEAD_D = 2.44; // head diameter in world units at scale 1
    const BADGE_C = 48; // badge centre, px from the bottom-left corner
    const BADGE_HEAD = 50; // head size inside the badge, px
    const BADGE_DROP = 7; // head sits a little low so the hair fits, px
    const BADGE_R = 30; // clip radius of the badge, px
    let raf = 0;
    applyCue();
    setShown(true);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      // Where the character should be. Desktop: beside the content (or below
      // the fold when "away"). Phones: full-size in the hero, otherwise shrunk
      // into a badge in the bottom-left corner.
      const W = window.innerWidth;
      const H = window.innerHeight;
      const toWX = (px: number) => ((px / W) * 2 - 1) * halfW;
      const toWY = (py: number) => -((py / H) * 2 - 1) * halfH;
      const sizeFor = (headPx: number) => ((headPx / H) * 2 * halfH) / HEAD_D;
      let tx = x;
      let ty = 0;
      let ts = 0.84;
      let tb = 0;
      if (!phone) {
        ty = side === "away" ? -9 : 0;
        if (side !== "away") tx = sideX(side);
      } else if (big) {
        const unit = Math.min(0.2 * H, 0.42 * W);
        ts = sizeFor(unit);
        tx = toWX(W * 0.74);
        ty = toWY(H - unit) + 0.35 * ts;
      } else {
        ts = sizeFor(BADGE_HEAD);
        tx = toWX(BADGE_C);
        ty = toWY(H - BADGE_C + BADGE_DROP) + 0.35 * ts;
        tb = 1;
      }

      // Everything glides on critically damped springs: eases out, travels,
      // and settles without overshooting.
      if (reduced) {
        x = tx;
        y = ty;
        s = ts;
        vx = vy = vs = 0;
      } else {
        if (y < -6) {
          // Still below the fold: rise in place rather than sliding in.
          x = tx;
          s = ts;
          vx = vs = 0;
        }
        const k = 22;
        const c = 2 * Math.sqrt(k);
        vx += ((tx - x) * k - vx * c) * dt;
        vy += ((ty - y) * k - vy * c) * dt;
        vs += ((ts - s) * k - vs * c) * dt;
        x += vx * dt;
        y += vy * dt;
        s += vs * dt;
      }
      badge += (tb - badge) * Math.min(1, dt * (reduced ? 60 : 6));
      // Finer dots in the small badge so the face stays readable.
      post.uniforms.cell.value = (4 - 2 * badge) * dpr;
      ch.root.scale.setScalar(s);
      const speed = Math.min(1, Math.abs(vx) / 6);
      const moving = speed > 0.12;

      // While gliding: a small step-bounce and a lean into the direction of
      // travel. At rest: idle bob, head follows the pointer and the content.
      walk += dt * Math.abs(vx) * 1.8;
      const step = Math.abs(Math.sin(walk)) * 0.36 * speed * s;
      // In the badge it faces into the screen; otherwise toward the content.
      const facing = phone && !big ? 1 : side === "left" ? 1 : -1;
      const bob = reduced ? 0 : Math.sin(t * 1.6) * 0.07 * (1 - speed) * s;
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
      // In the badge it looks straight out at you.
      const turnTarget = moving ? Math.sign(vx) * 0.6 : phone && !big ? 0 : facing * 0.4;
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
        ch.root.position.y += Math.sin(Math.PI * k) * 1.6 * s;
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

      // Screen position of the head, for the bubble, badge clip and tap target.
      const toPX = (wx: number) => ((wx / halfW + 1) / 2) * W;
      const toPY = (wy: number) => ((1 - wy / halfH) / 2) * H;
      const hcx = toPX(x);
      const hcy = toPY(y - 0.35 * s);
      const headTop = toPY(y + (ch.headTop + 0.35) * s);
      const headPx = ((HEAD_D * s) / (2 * halfH)) * H;

      // On phones the full-screen canvas is clipped down to the badge circle.
      if (badge > 0.002) {
        const maxR = Math.hypot(W, H);
        const r = Math.exp(Math.log(maxR) * (1 - badge) + Math.log(BADGE_R) * badge);
        canvas.style.clipPath = `circle(${r}px at ${hcx}px ${hcy - BADGE_DROP * badge}px)`;
      } else {
        canvas.style.clipPath = "";
      }
      disc.style.opacity = String(badge);

      const settled = !moving && Math.abs(y - ty) < 0.3;
      const present = phone || side !== "away";
      // Phones: in the hero the line stays up; from the badge it pops up briefly.
      const talking = phone && !big ? t < showUntil : true;
      const bw = bubble.offsetWidth;
      const left = Math.max(16, Math.min(W - bw - 16, hcx - bw / 2));
      bubble.style.transform = `translate3d(${left}px, ${headTop - bubble.offsetHeight - 14}px, 0)`;
      bubble.style.setProperty("--tail", `${hcx - left}px`);
      bubble.classList.toggle("is-on", present && settled && talking && lastSay !== "");

      const hitPx = Math.max(headPx, 56);
      hit.style.transform = `translate3d(${hcx - hitPx / 2}px, ${hcy - hitPx / 2}px, 0)`;
      hit.style.width = hit.style.height = `${hitPx}px`;
      hit.style.pointerEvents = present && settled ? "auto" : "none";
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(cueFrame);
      window.clearInterval(poll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mascot:trick", trick);
      window.removeEventListener("mascot:dress", dress);
      hit.removeEventListener("click", tap);
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
      <div
        ref={discRef}
        aria-hidden
        className="mascot-disc pointer-events-none fixed bottom-4 left-4 z-[29] h-16 w-16 rounded-full opacity-0"
      />
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
