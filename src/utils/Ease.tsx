export const EASE: Record<string, (t: number) => number> = {
  linear: (t: number): number => t,
  i1: (t: number): number => t * t,
  o1: (t: number): number => t * (2 - t),
  io1: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  i2: (t: number): number => t * t * t,
  o2: (t: number): number => --t * t * t + 1,
  io2: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  i3: (t: number): number => t * t * t * t,
  o3: (t: number): number => 1 - --t * t * t * t,
  io3: (t: number): number =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  i4: (t: number): number => t * t * t * t * t,
  o4: (t: number): number => 1 + --t * t * t * t * t,
  o5: (t: number): number => 1 + --t * t * t * t * t,
  o6: (t: number): number => (1 === t ? 1 : 1 - 2 ** (-10 * t)),
  io4: (t: number): number =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  io6: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  },
  easeInOutSmoother: (t: number): number => {
    const ts = t * t;
    const tc = ts * t;
    return 6 * tc * ts - 15 * ts * ts + 10 * tc;
  },
};
