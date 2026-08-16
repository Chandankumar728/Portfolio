import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, Blog } from '../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../shared/animations';
import { ScrollRevealDirective } from '../../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  animations: [staggerIn]
})
export class BlogsComponent {
  readonly blogs = signal<Blog[]>([]);

  constructor(private readonly portfolioService: PortfolioDataService) {
    this.portfolioService.getBlogs().subscribe((data) => this.blogs.set(data));
  }
}
