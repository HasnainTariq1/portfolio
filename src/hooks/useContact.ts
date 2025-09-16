import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type ContactInfo, type Message } from '@/lib/supabase';

export const useContactInfo = () => {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as ContactInfo[];
    },
  });
};

export const useCreateContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contactInfo: Omit<ContactInfo, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('contact_info')
        .insert(contactInfo)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
    },
  });
};

export const useSubmitMessage = () => {
  return useMutation({
    mutationFn: async (message: Omit<Message, 'id' | 'created_at' | 'read'>) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({ ...message, read: false })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Message[];
    },
  });
};