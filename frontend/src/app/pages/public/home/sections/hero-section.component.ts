import { Component, OnInit, WritableSignal, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface HeroData {
  name: string;
  designation: string;
  intro: string;
  resumeUrl: string;
}

export interface AboutStats {
  experience: string;
  projectsCompleted: number;
  clients: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
  readonly hero = input.required<HeroData>();
  readonly stats = input.required<AboutStats>();

  readonly projectsCount = signal(0);
  readonly clientsCount = signal(0);
  readonly tiltStyle = signal('');

  private readonly reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngOnInit(): void {
    if (this.reducedMotion) {
      this.projectsCount.set(this.stats().projectsCompleted);
      this.clientsCount.set(this.stats().clients);
      return;
    }
    this.animateCount(this.projectsCount, this.stats().projectsCompleted);
    this.animateCount(this.clientsCount, this.stats().clients);
  }

  onPanelMouseMove(event: MouseEvent): void {
    if (this.reducedMotion) {
      return;
    }
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 10;
    const rotateX = y * -10;
    this.tiltStyle.set(`transform: perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  }

  onPanelMouseLeave(): void {
    this.tiltStyle.set('transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }

  private animateCount(target: WritableSignal<number>, endValue: number): void {
    const durationMs = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      target.set(Math.round(endValue * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
}
