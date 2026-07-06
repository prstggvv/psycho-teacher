import photoOne from '../../../../../shared/assets/images/photoSection/sesta_one.jpg';
import photoTwo from '../../../../../shared/assets/images/photoSection/sestra_second.WEBP';
import photoThree from '../../../../../shared/assets/images/photoSection/sestra_three.WEBP';
import photoFour from '../../../../../shared/assets/images/photoSection/sestra_four.jpg';

export interface IPhoto {
  src: string;
  caption: string;
  x: string;
  width: string;
  from: number;
  to: number;
  rotate: number;
}

export const photos: IPhoto[] = [
  { src: photoOne, caption: 'Корт', x: '-27vw', width: 'clamp(180px, 22vw, 340px)', from: 135, to: -150, rotate: -4 },
  { src: photoTwo, caption: 'Игра', x: '26vw', width: 'clamp(200px, 26vw, 400px)', from: 180, to: -120, rotate: 5 },
  { src: photoThree, caption: 'Фокус', x: '-9vw', width: 'clamp(220px, 30vw, 460px)', from: 225, to: -115, rotate: -2 },
  { src: photoFour, caption: 'Момент', x: '31vw', width: 'clamp(160px, 19vw, 300px)', from: 270, to: -95, rotate: 6 },
];
