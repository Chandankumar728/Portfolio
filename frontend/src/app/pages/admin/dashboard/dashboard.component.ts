import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminApiService } from '../../../core/services/admin-api.service';
import { staggerIn } from '../../../shared/animations';

interface DashboardCard {
  title: string;
  value: number;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [staggerIn]
})
export class DashboardComponent implements OnInit {
  readonly cards = signal<DashboardCard[]>([]);
  readonly loading = signal(true);

  constructor(private adminApi: AdminApiService) {}

  ngOnInit(): void {
    forkJoin({
      projects: this.adminApi.getProjects(),
      blogs: this.adminApi.getBlogs(),
      messages: this.adminApi.getMessages(),
      testimonials: this.adminApi.getTestimonials()
    }).subscribe({
      next: ({ projects, blogs, messages, testimonials }) => {
        this.cards.set([
          { title: 'Projects', value: projects.length, icon: 'fa-solid fa-diagram-project', link: '/admin/projects' },
          { title: 'Blogs', value: blogs.length, icon: 'fa-solid fa-newspaper', link: '/admin/blogs' },
          { title: 'Messages', value: messages.length, icon: 'fa-solid fa-envelope', link: '/admin/messages' },
          { title: 'Testimonials', value: testimonials.length, icon: 'fa-solid fa-quote-left', link: '/admin/testimonials' }
        ]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
