import { Injectable, signal } from '@angular/core';
import { getApiUrl } from './api-config';

export interface EnvironmentInfo {
  apiUrl: string;
  isProduction: boolean;
  isLocal: boolean;
  currentHostname: string;
  deploymentStatus: string;
}

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private apiUrl = getApiUrl();
  
  environmentInfo = signal<EnvironmentInfo>({
    apiUrl: this.apiUrl,
    isProduction: !this.apiUrl.includes('localhost'),
    isLocal: this.apiUrl.includes('localhost'),
    currentHostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
    deploymentStatus: this.getDeploymentStatus()
  });

  constructor() {
    this.logEnvironmentInfo();
  }

  private getDeploymentStatus(): string {
    if (typeof window === 'undefined') return 'SSR Mode';
    
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '🟡 LOCAL DEVELOPMENT';
    }
    if (hostname.includes('vercel.app')) {
      return '🟢 DEPLOYED ON VERCEL';
    }
    return '🔵 PRODUCTION';
  }

  private logEnvironmentInfo(): void {
    const info = this.environmentInfo();
    console.log('%c========== ENVIRONMENT INFO ==========', 'color: #00ff00; font-size: 14px; font-weight: bold;');
    console.log(`%c📍 Deployment Status: ${info.deploymentStatus}`, 'color: #00ff00; font-size: 12px;');
    console.log(`%c🌐 Hostname: ${info.currentHostname}`, 'color: #00ffff; font-size: 12px;');
    console.log(`%c📡 API URL: ${info.apiUrl}`, 'color: #ffff00; font-size: 12px;');
    console.log(`%c🏢 Environment: ${info.isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`, 'color: #ff00ff; font-size: 12px;');
    console.log('%c========================================', 'color: #00ff00; font-size: 14px; font-weight: bold;');
  }
}
