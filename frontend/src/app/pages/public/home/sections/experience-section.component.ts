import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem } from '../../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../../shared/animations';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
  animations: [staggerIn]
})
export class ExperienceSectionComponent {
  readonly experience = input.required<ExperienceItem[]>();
}
