import cls from './Header.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
interface IHeaderData {
  className?: string;
}

export const Header = ({ className, }: IHeaderData) => {
  return (
    <header className={classNames(cls.header, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>
      </div>
    </header>
  );
};
