import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from './Main.module.css';
import { Hero } from "../../../components/MainComponents/MainPageComponents/Hero";
import { About } from "../../../components/MainComponents/MainPageComponents/About";
import { WhatIDoing } from "../../../components/MainComponents/MainPageComponents/WhatIDoing";

interface MainProps {
  className?: string;
}

const Main = ({ className }: MainProps) => {
  return (
    <div className={classNames(cls.main, {}, [className ?? ''])}>
      <Hero />
      <About />
      <WhatIDoing />
    </div>
  )
};

export default Main;
