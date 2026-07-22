import cls from './LineHero.module.css';
import { classNames } from "../../lib/classNames/classNames";

interface ILineHero {
  className?: string;
}

const LineHero = ({ className }: ILineHero) => {
  return (
    <svg
      className={classNames(cls.swash, {}, [className ?? ''])}
      viewBox="0 0 360 18"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={classNames(cls.swashPath, {}, [])}
        d="M5 12 C 70 4, 150 17, 240 8 C 300 2, 340 10, 356 6"
      />
    </svg>
  )
};

export default LineHero;
