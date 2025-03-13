import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Queste variabili d'ambiente devono essere definite nel file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verifica che le variabili d'ambiente siano definite
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variabili di ambiente Supabase mancanti. Assicurati di configurare .env.local');
}

// Client per componenti client/browser
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);

// Client per API routes e server components
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true
  }
});

// Funzione di utility per verificare la connessione al database
export async function checkSupabaseConnection() {
  try {
    const { error } = await supabase.from('test_connection').select('*').limit(1);
    
    // Se la tabella non esiste, si avrà un errore ma la connessione è comunque valida
    if (error && error.code !== '42P01') {
      console.error('Errore di connessione a Supabase:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Impossibile connettersi a Supabase:', error);
    return false;
  }
} 