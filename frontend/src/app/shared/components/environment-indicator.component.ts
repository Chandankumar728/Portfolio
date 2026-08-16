import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from '../../core/services/environment.service';

@Component({
  selector: 'app-environment-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './environment-indicator.component.html',
  styleUrls: ['./environment-indicator.component.scss']
})
export class EnvironmentIndicatorComponent {
  private environmentService = inject(EnvironmentService);
  environmentInfo = this.environmentService.environmentInfo;

  getIndicatorClass(): string {
    const info = this.environmentInfo();
    if (info.isLocal) return 'local';
    if (info.isProduction && info.currentHostname.includes('vercel.app')) return 'vercel';
    return 'production';
  }

  getStatusClass(): string {
    const info = this.environmentInfo();
    if (info.isLocal) return 'status-local';
    if (info.isProduction && info.currentHostname.includes('vercel.app')) return 'status-vercel';
    return 'status-production';
  }
}
