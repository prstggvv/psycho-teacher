import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import cls from './Hero.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE } from '../../../../../shared/lib/motion';
import { COUNTRIES } from './countryData';

import { ArrowRight } from 'lucide-react';

interface IHeroProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const ROUTES: number[][][] = [
  [[55, 37], [54, 60], [53, 83], [52, 104], [51, 128], [43, 131]],
  [[51, -0], [50, 10], [50, 20], [50, 30], [55, 37]],
  [[40, -74], [36, -100], [34, -118], [29, -95], [25, -80], [19, -99], [-23, -46], [-34, -58]],
  [[30, 31], [10, 36], [1, 37], [-10, 18], [-26, 28], [-34, 18]],
  [[35, 139], [25, 114], [10, 106], [1, 103], [-6, 107], [-34, 151]],
  [[25, 55], [24, 50], [31, 35], [30, 31]],
  [[51, -0], [45, -30], [40, -74]],
  [[35, 139], [30, 160], [35, -140], [40, -100], [40, -74]],
  [[28, 77], [20, 85], [13, 80]],
  [[60, 10], [60, 30], [60, 50], [60, 60], [55, 37]],
  [[55, 37], [50, 80], [39, 116]],
  [[40, -74], [35, -10], [30, 31]],
  [[51, 10], [48, 16], [44, 26], [40, 28], [35, 36], [30, 31]],
  [[35, 139], [32, 120], [28, 77], [25, 55]],
];

interface TrafficParticle {
  ri: number;
  t: number;
  sp: number;
  red: boolean;
}

interface PulseParticle {
  ri: number;
  t: number;
  sp: number;
  ph: number;
}

interface GlobeScene {
  W: number;
  H: number;
  cx: number;
  cy: number;
  R: number;
  rotLon: number;
  mxSmooth: number;
  mySmooth: number;
  mxTarget: number;
  myTarget: number;
  parts: TrafficParticle[];
  pulses: PulseParticle[];
  lastT: number;
  raf: number;
}

function project(lon: number, lat: number, s: GlobeScene) {
  const lam = (lon - s.rotLon) * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  const tx = s.mySmooth * 0.20;
  const ty = s.mxSmooth * 0.12;

  let x = Math.cos(phi) * Math.sin(lam);
  let y = -Math.sin(phi);
  let z = Math.cos(phi) * Math.cos(lam);

  const y2 = y * Math.cos(tx) - z * Math.sin(tx);
  const z2 = y * Math.sin(tx) + z * Math.cos(tx);
  y = y2; z = z2;

  const x3 = x * Math.cos(ty) + z * Math.sin(ty);
  x = x3;

  return { sx: s.cx + x * s.R, sy: s.cy + y * s.R, vis: z > 0 };
}

