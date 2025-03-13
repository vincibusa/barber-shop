import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Errore logout:', error);
      return NextResponse.json(
        { errore: 'Errore durante il logout' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Logout effettuato con successo'
    });
    
  } catch (error) {
    console.error('Errore server:', error);
    return NextResponse.json(
      { errore: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 