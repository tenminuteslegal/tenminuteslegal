import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eiohrimuzvyvuwntbiba.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpb2hyaW11enZ5dnV3bnRiaWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTQxNTAsImV4cCI6MjA3MjczMDE1MH0.cTROwzK4Unqt0rDShogCsBTbRHbZsBl0MvSHgPICtU0"
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

// console.log('env,', import.meta.env.VITE_SUPABASE_URL);


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
