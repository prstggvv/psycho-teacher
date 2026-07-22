export const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

export const smoothstep = (v: number) => {
  const x = clamp(v);
  return x * x * (3 - 2 * x);
};
