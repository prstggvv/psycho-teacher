export type WordStyle = 'normal' | 'strong' | 'highlight';

export interface IWord {
  text: string;
  style: WordStyle;
}

export const words: IWord[] = [
  { text: 'Меня', style: 'normal' },
  { text: 'зовут', style: 'normal' },
  { text: 'Александра', style: 'strong' },
  { text: 'Еркеева', style: 'strong' },
  { text: '(Чернышева)', style: 'strong' },
  { text: '—', style: 'normal' },
  { text: 'спортивный', style: 'normal' },
  { text: 'тренер', style: 'normal' },
  { text: 'с', style: 'normal' },
  { text: 'опытом', style: 'normal' },
  { text: 'работы', style: 'normal' },
  { text: 'более', style: 'normal' },
  { text: '10 лет', style: 'highlight' },
  { text: 'и', style: 'normal' },
  { text: 'спортивный', style: 'normal' },
  { text: 'психолог.', style: 'normal' },
];
