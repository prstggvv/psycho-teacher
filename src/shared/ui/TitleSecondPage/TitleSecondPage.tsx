import cls from './TitleSecondPage.module.css'
import { classNames } from '../../lib/classNames/classNames';
import { fadeUp, VIEWPORT_ONCE } from '../../lib/motion';
import { motion } from 'framer-motion';

interface ITitleSecondPage {
  className?: string;
  title: string;
  subtitle?: string;
  isWhite: boolean;
}

const TitleSecondPage = ({
  className,
  title,
  subtitle,
  isWhite,
}: ITitleSecondPage) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={classNames(cls.block, {}, [className ?? ''])}
    >
      <h2 className={classNames(cls.title, { [cls.white]: isWhite }, [])}>
        {title}
      </h2>

      <p className={classNames(cls.intro, { [cls.white]: isWhite }, [])}>
        {subtitle}
      </p>
    </motion.div>
  )
};

export default TitleSecondPage;
