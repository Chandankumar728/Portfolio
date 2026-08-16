import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification, EducationInfo } from '../../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../../shared/animations';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.scss',
  animations: [staggerIn]
})
export class EducationSectionComponent {
  readonly education = input.required<EducationInfo>();
  readonly certifications = input.required<Certification[]>();
}
