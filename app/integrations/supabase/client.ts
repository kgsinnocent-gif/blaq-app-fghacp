import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://umgcchmsoxtljgogmajz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ2NjaG1zb3h0bGpnb2dtYWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MDAwODIsImV4cCI6MjA3Mzk3NjA4Mn0.7aQC6-VOxHDLUKbdU_l4DbasOqu4yqaFT8DmEE7YkL4";

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
