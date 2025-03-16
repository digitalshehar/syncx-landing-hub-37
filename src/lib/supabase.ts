
import { createClient } from '@supabase/supabase-js';

// Note: In a production environment, these would be environment variables
const supabaseUrl = 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

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
