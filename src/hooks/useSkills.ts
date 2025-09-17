import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SkillCategory = Database['public']['Tables']['skill_categories']['Row'];
type SkillCategoryInsert = Database['public']['Tables']['skill_categories']['Insert'];
type Skill = Database['public']['Tables']['skills']['Row'];
type SkillInsert = Database['public']['Tables']['skills']['Insert'];

export const useSkillsWithCategories = () => {
  return useQuery({
    queryKey: ['skills-with-categories'],
    queryFn: async () => {
      const { data: categories, error: categoriesError } = await supabase
        .from('skill_categories')
        .select(`
          *,
          skills (*)
        `)
        .order('order_index', { ascending: true });
      
      if (categoriesError) throw categoriesError;
      return categories as (SkillCategory & { skills: Skill[] })[];
    },
  });
};

export const useCreateSkillCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: SkillCategoryInsert) => {
      const { data, error } = await supabase
        .from('skill_categories')
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills-with-categories'] });
    },
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (skill: SkillInsert) => {
      const { data, error } = await supabase
        .from('skills')
        .insert(skill)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills-with-categories'] });
    },
  });
};