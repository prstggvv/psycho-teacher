import { useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import AppRouter from '../components/AppRouter/AppRouter';
import { classNames } from '../shared/lib/classNames/classNames';
import { setLenis } from '../shared/lib/scrollToSection/scrollToSection';
import './styles/index.css';

function App() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    setLenis(lenisRef.current?.lenis ?? null);
    return () => setLenis(null);
  }, []);

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
      <div className={classNames('app', {}, [])}>
        <div className={classNames('wrapper', {}, [])}>
          <AppRouter />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
