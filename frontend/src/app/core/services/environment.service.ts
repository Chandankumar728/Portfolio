import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface EnvironmentInfo {
  apiUrl: string;
  isProduction: boolean;
  isLocal: boolean;
  currentHostname: string;
  deploymentStatus: string;
}

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  environmentInfo = signal<EnvironmentInfo>({
    apiUrl: environment.apiUrl,
    isProduction: environment.production,
    isLocal: !environment.production,
    currentHostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
    deploymentStatus: environment.production ? '🟢 PRODUCTION' : '🟡 LOCAL DEVELOPMENT'
  });
}
