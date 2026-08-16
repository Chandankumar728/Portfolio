import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { staggerIn } from '../../../../shared/animations';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

interface ApproachStep {
  index: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-approach-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './approach-section.component.html',
  styleUrl: './approach-section.component.scss',
  animations: [staggerIn]
})
export class ApproachSectionComponent {
  readonly steps: ApproachStep[] = [
    { index: '01', title: 'Understand', description: 'Clarify the real problem and constraints before writing any code.', icon: 'fa-solid fa-magnifying-glass' },
    { index: '02', title: 'Architect', description: 'Design a data model and API contract that scales with the product.', icon: 'fa-solid fa-sitemap' },
    { index: '03', title: 'Build', description: 'Write clean, typed, maintainable code across the full stack.', icon: 'fa-solid fa-code' },
    { index: '04', title: 'Test', description: 'Validate correctness and edge cases before anything ships.', icon: 'fa-solid fa-vial' },
    { index: '05', title: 'Deploy', description: 'Ship with CI/CD and containerized, reproducible environments.', icon: 'fa-solid fa-rocket' },
    { index: '06', title: 'Improve', description: 'Monitor real usage and iterate based on what actually matters.', icon: 'fa-solid fa-arrows-rotate' }
  ];

  readonly stack = [
    { label: 'Angular', icon: 'fa-brands fa-angular' },
    { label: 'REST API', icon: 'fa-solid fa-diagram-project' },
    { label: 'Spring Boot', icon: 'fa-solid fa-leaf' },
    { label: 'PostgreSQL', icon: 'fa-solid fa-database' }
  ];
}
