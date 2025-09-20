
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://umgcchmsoxtljgogmajz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ2NjaG1zb3h0bGpnb2dtYWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MDAwODIsImV4cCI6MjA3Mzk3NjA4Mn0.7aQC6-VOxHDLUKbdU_l4DbasOqu4yqaFT8DmEE7YkL4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
};

console.log('Supabase configuration status:', isSupabaseConfigured());

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          display_name: string;
          avatar_url?: string;
          bio?: string;
          is_online: boolean;
          last_seen?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          display_name: string;
          avatar_url?: string;
          bio?: string;
          is_online?: boolean;
          last_seen?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          display_name?: string;
          avatar_url?: string;
          bio?: string;
          is_online?: boolean;
          last_seen?: string;
          updated_at?: string;
        };
      };
      friend_requests: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          status: 'pending' | 'accepted' | 'declined';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id: string;
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          from_user_id?: string;
          to_user_id?: string;
          status?: 'pending' | 'accepted' | 'declined';
          updated_at?: string;
        };
      };
      friendships: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          friend_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          friend_id?: string;
        };
      };
      statuses: {
        Row: {
          id: string;
          user_id: string;
          image_url?: string;
          caption?: string;
          content?: string;
          type: 'image' | 'text';
          created_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          image_url?: string;
          caption?: string;
          content?: string;
          type: 'image' | 'text';
          created_at?: string;
          expires_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          image_url?: string;
          caption?: string;
          content?: string;
          type?: 'image' | 'text';
          expires_at?: string;
        };
      };
      chats: {
        Row: {
          id: string;
          participant_1: string;
          participant_2: string;
          last_message?: string;
          last_message_at?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          participant_1: string;
          participant_2: string;
          last_message?: string;
          last_message_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          participant_1?: string;
          participant_2?: string;
          last_message?: string;
          last_message_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          sender_id: string;
          content: string;
          type: 'text' | 'image' | 'file';
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          sender_id: string;
          content: string;
          type?: 'text' | 'image' | 'file';
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          sender_id?: string;
          content?: string;
          type?: 'text' | 'image' | 'file';
        };
      };
    };
  };
}
