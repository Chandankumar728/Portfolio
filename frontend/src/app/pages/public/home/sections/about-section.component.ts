import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

export interface AboutData {
  bio: string;
  image: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  readonly about = input.required<AboutData>();
  readonly focusAreas = input<string[]>([]);
  readonly initials = input('CK');
}
