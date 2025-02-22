import { createClient } from '@supabase/supabase-js';
import 'dotenv'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log(supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
