import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const routeFade = trigger('routeFade', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [style({ opacity: 0, transform: 'translateY(14px)' })], { optional: true }),
    query(':leave', [style({ position: 'absolute', width: '100%' })], { optional: true }),
    query(
      ':leave',
      [animate('0.2s ease', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [animate('0.35s 0.05s cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))],
      { optional: true }
    )
  ])
]);

export const staggerIn = trigger('staggerIn', [
  transition(':enter, * => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(16px)' }),
      stagger(70, [
        animate('0.5s cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);
