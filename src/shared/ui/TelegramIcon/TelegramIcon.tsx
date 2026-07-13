import cls from './TelegramIcon.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface ITelegramIconProps {
  className?: string;
}

const TelegramIcon = ({
  className,
}: ITelegramIconProps) => {
  return (
    <svg
      className={classNames(cls.socialLinkIcon, {}, [])}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 3 11 14" />
      <path d="M22 3 15 21l-4-7-7-4 18-7z" />
    </svg>
  )
};

export default TelegramIcon;
