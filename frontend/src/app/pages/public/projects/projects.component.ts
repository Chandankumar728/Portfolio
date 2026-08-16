import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, Project } from '../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../shared/animations';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [staggerIn]
})
export class ProjectsComponent {
  readonly projects = signal<Project[]>([]);

  constructor(private readonly portfolioService: PortfolioDataService) {
    this.portfolioService.getProjects().subscribe((data) => this.projects.set(data));
  }
}
