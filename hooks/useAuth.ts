
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    console.log('Checking Supabase configuration...');
    setIsConfigured(isSupabaseConfigured());
    
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using mock data');
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using mock authentication');
      // Mock authentication for demo
      if (email === 'kagiso@blaq.app' && password === 'password') {
        return { error: null };
      } else {
        return { error: { message: 'Invalid credentials' } };
      }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using mock registration');
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, mock sign out');
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    isConfigured,
    signIn,
    signUp,
    signOut,
  };
};
