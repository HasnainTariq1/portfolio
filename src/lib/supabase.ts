export { supabase } from '@/integrations/supabase/client';
export type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import type { Tables } from '@/integrations/supabase/types';

// Re-export commonly used types for convenience
export type Profile = Tables<'profile'>;
export type About = Tables<'about'>;
export type ContactInfo = Tables<'contact_info'>;
export type SkillCategory = Tables<'skill_categories'>;
export type Skill = Tables<'skills'>;
export type Project = Tables<'projects'>;
export type Message = Tables<'messages'>;