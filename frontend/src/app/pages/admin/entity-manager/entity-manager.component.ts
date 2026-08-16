import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService, AdminResource } from '../../../core/services/admin-api.service';
import { ADMIN_RESOURCE_CONFIG, ResourceConfig } from '../../../core/config/admin-resource-config';
import { staggerIn } from '../../../shared/animations';

@Component({
  selector: 'app-entity-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entity-manager.component.html',
  styleUrl: './entity-manager.component.scss',
  animations: [staggerIn]
})
export class EntityManagerComponent implements OnInit {
  config!: ResourceConfig;
  form!: FormGroup;

  readonly items = signal<Record<string, any>[]>([]);
  readonly loading = signal(true);
  readonly formOpen = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly deletingId = signal<number | null>(null);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminApi: AdminApiService
  ) {}

  ngOnInit(): void {
    const resourceKey = this.route.snapshot.data['resource'] as AdminResource;
    this.config = ADMIN_RESOURCE_CONFIG[resourceKey];
    this.buildForm();
    this.fetchItems();
  }

  private buildForm(): void {
    const controls: Record<string, any> = {};
    for (const field of this.config.fields) {
      controls[field.key] = ['', field.required ? Validators.required : []];
    }
    this.form = this.fb.group(controls);
  }

  private fetchItems(): void {
    this.loading.set(true);
    this.adminApi.list<Record<string, any>>(this.config.resource).subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load data. Is the backend running?');
        this.loading.set(false);
      }
    });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.reset();
    this.formOpen.set(true);
  }

  openEdit(item: Record<string, any>): void {
    this.editingId.set(item['id']);
    const value: Record<string, any> = {};
    for (const field of this.config.fields) {
      const raw = item[field.key];
      value[field.key] = field.type === 'tags' && Array.isArray(raw) ? raw.join(', ') : (raw ?? '');
    }
    this.form.reset(value);
    this.formOpen.set(true);
  }

  cancel(): void {
    this.formOpen.set(false);
    this.editingId.set(null);
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Record<string, any> = { ...this.form.value };
    for (const field of this.config.fields) {
      if (field.type === 'tags') {
        payload[field.key] = String(payload[field.key] || '')
          .split(',')
          .map((value: string) => value.trim())
          .filter((value: string) => value.length > 0);
      } else if (field.type === 'number') {
        payload[field.key] = Number(payload[field.key]) || 0;
      }
    }

    const id = this.editingId();
    const request = id
      ? this.adminApi.update(this.config.resource, id, payload)
      : this.adminApi.create(this.config.resource, payload);

    request.subscribe({
      next: () => {
        this.success.set(id ? `${this.config.singularLabel} updated.` : `${this.config.singularLabel} created.`);
        this.cancel();
        this.fetchItems();
        this.clearMessagesLater();
      },
      error: () => {
        this.error.set(`Could not save this ${this.config.singularLabel.toLowerCase()}.`);
        this.clearMessagesLater();
      }
    });
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

    this.adminApi.delete(this.config.resource, id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.success.set(`${this.config.singularLabel} deleted.`);
        this.fetchItems();
        this.clearMessagesLater();
      },
      error: () => {
        this.deletingId.set(null);
        this.error.set(`Could not delete this ${this.config.singularLabel.toLowerCase()}.`);
        this.clearMessagesLater();
      }
    });
  }

  private clearMessagesLater(): void {
    setTimeout(() => {
      this.success.set(null);
      this.error.set(null);
    }, 3000);
  }
}