function drawPoly(ctx: CanvasRenderingContext2D, lonlats: number[][], s: GlobeScene) {
  const runs: Array<Array<{ sx: number; sy: number }>> = [];
  let run: Array<{ sx: number; sy: number }> | null = null;
  let prevLon: number | null = null;

  for (let i = 0; i < lonlats.length; i++) {
    const [lon, lat] = lonlats[i];
    const p = project(lon, lat, s);
    const cross = prevLon !== null && Math.abs(lon - prevLon) > 180;
    if (!p.vis || cross) { run = null; }
    if (p.vis) {
      if (!run) { run = []; runs.push(run); }
      run.push(p);
    }
    prevLon = lon;
  }

  runs.forEach(r => {
    if (r.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(r[0].sx, r[0].sy);
    for (let i = 1; i < r.length; i++) ctx.lineTo(r[i].sx, r[i].sy);
    ctx.stroke();
  });
}

function gcInterp(la1: number, lo1: number, la2: number, lo2: number, t: number): [number, number] {
  const d = Math.PI / 180;
  const v1 = [Math.cos(la1 * d) * Math.cos(lo1 * d), Math.cos(la1 * d) * Math.sin(lo1 * d), Math.sin(la1 * d)];
  const v2 = [Math.cos(la2 * d) * Math.cos(lo2 * d), Math.cos(la2 * d) * Math.sin(lo2 * d), Math.sin(la2 * d)];
  const dot = Math.min(1, Math.max(-1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
  const om = Math.acos(dot);
  let v: number[];
  if (om < 1e-5) { v = v1; } else {
    const si = Math.sin(om);
    const a = Math.sin((1 - t) * om) / si, b = Math.sin(t * om) / si;
    v = [a * v1[0] + b * v2[0], a * v1[1] + b * v2[1], a * v1[2] + b * v2[2]];
  }
  const m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [
    Math.atan2(v[2] / m, Math.sqrt((v[0] / m) ** 2 + (v[1] / m) ** 2)) * 180 / Math.PI,
    Math.atan2(v[1] / m, v[0] / m) * 180 / Math.PI,
  ];
}

function routePos(route: number[][], t: number): [number, number] {
  const segs = route.length - 1;
  const st = t * segs;
  const si = Math.min(Math.floor(st), segs - 1);
  return gcInterp(route[si][0], route[si][1], route[si + 1][0], route[si + 1][1], st - si);
}

function drawGlobe(ctx: CanvasRenderingContext2D, time: number, s: GlobeScene) {
  ctx.clearRect(0, 0, s.W, s.H);

  const bg = ctx.createRadialGradient(s.cx, s.cy, 0, s.cx, s.cy, s.R);
  bg.addColorStop(0, 'rgba(14,20,36,0.75)');
  bg.addColorStop(0.7, 'rgba(8,12,24,0.6)');
  bg.addColorStop(1, 'rgba(4,6,12,0)');
  ctx.save();
  ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R, 0, Math.PI * 2);
  ctx.fillStyle = bg; ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R, 0, Math.PI * 2); ctx.clip();

  ctx.globalAlpha = 0.10;
  ctx.strokeStyle = '#8899bb';
  ctx.lineWidth = 0.5;
  for (let lat = -75; lat <= 75; lat += 15) {
    const ll: number[][] = [];
    for (let lo = -180; lo <= 180; lo += 2) ll.push([lo, lat]);
    drawPoly(ctx, ll, s);
  }
  for (let lon = -180; lon < 180; lon += 15) {
    const ll: number[][] = [];
    for (let la = -90; la <= 90; la += 2) ll.push([lon, la]);
    drawPoly(ctx, ll, s);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = '#c5cfe0';
  ctx.lineWidth = 0.85;
  ctx.globalAlpha = 0.60;
  COUNTRIES.forEach(ring => {
    const dense: number[][] = [];
    for (let i = 0; i < ring.length - 1; i++) {
      const [lo1, la1] = ring[i], [lo2, la2] = ring[i + 1];
      if (Math.abs(lo2 - lo1) > 180) { dense.push([lo1, la1]); continue; }
      for (let k = 0; k < 4; k++) {
        const t = k / 4;
        dense.push([lo1 + (lo2 - lo1) * t, la1 + (la2 - la1) * t]);
      }
    }
    dense.push(ring[ring.length - 1]);
    drawPoly(ctx, dense, s);
  });
  ctx.globalAlpha = 1;

  ROUTES.forEach((route, ri) => {
    const isHwy = ri < 8;
    ctx.strokeStyle = isHwy ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.16)';
    ctx.lineWidth = isHwy ? 1.0 : 0.6;
    ctx.setLineDash(isHwy ? [] : [4, 5]);
    const steps = 50 * (route.length - 1);
    const ll: number[][] = [];
    for (let k = 0; k <= steps; k++) {
      const [la, lo] = routePos(route, k / steps);
      ll.push([lo, la]);
    }
    drawPoly(ctx, ll, s);
    ctx.setLineDash([]);
  });

  s.parts.forEach(pt => {
    pt.t += pt.sp;
    if (pt.t >= 1) { pt.t = 0; pt.ri = Math.floor(Math.random() * ROUTES.length); }
    const [la, lo] = routePos(ROUTES[pt.ri], pt.t);
    const p = project(lo, la, s);
    if (!p.vis) return;
    const cr = pt.red ? '210,55,55' : '220,225,240';
    const sz = pt.red ? 4.5 : 3.5;
    const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, sz);
    grd.addColorStop(0, `rgba(${cr},0.95)`);
    grd.addColorStop(0.5, `rgba(${cr},0.4)`);
    grd.addColorStop(1, `rgba(${cr},0)`);
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2); ctx.fill();
  });

  s.pulses.forEach(pt => {
    pt.t += pt.sp;
    if (pt.t >= 1) { pt.t = 0; pt.ri = Math.floor(Math.random() * ROUTES.length); }
    const [la, lo] = routePos(ROUTES[pt.ri], pt.t);
    const p = project(lo, la, s);
    if (!p.vis) return;
    const pulse = 0.4 + 0.6 * Math.sin(time * 4 + pt.ph);
    const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 9);
    grd.addColorStop(0, `rgba(235,50,50,${pulse * 0.85})`);
    grd.addColorStop(0.4, `rgba(235,50,50,${pulse * 0.35})`);
    grd.addColorStop(1, 'rgba(235,50,50,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(p.sx, p.sy, 9, 0, Math.PI * 2); ctx.fill();
  });

  ctx.restore();

  ctx.save();
  ctx.strokeStyle = 'rgba(175,188,215,0.60)';
  ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  ctx.save();
  const atm = ctx.createRadialGradient(s.cx, s.cy, s.R * 0.94, s.cx, s.cy, s.R * 1.1);
  atm.addColorStop(0, 'rgba(80,120,220,0.10)');
  atm.addColorStop(0.6, 'rgba(60,100,200,0.04)');
  atm.addColorStop(1, 'rgba(40,80,180,0)');
  ctx.fillStyle = atm;
  ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R * 1.1, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  const wDefs = [
    { angle: -0.3, len: 0.22, rF: 1.065, w: 1.6, a: 0.28, sp: 0.14 },
    { angle: -0.15, len: 0.16, rF: 1.085, w: 0.9, a: 0.16, sp: 0.18 },
    { angle: Math.PI - 0.2, len: 0.20, rF: 1.060, w: 1.5, a: 0.26, sp: -0.12 },
    { angle: Math.PI + 0.1, len: 0.15, rF: 1.080, w: 0.8, a: 0.14, sp: -0.16 },
    { angle: Math.PI * 1.4, len: 0.18, rF: 1.070, w: 1.2, a: 0.20, sp: 0.10 },
    { angle: 0.8, len: 0.16, rF: 1.075, w: 1.0, a: 0.16, sp: -0.13 },
  ];
  wDefs.forEach(({ angle, len, rF, w, a, sp }) => {
    const ang = angle + time * sp;
    ctx.save();
    ctx.strokeStyle = `rgba(165,178,212,${a})`;
    ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R * rF, ang, ang + len * Math.PI * 2); ctx.stroke();
    ctx.restore();
  });

  const eDefs = [
    { angle: 0.4, len: 0.18, rF: 1.058, w: 1.3, a: 0.18, sp: 0.09, scaleY: 0.28 },
    { angle: 2.0, len: 0.15, rF: 1.072, w: 0.9, a: 0.12, sp: -0.11, scaleY: 0.32 },
    { angle: 3.8, len: 0.14, rF: 1.065, w: 0.8, a: 0.10, sp: 0.13, scaleY: 0.25 },
  ];
  eDefs.forEach(({ angle, len, rF, w, a, sp, scaleY }) => {
    const ang = angle + time * sp;
    ctx.save();
    ctx.strokeStyle = `rgba(165,178,212,${a})`;
    ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.translate(s.cx, s.cy); ctx.scale(1, scaleY); ctx.translate(-s.cx, -s.cy);
    ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R * rF, ang, ang + len * Math.PI * 2); ctx.stroke();
    ctx.restore();
  });
}

