export const PHONE_DISPLAY = '+7 978 005 252';
export const PHONE_HREF = 'tel:+7978005252';
export const EMAIL = 'erkeeva.sport@gmail.com';
export const TITLE = 'НА СВЯЗИ';

export interface IContact {
  label: string;
  value: string;
  href: string;
}

export const contacts: IContact[] = [
  { label: 'Телефон', value: PHONE_DISPLAY, href: PHONE_HREF },
  { label: 'Почта', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Telegram', value: 'Telegram', href: 'https://t.me/@tennis1coachmoscow' },
  { label: 'ВКонтакте', value: 'VK', href: 'https://vk.com/id138932826' },
];
