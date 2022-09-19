import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeInOut = [
  trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate('0.3s ease-in')),
  ])
]

export const modalAnimation = [
  trigger('modal', [
    state('void', style({
      opacity: 0,
      transform: 'translateY(-100%)'
    })),
    transition('void <=> *', animate('0.3s ease-in-out')),
  ])
]