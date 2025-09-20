import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://zcrvzwsdeimglntqbbzh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjcnZ6d3NkZWltZ2xudHFiYnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzc0NzAsImV4cCI6MjA3Mzk1MzQ3MH0.Qjk0pCR1yI1lP--ioO1ttX9ylPzJQHjb1eZ5sH3PilQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
