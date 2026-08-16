import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../../shared/animations';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-projects-preview-section',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  templateUrl: './projects-preview-section.component.html',
  styleUrl: './projects-preview-section.component.scss',
  animations: [staggerIn]
})
export class ProjectsPreviewSectionComponent {
  readonly projects = input.required<Project[]>();
  readonly preview = computed(() => this.projects().slice(0, 3));
}
