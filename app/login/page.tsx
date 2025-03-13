'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/app/lib/AuthContext';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signIn, signUp, isLoading, isAuthenticated } = useAuth();

  // Reindirizza l'utente se è già autenticato
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isLogin) {
        // Login
        const result = await signIn(email, password);
        
        if (!result.success) {
          throw new Error(result.message || 'Errore durante il login');
        }
        
        router.push('/');
      } else {
        // Registrazione
        const result = await signUp(name, surname, email, password);
        
        if (!result.success) {
          throw new Error(result.message || 'Errore durante la registrazione');
        }
        
        // Invece di reindirizzare alla home, mostriamo un messaggio di successo e passiamo alla modalità login
        setSuccessMsg('Registrazione completata con successo! Ora puoi accedere con le tue credenziali.');
        setIsLogin(true);
        // Lasciamo l'email compilata per comodità dell'utente, ma resettiamo la password
        setPassword('');
      }
    } catch (error: any) {
      console.error('Errore:', error);
      setErrorMsg(error.message || 'Si è verificato un errore');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-[var(--card)] p-8 rounded-lg shadow-xl border border-[var(--border)]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[var(--primary)] mb-4 font-serif">
              {isLogin ? 'Bentornato' : 'Crea Account'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-6">
              {isLogin ? 'Accedi per gestire i tuoi appuntamenti' : 'Registrati per prenotare facilmente'}
            </p>
            
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                <p>{errorMsg}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                <p>{successMsg}</p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-[var(--foreground)]">Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Il tuo nome"
                  />
                </div>
                
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium mb-1 text-[var(--foreground)]">Cognome</label>
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full p-3 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Il tuo cognome"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-[var(--foreground)]">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="La tua email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-[var(--foreground)]">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="La tua password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-[var(--foreground)] opacity-50" />
                  ) : (
                    <FaEye className="h-5 w-5 text-[var(--foreground)] opacity-50" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-[var(--foreground)] opacity-60">La password deve essere di almeno 6 caratteri</p>
              )}
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--border)] bg-[var(--input)]"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-[var(--foreground)]">
                    Ricordami
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-[var(--primary)] hover:underline">
                    Password dimenticata?
                  </a>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 flex items-center justify-center bg-[var(--primary)] hover:bg-opacity-90 text-white font-medium rounded-md transition-colors duration-200 mt-4"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Accesso in corso...' : 'Registrazione in corso...'}
                  </>
                ) : (
                  isLogin ? 'Accedi' : 'Registrati'
                )}
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--foreground)] opacity-80">
                {isLogin ? 'Non hai un account?' : 'Hai già un account?'} {' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrorMsg('');
                  }}
                  className="text-[var(--primary)] hover:underline font-medium"
                >
                  {isLogin ? 'Registrati' : 'Accedi'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 