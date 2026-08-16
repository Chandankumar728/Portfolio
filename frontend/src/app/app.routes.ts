import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './pages/public/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/public/home/home.component').then((m) => m.HomeComponent) },
      { path: 'projects', loadComponent: () => import('./pages/public/projects/projects.component').then((m) => m.ProjectsComponent) },
      { path: 'blogs', loadComponent: () => import('./pages/public/blogs/blogs.component').then((m) => m.BlogsComponent) },
      { path: 'contact', loadComponent: () => import('./pages/public/contact/contact.component').then((m) => m.ContactComponent) }
    ]
  },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login/login.component').then((m) => m.LoginComponent) },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
      { path: 'projects', loadComponent: () => import('./pages/admin/entity-manager/entity-manager.component').then((m) => m.EntityManagerComponent), data: { resource: 'projects' } },
      { path: 'blogs', loadComponent: () => import('./pages/admin/entity-manager/entity-manager.component').then((m) => m.EntityManagerComponent), data: { resource: 'blogs' } },
      { path: 'skills', loadComponent: () => import('./pages/admin/entity-manager/entity-manager.component').then((m) => m.EntityManagerComponent), data: { resource: 'skills' } },
      { path: 'experience', loadComponent: () => import('./pages/admin/entity-manager/entity-manager.component').then((m) => m.EntityManagerComponent), data: { resource: 'experience' } },
      { path: 'testimonials', loadComponent: () => import('./pages/admin/entity-manager/entity-manager.component').then((m) => m.EntityManagerComponent), data: { resource: 'testimonials' } },
      { path: 'certifications', loadComponent: () => import('./pages/admin/entity-manager/entity-manager.component').then((m) => m.EntityManagerComponent), data: { resource: 'certifications' } },
      { path: 'messages', loadComponent: () => import('./pages/admin/messages/messages.component').then((m) => m.MessagesComponent) },
      { path: 'settings', loadComponent: () => import('./pages/admin/settings/settings.component').then((m) => m.SettingsComponent) }
    ]
  }
];
