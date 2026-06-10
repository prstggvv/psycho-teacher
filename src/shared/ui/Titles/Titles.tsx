import cls from './Titles.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface ITitlesProps {
  className?: string;
  uptitle?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  descriptionTone?: 'muted' | 'accent';
}

const Titles = ({
  className,
  uptitle,
  subtitle,
  title,
  description,
  eyebrow,
  align = 'center',
  as = 'h2',
  descriptionTone = 'accent',
}: ITitlesProps) => {
  const TitleTag = as;
  const resolvedTitle = title ?? uptitle ?? '';
  const resolvedDescription = description ?? subtitle ?? '';

  return (
    <div className={classNames(cls.head, { [cls.left]: align === 'left' }, [className ?? ''])}>
      {eyebrow ? <span className={classNames(cls.eyebrow, {}, [])}>{eyebrow}</span> : null}
      <TitleTag className={classNames(cls.title, {}, [])}>{resolvedTitle}</TitleTag>
      {resolvedDescription ? (
        <p className={classNames(cls.leadText, { [cls.muted]: descriptionTone === 'muted' }, [])}>
          {resolvedDescription}
        </p>
      ) : null}
    </div>
  )
};

export default Titles;
