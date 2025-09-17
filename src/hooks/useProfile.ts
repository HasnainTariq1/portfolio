import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profile']['Row'];
type ProfileInsert = Database['public']['Tables']['profile']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profile']['Update'];

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as Profile | null;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: ProfileUpdate) => {
      const { data: existing } = await supabase
        .from('profile')
        .select('id')
        .maybeSingle();
      
      if (existing) {
        const { data, error } = await supabase
          .from('profile')
          .update({ ...profile, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('profile')
          .insert(profile as ProfileInsert)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};