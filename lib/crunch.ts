"use client";

/**
 * The crunch language: crumbs, shards, shakes and the big Crack.
 *
 * Crumbs are spawned into one fixed, pointer-transparent layer over the page, so they can fly out of any
 * container (Swiper rails, tiles, pinned sections) without being clipped, and they remove themselves.
 *
 *  burstAt    — crumbs fly from one or more viewport points on gravity arcs
 *  shake      — a decaying jitter on an element (never a ScrollTrigger-pinned one)
 *  crunchLite — squash, fill flash, small burst, elastic settle (hero "Bite", replays on hover)
 *  playCrack  — the centrepiece for "Snap.": pressure, a crack drawn across the word, the word splits
 *               along it, shockwave, crumb storm, shake, a held beat, elastic rejoin (~4.5s)
 */
type Gsap = typeof import("gsap").gsap;
type Point = { x: number; y: number };

const COLORS = ["#fc9c00", "#e40054", "#fbf5e9", "#6ca800", "#fc9c00", "#fbf5e9"];

/** Crack line in % of the word box. Shared by the SVG path, the clip-path pieces and the crumb origins. */
export const CRACK: [number, number][] = [
  [-2, 46],
  [18, 52],
  [30, 41],
  [45, 58],
  [58, 44],
  [72, 56],
  [86, 47],
  [102, 53],
];
export const CRACK_PATH = CRACK.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const pt = ([x, y]: [number, number]) => `${x}% ${y}%`;
export const polys = {
  top: `polygon(-2% -10%, 102% -10%, ${[...CRACK].reverse().map(pt).join(", ")})`,
  bot: `polygon(${CRACK.map(pt).join(", ")}, 102% 110%, -2% 110%)`,
};

let layer: HTMLDivElement | null = null;
function getLayer() {
  if (!layer || !layer.isConnected) {
    layer = document.createElement("div");
    layer.className = "pointer-events-none fixed inset-0 z-[85] overflow-hidden";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
  }
  return layer;
}

export interface BurstOpts {
  count?: number;
  shards?: number;
  /** horizontal reach in px */
  spread?: number;
  /** how high the arc goes in px */
  lift?: number;
  size?: [number, number];
  duration?: [number, number];
}

