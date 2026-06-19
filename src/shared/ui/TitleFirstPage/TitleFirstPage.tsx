import cls from './TitleFirstPage.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface ITitleFirstPageProps {
  className?: string;
  title: string;
  subtitle: string;
}

const TitleFirstPage = ({
  className,
  title,
  subtitle,
}: ITitleFirstPageProps) => {
  return (
    <div className={classNames(cls.head, {}, [className ?? ''])}>
      <h2 className={classNames(cls.kicker, {}, [])}>
        {title}
      </h2>
      <span className={classNames(cls.range, {}, [])}>
        ({subtitle})</span>
    </div>
  )
};

export default TitleFirstPage;
