import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService, ContactMessage } from '../../../core/services/admin-api.service';
import { staggerIn } from '../../../shared/animations';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  animations: [staggerIn]
})
export class MessagesComponent implements OnInit {
  readonly messages = signal<ContactMessage[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly expandedId = signal<number | null>(null);
  readonly deletingId = signal<number | null>(null);

  constructor(private adminApi: AdminApiService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  private fetchMessages(): void {
    this.loading.set(true);
    this.adminApi.getMessages().subscribe({
      next: (data) => {
        this.messages.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load messages. Is the backend running?');
        this.loading.set(false);
      }
    });
  }

  toggleExpanded(id: number): void {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  confirmDelete(id: number): void {
    this.deletingId.set(id);
  }

  cancelDelete(): void {
    this.deletingId.set(null);
  }

  deleteConfirmed(): void {
    const id = this.deletingId();
    if (id == null) {
      return;
    }

    this.adminApi.deleteMessage(id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.success.set('Message deleted.');
        this.fetchMessages();
        setTimeout(() => this.success.set(null), 3000);
      },
      error: () => {
        this.deletingId.set(null);
        this.error.set('Could not delete this message.');
        setTimeout(() => this.error.set(null), 3000);
      }
    });
  }
}
