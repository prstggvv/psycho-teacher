import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from './Main.module.css';
import { Hero } from "../../../components/MainComponents/MainPageComponents/Hero";
import { About } from "../../../components/MainComponents/MainPageComponents/About";
import { WhatIDoing } from "../../../components/MainComponents/MainPageComponents/WhatIDoing";
import { Problems } from "../../../components/MainComponents/MainPageComponents/Problems";
import { Contact } from "../../../components/MainComponents/MainPageComponents/Contact";
import { Footer } from "../../../components/Footer";
import { PhotoSection } from "../../../components/MainComponents/MainPageComponents/PhotoSection";

interface MainProps {
  className?: string;
}

const Main = ({ className }: MainProps) => {
  return (
    <div className={classNames(cls.main, {}, [className ?? ''])}>
      <Hero />
      <About />
      <WhatIDoing />
      <PhotoSection />
      <Problems />
      <Contact />
      <Footer />
    </div>
  )
};

export default Main;
