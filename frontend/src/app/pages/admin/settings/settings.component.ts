import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService, ProfileSettings } from '../../../core/services/admin-api.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly adminApi = inject(AdminApiService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);

  readonly form = this.fb.group({
    heroName: ['', Validators.required],
    heroDesignation: [''],
    heroIntro: [''],
    resumeUrl: [''],
    aboutBio: [''],
    aboutExperience: [''],
    aboutProjectsCompleted: [0],
    aboutClients: [0],
    aboutImage: [''],
    email: [''],
    phone: [''],
    linkedinUrl: [''],
    githubUrl: [''],
    educationInstitution: [''],
    educationDegree: [''],
    educationScore: [''],
    educationDuration: [''],
    educationLocation: ['']
  });

  ngOnInit(): void {
    this.adminApi.getSettings().subscribe({
      next: (settings) => {
        this.form.patchValue(settings);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load settings. Is the backend running?');
        this.loading.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.adminApi.updateSettings(this.form.value as unknown as Partial<ProfileSettings>).subscribe({
      next: () => {
        this.saving.set(false);
        this.success.set('Settings saved.');
        setTimeout(() => this.success.set(null), 3000);
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Could not save settings.');
        setTimeout(() => this.error.set(null), 3000);
      }
    });
  }
}
