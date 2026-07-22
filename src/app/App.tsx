import { useEffect, useRef, useState } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { MotionGlobalConfig } from 'framer-motion';
import AppRouter from '../components/AppRouter/AppRouter';
import { classNames } from '../shared/lib/classNames/classNames';
import { setLenis } from '../shared/lib/scrollToSection/scrollToSection';
import { useIsMobile } from '../shared/lib/hooks/useIsMobile';
import { PageLoader } from '../shared/ui/PageLoader';
import './styles/index.css';

function App() {
  const lenisRef = useRef<LenisRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // On mobile: no framer entrance/appearance animations at all.
  MotionGlobalConfig.skipAnimations = isMobile;

  useEffect(() => {
    if (isMobile) {
      // Native scrolling on mobile — no Lenis smoothing ("тягучесть").
      setLenis(null);
      return;
    }
    setLenis(lenisRef.current?.lenis ?? null);
    return () => setLenis(null);
  }, [isMobile]);

  const content = (
    <>
      {isLoading && <PageLoader onFinish={() => setIsLoading(false)} />}
      <div className={classNames('app', {}, [])}>
        <div className={classNames('wrapper', {}, [])}>
          <AppRouter />
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return content;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {content}
    </ReactLenis>
  );
}

export default App;
