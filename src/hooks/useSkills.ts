import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type SkillCategory, type Skill } from '@/lib/supabase';

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
    mutationFn: async (category: Omit<SkillCategory, 'id' | 'created_at'>) => {
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
    mutationFn: async (skill: Omit<Skill, 'id' | 'created_at'>) => {
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