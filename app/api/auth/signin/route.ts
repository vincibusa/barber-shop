import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validazione dei campi
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e password sono richiesti' },
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
    
    // Login con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json(
          { success: false, message: 'Credenziali non valide' },
          { status: 401 }
        );
      }
      
      console.error('Errore login:', error);
      return NextResponse.json(
        { success: false, message: 'Errore durante il login' },
        { status: 500 }
      );
    }
    
    // Recuperiamo i dati del profilo dalla tabella 'profiles' (opzionale)
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Errore recupero profilo:', profileError);
    }
    
    // Creare la risposta
    const response = NextResponse.json({
      success: true,
      user: {
        ...data.user,
        profile: profileData || null
      }
    });
    
    // Aggiungi cookie di sessione supabase per assicurare che l'autenticazione persista
    if (data.session) {
      // Imposta i cookie necessari per Supabase Auth
      // Questi cookie devono essere accessibili a JavaScript per permettere a Supabase di leggerli
      response.cookies.set('sb-access-token', data.session.access_token, {
        path: '/',
        maxAge: data.session.expires_in,
        sameSite: 'lax',
        httpOnly: false, // Cambiato da true a false
        secure: process.env.NODE_ENV === 'production',
      });
      
      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 giorni
        sameSite: 'lax',
        httpOnly: false, // Cambiato da true a false
        secure: process.env.NODE_ENV === 'production',
      });

      // Importante: imposta anche il cookie che Supabase usa per identificare la sessione
      const supabaseCookieName = `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`;
      response.cookies.set(supabaseCookieName, JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + data.session.expires_in
      }), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 giorni
        sameSite: 'lax',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return response;
    
  } catch (error) {
    console.error('Errore server:', error);
    return NextResponse.json(
      { success: false, message: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 