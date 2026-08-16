import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInfo, ContactPayload, PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly portfolioService = inject(PortfolioDataService);

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal<string | null>(null);
  readonly contact = signal<ContactInfo | null>(null);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => this.contact.set(data.contact));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);
    this.portfolioService.submitContact(this.form.getRawValue() as unknown as ContactPayload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
        this.form.reset();
        setTimeout(() => this.submitted.set(false), 5000);
      },
      error: () => {
        this.submitting.set(false);
        this.error.set('Something went wrong sending your message. Please try again in a moment.');
      }
    });
  }
}
