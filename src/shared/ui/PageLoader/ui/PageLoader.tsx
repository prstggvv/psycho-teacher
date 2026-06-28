import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import cls from './PageLoader.module.css';
import { classNames } from '../../../lib/classNames/classNames';

interface IPageLoaderProps {
  onFinish?: () => void;
  minDuration?: number;
  className?: string;
}

type Stage = 'loading' | 'wiping' | 'done';

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const BRUSH_BANDS = [12, 28, 44, 60, 76, 92];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const PageLoader = ({ onFinish, minDuration = 1700, className }: IPageLoaderProps) => {
  const [stage, setStage] = useState<Stage>('loading');
  const [progress, setProgress] = useState(0);
  const reduced = useRef(prefersReducedMotion());
  useEffect(() => {
    let raf = 0;
    let current = 0;
    const start = performance.now();
    let loaded = document.readyState === 'complete';

    const handleLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', handleLoad);

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeTarget = Math.min(95, (elapsed / minDuration) * 100);
      const target = loaded && elapsed >= minDuration ? 100 : Math.min(timeTarget, 95);

      current += (target - current) * 0.08;
      if (target === 100 && 100 - current < 0.4) current = 100;

      setProgress(Math.round(current));

      if (current >= 100) {
        setStage('wiping');
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', handleLoad);
    };
  }, [minDuration]);

  useEffect(() => {
    if (stage !== 'wiping') return;
    const wipeDuration = reduced.current ? 450 : 1150;
    const timer = window.setTimeout(() => {
      setStage('done');
      onFinish?.();
    }, wipeDuration);
    return () => window.clearTimeout(timer);
  }, [stage, onFinish]);

  useEffect(() => {
    if (stage === 'done') return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [stage]);

  if (stage === 'done') return null;

  const isWiping = stage === 'wiping';
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div
      className={classNames(cls.loader, { [cls.wiping]: isWiping }, [className ?? ''])}
      role="progressbar"
      aria-busy={!isWiping}
      aria-live="polite"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Загрузка сайта"
    >
      <svg
        className={cls.wipeLayer}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="pl-brush" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.14"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={reduced.current ? 0 : 14}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <mask id="pl-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="#fff" />
            <g filter="url(#pl-brush)">
              {BRUSH_BANDS.map((y, i) => (
                <motion.path
                  key={y}
                  d={`M -12 ${y} C 25 ${y - 4}, 55 ${y + 5}, 112 ${y - 2}`}
                  stroke="#000"
                  strokeWidth={20}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isWiping ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{
                    duration: reduced.current ? 0.4 : 0.7,
                    ease: [0.76, 0, 0.24, 1],
                    delay: isWiping ? i * 0.06 : 0,
                  }}
                />
              ))}
            </g>
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="var(--color-cream)"
          mask="url(#pl-mask)"
        />
      </svg>
      <div className={cls.content}>
        <div className={cls.ringWrap}>
          <svg className={cls.ring} viewBox="0 0 120 120" aria-hidden="true">
            <circle
              className={cls.ringTrack}
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
            />
            <circle
              className={cls.ringProgress}
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
            <circle
              className={cls.ringSpark}
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              strokeDasharray={`${RING_CIRCUMFERENCE * 0.12} ${RING_CIRCUMFERENCE}`}
            />
          </svg>
        </div>
        <span className={cls.label}>Еркеева Александра</span>
      </div>
    </div>
  );
};
