import { ChevronLeft } from 'lucide-react';
import Titles from '../Titles/Titles';
import { PageBreadcrumbs, type PageBreadcrumbItem } from '../PageBreadcrumbs';
import cls from './PageHero.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface PageHeroProps {
  className?: string;
  breadcrumbs: PageBreadcrumbItem[];
  title?: string;
  description?: string;
  backButtonLabel?: string;
  onBack?: () => void;
  variant?: 'default' | 'compact' | 'detail';
  divider?: boolean;
  ariaLabel?: string;
}

export const PageHero = ({
  className,
  breadcrumbs,
  title,
  description,
  backButtonLabel,
  onBack,
  variant = 'default',
  divider = false,
  ariaLabel,
}: PageHeroProps) => {
  const hasIntro = Boolean(title || description);

  return (
    <section
      className={classNames(
        cls.section,
        {
          [cls.compact]: variant === 'compact',
          [cls.detail]: variant === 'detail',
        },
        [className ?? '']
      )}
      aria-label={ariaLabel ?? title ?? 'Заголовок страницы'}
    >
      <div className={classNames(cls.container, {}, [])}>
        <PageBreadcrumbs className={classNames(cls.breadcrumbs, {}, [])} items={breadcrumbs} />

        {backButtonLabel && onBack ? (
          <button type="button" className={classNames(cls.backButton, {}, [])} onClick={onBack}>
            <ChevronLeft className={classNames(cls.backIcon, {}, [])} strokeWidth={1.8} aria-hidden />
            <span>{backButtonLabel}</span>
          </button>
        ) : null}

        {hasIntro ? (
          <div className={classNames(cls.content, { [cls.contentOffset]: variant === 'detail' }, [])}>
            <Titles
              className={classNames(cls.titleBlock, {}, [])}
              title={title}
              description={description}
              descriptionTone="muted"
              align="left"
              as="h1"
            />
          </div>
        ) : null}

        {divider ? <div className={classNames(cls.divider, {}, [])} aria-hidden /> : null}
      </div>
    </section>
  );
};
