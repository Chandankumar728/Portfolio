import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../../shared/animations';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
  animations: [staggerIn]
})
export class TestimonialsSectionComponent {
  readonly testimonials = input.required<Testimonial[]>();

  stars(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }
}
