import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type About } from '@/lib/supabase';

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as About | null;
    },
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (about: Partial<About>) => {
      const { data: existing } = await supabase
        .from('about')
        .select('id')
        .single();
      
      if (existing) {
        const { data, error } = await supabase
          .from('about')
          .update({ ...about, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('about')
          .insert({ ...about })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
    },
  });
};