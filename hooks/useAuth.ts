
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    console.log('Checking Supabase configuration...');
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);
    
    if (!configured) {
      console.log('Supabase not configured, using mock data');
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email || 'No user');
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email || 'No user');
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
        console.log('Mock login successful');
        return { error: null };
      } else {
        console.log('Mock login failed');
        return { error: { message: 'Invalid credentials' } };
      }
    }

    try {
      console.log('Attempting Supabase login for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Supabase login error:', error.message);
      } else {
        console.log('Supabase login successful');
      }
      
      return { error };
    } catch (err) {
      console.error('Supabase login exception:', err);
      return { error: { message: 'Network error' } };
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using mock registration');
      return { error: null };
    }

    try {
      console.log('Attempting Supabase registration for:', email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://natively.dev/email-confirmed',
          data: {
            display_name: displayName,
          },
        },
      });
      
      if (error) {
        console.error('Supabase registration error:', error.message);
      } else {
        console.log('Supabase registration successful');
      }
      
      return { error };
    } catch (err) {
      console.error('Supabase registration exception:', err);
      return { error: { message: 'Network error' } };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, mock sign out');
      return { error: null };
    }

    try {
      console.log('Signing out from Supabase');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase signout error:', error.message);
      } else {
        console.log('Supabase signout successful');
      }
      
      return { error };
    } catch (err) {
      console.error('Supabase signout exception:', err);
      return { error: { message: 'Network error' } };
    }
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
