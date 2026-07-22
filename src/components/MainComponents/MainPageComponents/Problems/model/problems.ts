export type CardVariant = 'cream' | 'dark' | 'ghost';

export interface IProblem {
  num: string;
  title: string;
  variant: CardVariant;
}

export const problems: IProblem[] = [
  { num: '01', title: 'Адаптация к нагрузкам', variant: 'cream' },
  { num: '02', title: 'Готовность к спортивной деятельности — уровень энергии, самоотдача, снятие напряжения', variant: 'ghost' },
  { num: '03', title: 'Проблема спортивной одарённости', variant: 'dark' },
  { num: '04', title: 'Взаимоотношение спортсмена и тренера', variant: 'dark' },
  { num: '05', title: 'Восстановление после травм и поражений', variant: 'ghost' },
  { num: '06', title: 'Потеря мотивации', variant: 'cream' },
];
