import * as THREE from "three";

/**
 * A small, original character built from primitives. Colours here are only
 * grey levels: the halftone pass turns brightness into dot density, so dark
 * parts (hair, eyes) come out as dense ink and skin/shirt as sparse dots.
 */
export interface Arm {
  /** -1 = the character's screen-left arm, 1 = screen-right. */
  side: -1 | 1;
  shoulder: THREE.Group;
  elbow: THREE.Group;
  /** Extended finger / thumb, shown when pointing or giving a thumbs-up. */
  digit: THREE.Mesh;
}

export interface Character {
  root: THREE.Group;
  head: THREE.Group;
  eyes: THREE.Mesh[];
  brows: THREE.Mesh[];
  /** Mouths: closed smile, open grin, and a surprised "o". */
  smile: THREE.Mesh;
  grin: THREE.Group;
  ooh: THREE.Mesh;
  arms: Arm[];
  gear: { glasses: THREE.Group; headphones: THREE.Group; cap: THREE.Group };
  /** Height of the top of the head above `root`, for anchoring the bubble. */
  headTop: number;
}

/** Outfits cycled by "Dress me up" and worn per project. */
export const OUTFITS: (keyof Character["gear"])[][] = [
  [],
  ["glasses"],
  ["headphones"],
  ["cap"],
  ["glasses", "cap"],
];

const mat = (grey: number) =>
  new THREE.MeshLambertMaterial({ color: new THREE.Color(grey, grey, grey) });

