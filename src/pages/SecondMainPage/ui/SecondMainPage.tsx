import cls from './SecondMainPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { HeroSecondSection } from '../../../components/MainComponents/SecondPageComponents/HeroSecondSection';
import { AboutUsSection } from '../../../components/MainComponents/SecondPageComponents/AboutUsSection';

interface ISecondMainPageAsync {
  className?: string;
}

const SecondMainPage = ({ className }: ISecondMainPageAsync) => {
  return (
    <main className={classNames(cls.content, {}, [className ?? ''])}>
      <HeroSecondSection />
      <AboutUsSection />
    </main>
  )
};

export default SecondMainPage;
