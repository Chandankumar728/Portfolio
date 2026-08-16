import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, Certification, ExperienceItem, Project, Skill, Testimonial } from './portfolio-data.service';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ProfileSettings {
  id: number;
  heroName: string;
  heroDesignation: string;
  heroIntro: string;
  resumeUrl: string;
  aboutBio: string;
  aboutExperience: string;
  aboutProjectsCompleted: number;
  aboutClients: number;
  aboutImage: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  educationInstitution: string;
  educationDegree: string;
  educationScore: string;
  educationDuration: string;
  educationLocation: string;
}

export type AdminResource = 'projects' | 'blogs' | 'skills' | 'experience' | 'testimonials' | 'certifications';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly baseUrl = '/api/admin';

  constructor(private http: HttpClient) {}

  list<T>(resource: AdminResource): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${resource}`);
  }

  create<T>(resource: AdminResource, payload: Partial<T>): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${resource}`, payload);
  }

  update<T>(resource: AdminResource, id: number, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${resource}/${id}`, payload);
  }

  delete(resource: AdminResource, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${resource}/${id}`);
  }

  getProjects(): Observable<Project[]> {
    return this.list<Project>('projects');
  }

  getBlogs(): Observable<Blog[]> {
    return this.list<Blog>('blogs');
  }

  getSkills(): Observable<Skill[]> {
    return this.list<Skill>('skills');
  }

  getExperience(): Observable<ExperienceItem[]> {
    return this.list<ExperienceItem>('experience');
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.list<Testimonial>('testimonials');
  }

  getCertifications(): Observable<Certification[]> {
    return this.list<Certification>('certifications');
  }

  getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.baseUrl}/messages`);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/messages/${id}`);
  }

  getSettings(): Observable<ProfileSettings> {
    return this.http.get<ProfileSettings>(`${this.baseUrl}/settings`);
  }

  updateSettings(payload: Partial<ProfileSettings>): Observable<ProfileSettings> {
    return this.http.put<ProfileSettings>(`${this.baseUrl}/settings`, payload);
  }
}