export function burstAt(gsap: Gsap, origins: Point[], opts: BurstOpts = {}) {
  const { count = 24, shards = 0, spread = 220, lift = 160, size = [4, 11], duration = [0.9, 1.5] } = opts;
  const host = getLayer();
  const total = count + shards;
  for (let i = 0; i < total; i++) {
    const o = origins[Math.floor(Math.random() * origins.length)];
    const shard = i >= count;
    const w = shard ? gsap.utils.random(5, 8) : gsap.utils.random(size[0], size[1]);
    const h = shard ? gsap.utils.random(12, 22) : w;
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;left:${o.x}px;top:${o.y}px;width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;border-radius:${shard ? "3px" : "999px"};background:${COLORS[i % COLORS.length]};will-change:transform,opacity;`;
    host.appendChild(s);
    const dx = gsap.utils.random(-spread, spread);
    const up = -gsap.utils.random(lift * 0.3, lift);
    const down = gsap.utils.random(lift * 0.7, lift * 1.7);
    gsap.fromTo(
      s,
      { x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 },
      {
        keyframes: {
          x: [0, dx * 0.65, dx],
          y: [0, up, down],
          scale: [0, gsap.utils.random(0.9, 1.7), 0.45],
          rotate: [0, gsap.utils.random(-200, 200), gsap.utils.random(-420, 420)],
          opacity: [1, 1, 0],
          easeEach: "power1.out",
        },
        duration: gsap.utils.random(duration[0], duration[1]) * (shard ? 1.3 : 1),
        ease: "none",
        onComplete: () => s.remove(),
      },
    );
  }
}

/** Decaying jitter. Do not point this at an element ScrollTrigger is pinning. */
export function shake(gsap: Gsap, el: Element, strength = 6, duration = 0.5) {
  const n = Math.max(6, Math.round(duration / 0.045));
  const frames = Array.from({ length: n }, (_, i) => {
    const k = 1 - i / n;
    return { x: (i % 2 ? 1 : -1) * strength * k, y: (i % 3 ? 0.6 : -0.8) * strength * k, duration: 0.045 };
  });
  return gsap.fromTo(el, { x: 0, y: 0 }, { keyframes: [...frames, { x: 0, y: 0, duration: 0.06 }], ease: "none" });
}

/** Points spread along a box, at a given height fraction. */
export function pointsAcross(el: Element, count = 5, yFrac = 0.55): Point[] {
  const r = el.getBoundingClientRect();
  return Array.from({ length: count }, (_, i) => ({ x: r.left + (r.width * (i + 0.5)) / count, y: r.top + r.height * yFrac }));
}

/** Small crunch: squash, instant fill, burst, jolt, elastic settle, fill fades out. */
export function crunchLite(gsap: Gsap, el: HTMLElement, fillTarget: HTMLElement, shakeTarget?: Element | null) {
  const tl = gsap.timeline();
  tl.to(el, { scaleX: 1.05, scaleY: 0.93, duration: 0.24, ease: "power2.in" })
    .add(() => fillTarget.classList.add("stroke-fill"))
    .call(() => burstAt(gsap, pointsAcross(el, 5), { count: 20, shards: 4, spread: 190, lift: 140, duration: [0.8, 1.3] }))
    .to(el, { x: 5, duration: 0.04, repeat: 5, yoyo: true, ease: "none" })
    .to(el, { scaleX: 1, scaleY: 1, x: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" })
    .add(() => {
      fillTarget.classList.add("fill-fade");
      fillTarget.classList.remove("stroke-fill");
    }, "-=0.45")
    .add(() => fillTarget.classList.remove("fill-fade"), "+=0.6");
  if (shakeTarget) tl.call(() => shake(gsap, shakeTarget, 4, 0.35), [], 0.24);
  return tl;
}

/**
 * The Crack. `host` holds: [data-word] (whole word, split into chars), [data-top] / [data-bot] (clip-path
 * halves), [data-crack] path (SVG in % coords), [data-shock] (ring). Returns the timeline (~4.5s).
 */
export function playCrack(gsap: Gsap, host: HTMLElement, shakeTarget?: Element | null) {
  const whole = host.querySelector<HTMLElement>("[data-word]")!;
  const top = host.querySelector<HTMLElement>("[data-top]")!;
  const bot = host.querySelector<HTMLElement>("[data-bot]")!;
  const svg = host.querySelector<SVGElement>("[data-crack]")!;
  const path = svg.querySelector("path")!;
  const ring = host.querySelector<HTMLElement>("[data-shock]")!;
  const chars = whole.querySelectorAll<HTMLElement>("[data-piece]");
  const pieces = [top, bot];
  const len = path.getTotalLength();
  const origins = () => {
    const r = whole.getBoundingClientRect();
    return CRACK.slice(1, -1).map(([px, py]) => ({ x: r.left + (r.width * px) / 100, y: r.top + (r.height * py) / 100 }));
  };
  const glow = "0 0 0.22em rgba(252,156,0,0.6)";

  const tl = gsap.timeline();
  // 1. the letters land
  tl.fromTo(chars, { scale: 0.3, y: 40, opacity: 0, rotate: () => gsap.utils.random(-30, 30) }, { scale: 1, y: 0, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(2.5)", stagger: 0.05 });
  // 2. pressure builds: squash + tremor
  tl.to(whole, { scaleX: 1.06, scaleY: 0.92, duration: 0.5, ease: "power2.in" }, "+=0.2");
  tl.to(whole, { x: 2, duration: 0.04, repeat: 13, yoyo: true, ease: "none" }, "<");
  // 3. the crack draws across
  tl.set(svg, { opacity: 1 }, "<0.05");
  tl.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.55, ease: "power3.in" }, "<");
  tl.call(() => burstAt(gsap, origins(), { count: 10, spread: 70, lift: 60, size: [3, 6], duration: [0.5, 0.8] }), [], "<0.3");
  // 4. SNAP
  tl.addLabel("snap");
  tl.set(whole, { opacity: 0, scaleX: 1, scaleY: 1, x: 0 }, "snap");
  tl.set(pieces, { opacity: 1, yPercent: 0, x: 0, rotate: 0 }, "snap");
  tl.add(() => pieces.forEach((p) => p.classList.add("stroke-fill")), "snap");
  tl.fromTo(pieces, { filter: "brightness(2.4)", textShadow: "0 0 0.6em rgba(252,156,0,0.9)" }, { filter: "brightness(1)", textShadow: glow, duration: 0.7, ease: "power2.out" }, "snap");
  tl.to(top, { yPercent: -9, x: -12, rotate: -3, duration: 0.6, ease: "back.out(2)" }, "snap");
  tl.to(bot, { yPercent: 9, x: 12, rotate: 2.5, duration: 0.6, ease: "back.out(2)" }, "snap");
  tl.fromTo(ring, { scale: 0.2, opacity: 0.9 }, { scale: 3.2, opacity: 0, duration: 1.1, ease: "expo.out" }, "snap");
  tl.call(() => burstAt(gsap, origins(), { count: 44, shards: 10, spread: 340, lift: 240, size: [4, 13], duration: [1, 1.8] }), [], "snap");
  if (shakeTarget) tl.call(() => shake(gsap, shakeTarget, 8, 0.55), [], "snap");
  tl.to(path, { opacity: 0.45, duration: 0.6 }, "snap+=0.25");
  // 5. the held beat: the halves breathe apart
  tl.to(top, { yPercent: -12, duration: 0.75, yoyo: true, repeat: 1, ease: "sine.inOut" }, "snap+=0.65");
  tl.to(bot, { yPercent: 12, duration: 0.75, yoyo: true, repeat: 1, ease: "sine.inOut" }, "snap+=0.65");
  // 6. rejoin
  tl.addLabel("join", "snap+=2.2");
  tl.to(pieces, { yPercent: 0, x: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" }, "join");
  tl.to(pieces, { textShadow: "0 0 0em rgba(252,156,0,0)", duration: 0.6 }, "join+=0.3");
  tl.to(svg, { opacity: 0, duration: 0.5 }, "join");
  tl.add(() => {
    pieces.forEach((p) => {
      p.classList.add("fill-fade");
      p.classList.remove("stroke-fill");
    });
  }, "join+=0.5");
  tl.add(() => pieces.forEach((p) => p.classList.remove("fill-fade")), "join+=1.05");
  tl.set(pieces, { opacity: 0 }, "join+=1.05");
  tl.set(whole, { opacity: 1 }, "join+=1.05");
  return tl;
}