export function buildCharacter(): Character {
  const skin = mat(0.92);
  const hair = mat(0.08);
  const shirt = mat(0.86);
  const dark = mat(0.02);
  const white = mat(1);

  const root = new THREE.Group();

  /* ---- body ------------------------------------------------------------ */
  const torso = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), shirt);
  torso.scale.set(2.05, 1.55, 1.15);
  torso.position.set(0, -3.55, 0);
  root.add(torso);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.11, 12, 32), mat(0.7));
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, -2.05, 0.05);
  root.add(collar);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.6, 24), skin);
  neck.position.set(0, -1.8, 0);
  root.add(neck);

  /* ---- head ------------------------------------------------------------ */
  const head = new THREE.Group();
  head.position.set(0, -0.35, 0);
  root.add(head);

  const skull = new THREE.Mesh(new THREE.SphereGeometry(1.22, 48, 40), skin);
  skull.scale.set(1, 1.04, 0.94);
  head.add(skull);

  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), skin);
    ear.scale.set(0.6, 1, 0.8);
    ear.position.set(side * 1.2, -0.05, 0);
    head.add(ear);
  }

  // Short, neat hair: a cap over the crown plus a side-swept fringe.
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(1.29, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.46),
    hair,
  );
  hairCap.scale.set(1, 1.05, 0.98);
  hairCap.rotation.x = -0.18;
  hairCap.position.set(0, 0.06, -0.04);
  head.add(hairCap);

  const fringe: [number, number, number, number][] = [
    [-0.72, 0.78, 0.72, 0.42],
    [-0.3, 0.92, 0.82, 0.46],
    [0.16, 0.9, 0.84, 0.44],
    [0.58, 0.8, 0.74, 0.38],
    [0.92, 0.55, 0.52, 0.3],
    [-1.02, 0.45, 0.4, 0.3],
  ];
  for (const [x, y, z, r] of fringe) {
    const tuft = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 16), hair);
    tuft.scale.set(1.25, 0.7, 0.9);
    tuft.position.set(x, y, z);
    tuft.rotation.z = -0.35;
    head.add(tuft);
  }

  const eyes: THREE.Mesh[] = [];
  const brows: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 16), dark);
    eye.scale.set(0.85, 1.15, 0.5);
    eye.position.set(side * 0.42, 0.08, 1.1);
    head.add(eye);
    eyes.push(eye);

    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), white);
    glint.position.set(0.05, 0.06, 0.08);
    eye.add(glint);

    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.26, 4, 8), hair);
    brow.rotation.z = Math.PI / 2 + side * -0.12;
    brow.position.set(side * 0.44, 0.42, 1.06);
    head.add(brow);
    brows.push(brow);

    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), mat(0.78));
    cheek.scale.set(1.2, 0.7, 0.3);
    cheek.position.set(side * 0.72, -0.28, 0.92);
    head.add(cheek);
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), mat(0.84));
  nose.position.set(0, -0.12, 1.16);
  head.add(nose);

  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.05, 10, 32, Math.PI * 0.8), dark);
  smile.rotation.z = Math.PI + Math.PI * 0.1;
  smile.position.set(0, -0.36, 1.07);
  head.add(smile);

  // Open grin: a dark half-disc with a lighter tongue.
  const grin = new THREE.Group();
  const mouth = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 32, Math.PI, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0x050505, side: THREE.DoubleSide }),
  );
  grin.add(mouth);
  const tongue = new THREE.Mesh(
    new THREE.CircleGeometry(0.14, 24, Math.PI, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0x9a9a9a, side: THREE.DoubleSide }),
  );
  tongue.position.set(0, -0.13, 0.005);
  grin.add(tongue);
  grin.position.set(0, -0.26, 1.13);
  grin.rotation.x = -0.25;
  grin.visible = false;
  head.add(grin);

  // Surprised "o".
  const ooh = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.05, 10, 24), dark);
  ooh.scale.set(0.85, 1.15, 1);
  ooh.position.set(0, -0.36, 1.08);
  ooh.visible = false;
  head.add(ooh);

  /* ---- accessories (toggled by "Dress me up") ---------------------------- */
  const glasses = new THREE.Group();
  for (const side of [-1, 1]) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.045, 10, 32), dark);
    rim.position.set(side * 0.42, 0.08, 1.16);
    glasses.add(rim);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 8), dark);
    arm.rotation.x = Math.PI / 2;
    arm.position.set(side * 0.7, 0.12, 0.8);
    glasses.add(arm);
  }
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8), dark);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.12, 1.18);
  glasses.add(bridge);
  glasses.visible = false;
  head.add(glasses);

  const headphones = new THREE.Group();
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(1.36, 0.1, 12, 48, Math.PI),
    mat(0.25),
  );
  band.position.set(0, 0.05, 0);
  headphones.add(band);
  for (const side of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.28, 24), mat(0.18));
    cup.rotation.z = Math.PI / 2;
    cup.position.set(side * 1.3, 0, 0);
    headphones.add(cup);
  }
  headphones.visible = false;
  head.add(headphones);

  const cap = new THREE.Group();
  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(1.33, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.42),
    mat(0.45),
  );
  crown.position.y = 0.12;
  cap.add(crown);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.06, 32, 1, false, -Math.PI / 2, Math.PI), mat(0.35));
  brim.scale.set(1, 1, 0.75);
  brim.position.set(0, 0.62, 0.95);
  brim.rotation.x = 0.12;
  cap.add(brim);
  cap.visible = false;
  head.add(cap);

  /* ---- arms -------------------------------------------------------------- */
  // Each arm hangs straight down from the shoulder at rotation 0; poses rotate
  // the shoulder and bend the elbow.
  const makeArm = (side: -1 | 1): Arm => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 1.55, -2.45, 0.2);
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.33, 0.75, 8, 16), shirt);
    upper.position.y = -0.55;
    shoulder.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -1.1;
    shoulder.add(elbow);
    const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.31, 0.6, 8, 16), shirt);
    fore.position.y = -0.45;
    elbow.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 16), skin);
    hand.scale.set(1, 1.05, 0.85);
    hand.position.y = -1.05;
    elbow.add(hand);
    const digit = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.34, 4, 8), skin);
    digit.position.set(side * 0.1, -1.5, 0.05);
    digit.visible = false;
    elbow.add(digit);

    root.add(shoulder);
    return { side, shoulder, elbow, digit };
  };
  const arms = [makeArm(-1), makeArm(1)];

  return {
    root,
    head,
    eyes,
    brows,
    smile,
    grin,
    ooh,
    arms,
    gear: { glasses, headphones, cap },
    headTop: 1.05,
  };
}
