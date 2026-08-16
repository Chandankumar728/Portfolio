import { Component, OnInit, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../../core/services/portfolio-data.service';
import { staggerIn } from '../../../../shared/animations';
import { ScrollRevealDirective } from '../../../../shared/scroll-reveal.directive';

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  animations: [staggerIn]
})
export class SkillsSectionComponent implements OnInit {
  readonly skills = input.required<Skill[]>();
  readonly animated = signal(false);

  readonly groups = computed<SkillGroup[]>(() => {
    const byCategory = new Map<string, Skill[]>();
    for (const skill of this.skills()) {
      const category = skill.category || 'Other';
      const bucket = byCategory.get(category) ?? [];
      bucket.push(skill);
      byCategory.set(category, bucket);
    }
    return Array.from(byCategory.entries()).map(([category, skills]) => ({ category, skills }));
  });

  ngOnInit(): void {
    setTimeout(() => this.animated.set(true), 50);
  }
}
