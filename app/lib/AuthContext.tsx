'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (name: string, surname: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Funzione per recuperare la sessione e aggiornare lo stato
  const refreshSession = async () => {
    setIsLoading(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Errore durante il recupero della sessione:', error);
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      
      if (data.session) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          console.log('Sessione recuperata con successo:', userData.user.email);
          setUser(userData.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('Nessuna sessione attiva trovata');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Errore imprevisto durante il refresh della sessione:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Inizializza l'autenticazione al caricamento
  useEffect(() => {
    const initAuth = async () => {
      await refreshSession();
      
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        // Configura il listener per i cambiamenti di autenticazione
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Stato auth cambiato:', event);
            
            if (event === 'SIGNED_IN' && session) {
              const { data: userData } = await supabase.auth.getUser();
              setUser(userData.user);
              setIsAuthenticated(true);
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
              setIsAuthenticated(false);
            } else if (event === 'TOKEN_REFRESHED' && session) {
              // Se il token è stato aggiornato, aggiorniamo l'utente
              const { data: userData } = await supabase.auth.getUser();
              setUser(userData.user);
              setIsAuthenticated(true);
            }
          }
        );

        return () => {
          if (authListener && authListener.subscription) {
            authListener.subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error('Errore durante l\'inizializzazione dell\'auth:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.errore || 'Errore durante il login');
      }

      // Aggiorna manualmente lo stato invece di affidarsi solo agli eventi
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
      
      // Refresh della sessione per assicurarsi che tutto sia sincronizzato
      await refreshSession();
      
      return { success: true };
    } catch (error: any) {
      console.error('Errore durante il login:', error);
      return { 
        success: false, 
        message: error.message || 'Si è verificato un errore durante il login' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, surname: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.errore || 'Errore durante la registrazione');
      }

      // Non aggiorniamo più lo stato qui, perché l'utente non è più automaticamente autenticato
      // dopo la registrazione. Adesso dovrà fare il login manualmente.
      /*
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
      
      // Refresh della sessione per assicurarsi che tutto sia sincronizzato
      await refreshSession();
      */
      
      return { 
        success: true,
        message: data.message || 'Registrazione completata con successo'
      };
    } catch (error: any) {
      console.error('Errore durante la registrazione:', error);
      return { 
        success: false, 
        message: error.message || 'Si è verificato un errore durante la registrazione' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      await supabase.auth.signOut();
      
      setUser(null);
      setIsAuthenticated(false);
      
      // Forza un refresh della pagina per pulire completamente lo stato
      window.location.reload();
    } catch (error) {
      console.error('Errore durante il logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
} 