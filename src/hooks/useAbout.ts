import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type About = Database['public']['Tables']['about']['Row'];
type AboutInsert = Database['public']['Tables']['about']['Insert'];
type AboutUpdate = Database['public']['Tables']['about']['Update'];

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (about: AboutUpdate) => {
      const { data: existing } = await supabase
        .from('about')
        .select('id')
        .maybeSingle();
      
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
          .insert(about as AboutInsert)
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