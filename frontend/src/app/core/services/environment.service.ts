import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

export interface EnvironmentInfo {
  apiUrl: string;
  isProduction: boolean;
}

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  environmentInfo = signal<EnvironmentInfo>({
    apiUrl: environment.apiUrl,
    isProduction: environment.production
  });
}
