import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, PortfolioData, Project, Skill, Blog, ExperienceItem, Testimonial, ContactInfo, Certification } from '../../../core/services/portfolio-data.service';
import { HeroSectionComponent } from './sections/hero-section.component';
import { AboutSectionComponent } from './sections/about-section.component';
import { SkillsSectionComponent } from './sections/skills-section.component';
import { ExperienceSectionComponent } from './sections/experience-section.component';
import { EducationSectionComponent } from './sections/education-section.component';
import { ProjectsPreviewSectionComponent } from './sections/projects-preview-section.component';
import { TestimonialsSectionComponent } from './sections/testimonials-section.component';
import { ApproachSectionComponent } from './sections/approach-section.component';
import { CtaSectionComponent } from './sections/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ProjectsPreviewSectionComponent,
    TestimonialsSectionComponent,
    ApproachSectionComponent,
    CtaSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly portfolio = signal<PortfolioData | null>(null);
  readonly projects = signal<Project[]>([]);
  readonly skills = signal<Skill[]>([]);
  readonly blogs = signal<Blog[]>([]);
  readonly experiences = signal<ExperienceItem[]>([]);
  readonly testimonials = signal<Testimonial[]>([]);
  readonly contact = signal<ContactInfo | null>(null);
  readonly certifications = signal<Certification[]>([]);

  readonly focusAreas = computed(() => {
    const categories = new Set(this.skills().map((skill) => skill.category).filter(Boolean));
    return Array.from(categories);
  });

  constructor(private readonly portfolioService: PortfolioDataService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolio.set(data);
      this.projects.set(data.projects);
      this.skills.set(data.skills);
      this.blogs.set(data.blogs);
      this.experiences.set(data.experience);
      this.testimonials.set(data.testimonials);
      this.contact.set(data.contact);
      this.certifications.set(data.certifications);
    });
  }
}
