import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './SectionUnderlineLink.module.css';
import { classNames } from '../../../lib/classNames/classNames';

interface SectionUnderlineLinkProps {
  to: string;
  label: string;
  className?: string;
}

export const SectionUnderlineLink = ({ to, label, className }: SectionUnderlineLinkProps) => {
  return (
    <Link to={to} className={classNames(cls.link, {}, [className ?? ''])}>
      <span className={classNames(cls.label, {}, [])}>{label}</span>
      <ArrowRight className={classNames(cls.icon, {}, [])} strokeWidth={2.2} aria-hidden />
      <span className={classNames(cls.baseLine, {}, [])} aria-hidden />
      <span className={classNames(cls.accentLine, {}, [])} aria-hidden />
    </Link>
  );
};
