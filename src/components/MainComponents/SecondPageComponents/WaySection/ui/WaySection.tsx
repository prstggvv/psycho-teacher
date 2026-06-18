import cls from './WaySection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface IWaySection {
  className?: string;
}

export const WaySection = ({ className }: IWaySection) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>

      </div>
    </section>
  )
};
