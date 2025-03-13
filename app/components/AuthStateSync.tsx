'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/lib/AuthContext';

export default function AuthStateSync() {
  const pathname = usePathname();
  const { refreshSession } = useAuth();
  const lastPathRef = useRef<string>('');

  // Verifica lo stato dell'autenticazione ad ogni cambio di pagina
  useEffect(() => {
    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname;
      // Verificare lo stato di autenticazione solo quando cambia la pagina
      refreshSession();
    }
  }, [pathname, refreshSession]);

  // Verifica anche lo stato dell'autenticazione quando la finestra riprende il focus
  useEffect(() => {
    const handleFocus = () => {
      console.log('Finestra ha riacquisito il focus, verifico autenticazione...');
      refreshSession();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshSession]);

  // Questo componente non renderizza nulla
  return null;
} 