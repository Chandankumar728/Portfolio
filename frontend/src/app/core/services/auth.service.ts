import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { getApiUrl } from '../config/api-config';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'portfolio-token';
  private readonly userKey = 'portfolio-user';
  private readonly apiUrl = getApiUrl();
  readonly isAuthenticated = signal(false);
  readonly currentUser = signal<string | null>(null);

  constructor(private http: HttpClient) {
    console.log('🔐 AuthService initialized');
    console.log('📡 AuthService API URL:', this.apiUrl);
    this.restoreSession();
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    const loginUrl = `${this.apiUrl}/auth/login`;
    console.log('🔑 Attempting login to:', loginUrl);
    console.log('📨 Login payload:', payload);
    
    return this.http.post<AuthResponse>(loginUrl, payload).pipe(
      tap((response) => {
        console.log('✅ Login successful for user:', response.username);
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, response.username);
        this.isAuthenticated.set(true);
        this.currentUser.set(response.username);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private restoreSession(): void {
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem(this.userKey);
    if (token && user) {
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
    }
  }
}
