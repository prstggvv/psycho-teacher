import { Link } from 'react-router-dom';
import cls from './PageBreadcrumbs.module.css';
import { classNames } from '../../lib/classNames/classNames';

export interface PageBreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBreadcrumbsProps {
  className?: string;
  items: PageBreadcrumbItem[];
}

export const PageBreadcrumbs = ({ className, items }: PageBreadcrumbsProps) => {
  return (
    <nav className={classNames(cls.breadcrumbs, {}, [className ?? ''])} aria-label="Хлебные крошки">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className={classNames(cls.item, {}, [])}>
          {item.to ? (
            <Link to={item.to} className={classNames(cls.breadcrumbLink, {}, [])}>
              {item.label}
            </Link>
          ) : (
            <span className={classNames(cls.breadcrumbCurrent, {}, [])}>{item.label}</span>
          )}

          {index < items.length - 1 ? (
            <span className={classNames(cls.breadcrumbDivider, {}, [])} aria-hidden>
              /
            </span>
          ) : null}
        </span>
      ))}
    </nav>
  );
};
