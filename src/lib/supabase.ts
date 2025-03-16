
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const addToWaitlist = async (email: string, useCase: string) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email, 
          use_case: useCase, 
          signup_date: new Date().toISOString() 
        }
      ]);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { 
      success: false, 
      error: 'Failed to join waitlist. Please try again.' 
    };
  }
};

// Utility function to check if email already exists in waitlist
export const checkEmailExists = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .maybeSingle();
      
    if (error) throw error;
    return { exists: !!data, data };
  } catch (error) {
    console.error('Error checking email:', error);
    return { exists: false, error };
  }
};
