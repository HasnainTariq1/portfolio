import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: number;
  name: string;
  title: string;
  description: string;
  hero_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: number;
  content: string;
  traits: string[];
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: number;
  type: 'contact' | 'social';
  label: string;
  value: string;
  href: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  order_index: number;
  created_at: string;
}

export interface Skill {
  id: number;
  category_id: number;
  name: string;
  proficiency: number;
  order_index: number;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}