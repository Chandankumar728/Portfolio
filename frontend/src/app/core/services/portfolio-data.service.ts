import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Skill {
  id: number;
  name: string;
  icon: string;
  percentage: number;
  experience: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  techStack: string[];
  status: string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  publishedAt: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  review: string;
  rating: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  score: string;
  duration: string;
  location: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  description: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    designation: string;
    intro: string;
    resumeUrl: string;
  };
  about: {
    bio: string;
    experience: string;
    projectsCompleted: number;
    clients: number;
    image: string;
  };
  contact: ContactInfo;
  education: EducationInfo;
  skills: Skill[];
  experience: ExperienceItem[];
  projects: Project[];
  blogs: Blog[];
  testimonials: Testimonial[];
  certifications: Certification[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private readonly apiUrl = `${environment.apiUrl}/public`;

  constructor(private http: HttpClient) {}

  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(`${this.apiUrl}/portfolio`).pipe(
      catchError(() => of(this.createMockData()))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      catchError(() => of(this.createMockData().projects))
    );
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/blogs`).pipe(
      catchError(() => of(this.createMockData().blogs))
    );
  }

  submitContact(payload: ContactPayload): Observable<ContactPayload> {
    return this.http.post<ContactPayload>(`${this.apiUrl}/contact`, payload);
  }

  private createMockData(): PortfolioData {
    return {
      hero: {
        name: 'Chandan Kumar',
        designation: 'Software Engineer — Full Stack & AI Systems',
        intro: 'Software Engineer specializing in React, Angular, Node.js, and Spring Boot, with hands-on experience building AI-integrated systems — conversational agents, real-time voice calling, and multi-agent coordination powered by Google Gemini.',
        resumeUrl: '/assets/resume.pdf'
      },
      about: {
        bio: "I'm a full-stack and frontend engineer who has delivered enterprise and government-scale web applications, and more recently, AI-powered products: conversational ordering assistants, real-time voice agents, and multi-agent systems built on Google Gemini. I care about reliability, clean architecture, and shipping software that holds up under real usage.",
        experience: '3+ Years',
        projectsCompleted: 7,
        clients: 5,
        image: ''
      },
      contact: {
        email: 'chandankumar6299068@gmail.com',
        phone: '+91 6299068110',
        linkedinUrl: 'https://www.linkedin.com/in/chandan-kumar-0623b81aa/',
        githubUrl: 'https://github.com/Chandankumar728'
      },
      education: {
        institution: 'AMITY University',
        degree: 'B.Tech — Computer Science and Engineering',
        score: 'CGPA: 8.6',
        duration: '2019 - 2023',
        location: 'Ranchi, Jharkhand'
      },
      skills: [
        { id: 1, name: 'React.js', icon: 'fa-brands fa-react', percentage: 90, experience: '3+ years', category: 'Frontend' },
        { id: 2, name: 'Angular', icon: 'fa-brands fa-angular', percentage: 88, experience: '2+ years', category: 'Frontend' },
        { id: 3, name: 'TypeScript', icon: 'fa-solid fa-code', percentage: 85, experience: '3+ years', category: 'Frontend' },
        { id: 4, name: 'Node.js', icon: 'fa-brands fa-node-js', percentage: 85, experience: '3+ years', category: 'Backend' },
        { id: 5, name: 'Spring Boot', icon: 'fa-solid fa-leaf', percentage: 82, experience: '1+ years', category: 'Backend' },
        { id: 6, name: 'MongoDB', icon: 'fa-solid fa-database', percentage: 80, experience: '3+ years', category: 'Database' },
        { id: 7, name: 'Google Gemini / GenAI', icon: 'fa-solid fa-robot', percentage: 85, experience: '1+ years', category: 'AI' },
        { id: 8, name: 'Tailwind CSS', icon: 'fa-brands fa-css3-alt', percentage: 88, experience: '3+ years', category: 'Frontend' }
      ],
      experience: [
        {
          id: 1,
          company: 'Wiz Digital Services Pvt. Ltd.',
          position: 'Software Engineer',
          duration: 'Dec 2025 - Present',
          description: 'Building AI-integrated full-stack products: Annapau, an AI-powered ordering & catalog management system with a multi-agent WhatsApp ordering assistant and voice support, and Culmia/RealtyCloser, an AI voice calling platform for real estate using Google Gemini Live, Twilio, and Stripe.',
          technologies: ['Angular', 'Spring Boot', 'Node.js', 'Google Gemini', 'Twilio', 'Stripe', 'Docker']
        },
        {
          id: 2,
          company: 'Aadrika Enterprises Pvt. Ltd.',
          position: 'Software Developer',
          duration: 'Apr 2023 - Nov 2025',
          description: 'Delivered enterprise and government web applications, including water user charges & hoarding management for Akola Municipal Corporation, and fines collection, ad management, and pet registration systems for JUIDCO Jharkhand.',
          technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Formik']
        }
      ],
      projects: [
        { id: 1, title: 'Annapau — AI-Powered Ordering & Catalog Management', category: 'AI / Full Stack', description: 'Full-stack system for managing product catalogs, customer orders, and pricing, used by multiple businesses independently. Includes a multi-agent AI chat assistant that takes WhatsApp orders with voice support (speech-to-text and text-to-speech).', image: '', github: '', demo: '', techStack: ['Angular', 'Spring Boot', 'Node.js', 'Google Gemini'], status: 'Production' },
        { id: 2, title: 'Culmia / RealtyCloser — AI Voice Calling Sales Agent', category: 'AI / Voice', description: 'Inbound/outbound AI voice calling agent for real estate using Google ADK and Gemini Live over WebSocket, integrated with Google Calendar and Stripe to book property viewings and generate payment links mid-conversation.', image: '', github: '', demo: '', techStack: ['Angular', 'Spring Boot', 'Google Gemini Live', 'Twilio', 'Stripe'], status: 'Production' },
        { id: 3, title: 'Firepad', category: 'Full Stack', description: 'Collaborative platform for real-time data sharing and editing, similar to shared live documents, supporting simultaneous multi-user editing.', image: '', github: '', demo: 'https://firepad-aadrika-dybz4ou2v-chandankumar728s-projects.vercel.app', techStack: ['React.js', 'Node.js', 'Tailwind CSS'], status: 'Live' },
        { id: 4, title: 'RO Service Ranchi', category: 'Full Stack', description: 'Service booking platform for RO (water purifier) installation and repair requests, with real-time form handling and request tracking.', image: '', github: '', demo: 'https://roserviceranchi.com', techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'], status: 'Live' },
        { id: 5, title: 'Portfolio Website (Previous)', category: 'Frontend', description: 'Personal portfolio site showcasing skills, projects, and experience, optimized for fast load times and full mobile responsiveness.', image: '', github: '', demo: 'https://chandankumar728.github.io/MyPortfolio', techStack: ['React.js', 'Tailwind CSS'], status: 'Live' }
      ],
      blogs: [],
      testimonials: [],
      certifications: [
        { id: 1, name: 'IBM i (AS/400) Fundamentals', issuer: 'IBM', year: '2026', description: '' },
        { id: 2, name: 'Web Development', issuer: "Let's Grow More", year: '', description: 'Created a single-page website using HTML, CSS, and JavaScript, and built a web application using React.' }
      ]
    };
  }
}
