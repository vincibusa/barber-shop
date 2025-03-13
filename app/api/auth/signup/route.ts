import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    const { name, surname, email, password } = await request.json();

    // Controllo dei campi obbligatori
    if (!name || !surname || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // Controllo formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Formato email non valido' },
        { status: 400 }
      );
    }

    // Controllo password (almeno 6 caratteri)
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'La password deve essere di almeno 6 caratteri' },
        { status: 400 }
      );
    }

    // Creazione del client lato server per la gestione dei cookie
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => {
            return request.cookies.get(name)?.value
          },
          set: (name, value, options) => {
            // Non impostiamo i cookie qui, li impostiamo nella response
          },
          remove: (name, options) => {
            // Non rimuoviamo i cookie qui
          },
        },
      }
    );

    // Verifico se esiste già un utente con questa email nella tabella profiles
    const { data: existingProfiles, error: profileCheckError } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .eq('email', email)
      .limit(1);
    
    if (existingProfiles && existingProfiles.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Questa email è già registrata. Prova ad accedere invece di registrarti.'
        },
        { status: 400 }
      );
    }

    // Registrazione utente con Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
        },
      },
    });

    if (error) {
      console.error('Errore durante la registrazione:', error);
      
      // Controlla specificamente errori relativi all'email già registrata
      if (error.message.includes('User already registered') || 
          error.message.includes('email already registered') ||
          error.message.includes('already in use') ||
          error.message.includes('already exists')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Questa email è già registrata. Prova ad accedere invece di registrarti.'
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: error.message || 'Errore durante la registrazione' 
        },
        { status: error.status || 500 }
      );
    }

    // Verifichiamo se è necessaria la verifica email prima di procedere
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Questa email è già registrata. Prova ad accedere invece di registrarti.'
        },
        { status: 400 }
      );
    }

    // Creazione profilo utente
    if (data.user) {
      try {
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
              surname,
              email,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) {
          console.error('Errore nella creazione del profilo:', profileError);
          // Non blocchiamo la registrazione se il profilo non viene creato
        }
      } catch (profileCreationError) {
        console.error('Errore durante la creazione del profilo:', profileCreationError);
        // Non blocchiamo la registrazione se il profilo non viene creato
      }
    }

    // Crea la risposta
    const response = NextResponse.json({
      success: true,
      user: data.user,
      message: 'Registrazione completata con successo',
      requireLogin: true  // Aggiungo questo flag per indicare che l'utente deve fare login
    });

    // Rimuovo l'impostazione dei cookie di sessione per non autenticare automaticamente l'utente
    /* Commento questa parte per non creare la sessione automaticamente
    const { session } = data;
    
    if (session) {
      // Imposta i cookie necessari per Supabase Auth
      // Questi cookie devono essere accessibili a JavaScript per permettere a Supabase di leggerli
      response.cookies.set('sb-access-token', session.access_token, {
        path: '/',
        maxAge: session.expires_in,
        sameSite: 'lax',
        httpOnly: false, // Cambiato da true a false
        secure: process.env.NODE_ENV === 'production',
      });
      
      response.cookies.set('sb-refresh-token', session.refresh_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 giorni
        sameSite: 'lax',
        httpOnly: false, // Cambiato da true a false
        secure: process.env.NODE_ENV === 'production',
      });

      // Importante: imposta anche il cookie che Supabase usa per identificare la sessione
      const supabaseCookieName = `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`;
      response.cookies.set(supabaseCookieName, JSON.stringify({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + session.expires_in
      }), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 giorni
        sameSite: 'lax',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    */

    return response;
  } catch (error) {
    console.error('Errore del server durante la registrazione:', error);
    return NextResponse.json(
      { success: false, message: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 