export const Hero = ({ className, onOpenContactPopup }: IHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<GlobeScene | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prev = sceneRef.current;
    if (prev?.raf) cancelAnimationFrame(prev.raf);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || canvas.parentElement?.offsetWidth || window.innerWidth * 0.58;
    const H = rect.height || window.innerHeight;

    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = window.innerWidth < 680;
    const N_PART = isMobile ? 12 : 28;
    const N_PULSE = isMobile ? 5 : 12;

    sceneRef.current = {
      W, H,
      cx: W / 2,
      cy: H / 2,
      R: Math.min(W, H) * (isMobile ? 0.38 : 0.40),
      rotLon: prev?.rotLon ?? 100,
      mxSmooth: prev?.mxSmooth ?? 0,
      mySmooth: prev?.mySmooth ?? 0,
      mxTarget: prev?.mxTarget ?? 0,
      myTarget: prev?.myTarget ?? 0,
      parts: Array.from({ length: N_PART }, () => ({
        ri: Math.floor(Math.random() * ROUTES.length),
        t: Math.random(),
        sp: 0.0014 + Math.random() * 0.0025,
        red: Math.random() < 0.22,
      })),
      pulses: Array.from({ length: N_PULSE }, () => ({
        ri: Math.floor(Math.random() * ROUTES.length),
        t: Math.random(),
        sp: 0.003 + Math.random() * 0.005,
        ph: Math.random() * Math.PI * 2,
      })),
      lastT: 0,
      raf: 0,
    };

    const loop = (ts: number) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const dt = Math.min((ts - scene.lastT) / 1000, 0.05);
      scene.lastT = ts;
      scene.rotLon += 3.8 * dt;
      scene.mxSmooth += (scene.mxTarget - scene.mxSmooth) * 0.04;
      scene.mySmooth += (scene.myTarget - scene.mySmooth) * 0.04;
      drawGlobe(ctx, ts / 1000, scene);
      scene.raf = requestAnimationFrame(loop);
    };

    sceneRef.current.raf = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) ctx.setTransform(1, 0, 0, 1, 0, 0);
      initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) cancelAnimationFrame(sceneRef.current.raf);
    };
  }, [initCanvas]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (sceneRef.current) {
        sceneRef.current.mxTarget = e.clientX / window.innerWidth - 0.5;
        sceneRef.current.myTarget = e.clientY / window.innerHeight - 0.5;
      }
    };
    const handleTouch = (e: TouchEvent) => {
      if (sceneRef.current) {
        sceneRef.current.mxTarget = e.touches[0].clientX / window.innerWidth - 0.5;
        sceneRef.current.myTarget = e.touches[0].clientY / window.innerHeight - 0.5;
      }
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  return (
    <section
      id="hero"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="hero-title"
    >
      <motion.div
        className={cls.textContent}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
        }}
      >
        <div className={cls.left}>
          <motion.span
            className={cls.eyebrow}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.9, ease: MOTION_EASE } } }}
          >
            Транспортная инфраструктура
          </motion.span>

          <motion.div
            className={cls.rule}
            aria-hidden
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.0, ease: MOTION_EASE } } }}
          />

          <motion.h1
            id="hero-title"
            className={cls.title}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: MOTION_EASE } } }}
          >
            Создаём систему движения.
            <span className={cls.titleAccent}>От хаоса к структуре.</span>
            г. Симферополь
          </motion.h1>
          <motion.p
            className={cls.subtitle}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: MOTION_EASE } } }}
          >
            Строительно-монтажные работы на объектах транспортной инфраструктуры — с собственными бригадами, техникой и инженерным контролем.
          </motion.p>

          <motion.div
            className={cls.actions}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: MOTION_EASE } } }}
          >
            <button
              type="button"
              className={cls.btnPrimary}
              onClick={onOpenContactPopup}
              aria-label="Оставить заявку"
            >
              Оставить заявку
              <ArrowRight
                className={classNames(cls.btnPrimaryIcon, {}, [])}
                strokeWidth={2}
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className={classNames(cls.canvasWrapper, {}, [className ?? ''])} aria-hidden>
        <canvas ref={canvasRef} className={cls.canvas} />
      </div>
    </section>
  );
};
