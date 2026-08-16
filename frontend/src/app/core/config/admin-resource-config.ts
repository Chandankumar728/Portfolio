import { AdminResource } from '../services/admin-api.service';

export type FieldType = 'text' | 'textarea' | 'number' | 'tags' | 'date';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export interface ResourceConfig {
  resource: AdminResource;
  title: string;
  singularLabel: string;
  icon: string;
  fields: FieldConfig[];
  columns: string[];
}

export const ADMIN_RESOURCE_CONFIG: Record<AdminResource, ResourceConfig> = {
  projects: {
    resource: 'projects',
    title: 'Projects',
    singularLabel: 'Project',
    icon: 'fa-solid fa-diagram-project',
    columns: ['title', 'category', 'status'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'demo', label: 'Demo URL', type: 'text' },
      { key: 'techStack', label: 'Tech Stack (comma separated)', type: 'tags' }
    ]
  },
  blogs: {
    resource: 'blogs',
    title: 'Blogs',
    singularLabel: 'Blog Post',
    icon: 'fa-solid fa-newspaper',
    columns: ['title', 'category', 'publishedAt'],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'publishedAt', label: 'Published Date', type: 'date' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' }
    ]
  },
  skills: {
    resource: 'skills',
    title: 'Skills',
    singularLabel: 'Skill',
    icon: 'fa-solid fa-layer-group',
    columns: ['name', 'category', 'percentage'],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'icon', label: 'Icon (Font Awesome class)', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'percentage', label: 'Percentage', type: 'number' },
      { key: 'experience', label: 'Experience', type: 'text' }
    ]
  },
  experience: {
    resource: 'experience',
    title: 'Experience',
    singularLabel: 'Experience Item',
    icon: 'fa-solid fa-briefcase',
    columns: ['company', 'position', 'duration'],
    fields: [
      { key: 'company', label: 'Company', type: 'text', required: true },
      { key: 'position', label: 'Position', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'technologies', label: 'Technologies (comma separated)', type: 'tags' }
    ]
  },
  testimonials: {
    resource: 'testimonials',
    title: 'Testimonials',
    singularLabel: 'Testimonial',
    icon: 'fa-solid fa-quote-left',
    columns: ['name', 'company', 'rating'],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      { key: 'review', label: 'Review', type: 'textarea' }
    ]
  },
  certifications: {
    resource: 'certifications',
    title: 'Certifications',
    singularLabel: 'Certification',
    icon: 'fa-solid fa-certificate',
    columns: ['name', 'issuer', 'year'],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'issuer', label: 'Issuer', type: 'text', required: true },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' }
    ]
  }
};
