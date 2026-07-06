import cls from './ContactItem.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  motion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { smoothstep, clamp } from '../../../../../shared/lib/constants';

interface IContactItemProps {
  className?: string;
  label: string;
  value: string;
  href: string;
  index: number;
  expand: MotionValue<number>;
}

export const ContactItem = ({ 
  className, 
  label, 
  value, 
  href, 
  index, 
  expand 
}: IContactItemProps): IContactItemProps => {
  const reveal = useTransform(expand, (e) =>
    smoothstep((e - (0.55 + index * 0.05)) / 0.4),
  );
  const opacity = reveal;
  const y = useTransform(reveal, (v) => `${(1 - v) * 22}px`);

  return (
    <motion.a
      target='_blank'
      className={classNames(cls.item, {}, [className ?? ''])}
      href={href}
      style={{ opacity, y }}
      aria-label={`${label}: ${value}`}
    >
      <span className={cls.itemValue}>
        {value}
      </span>
    </motion.a>
  )
};
