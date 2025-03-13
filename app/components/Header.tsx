'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuDesktopRef = useRef<HTMLDivElement>(null);
  const userMenuMobileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, signOut, isAuthenticated, isLoading } = useAuth();

  // Effetto per gestire lo scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chiudi il menu utente quando si clicca fuori
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (userMenuDesktopRef.current && !userMenuDesktopRef.current.contains(event.target as Node)) &&
        (userMenuMobileRef.current && !userMenuMobileRef.current.contains(event.target as Node))
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const getUserInitials = () => {
    if (!user || !user.user_metadata) return '?';
    
    const name = user.user_metadata.name || '';
    const surname = user.user_metadata.surname || '';
    
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  const handleLoginClick = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-[var(--background)] shadow-md' : 'py-5 bg-transparent'
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl md:text-3xl font-serif text-[var(--primary)] font-bold">BarberStyle</span>
          <span className="hidden md:inline-block ml-1 text-xs uppercase tracking-widest">Dal 1995</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#servizi" className="hover:text-[var(--primary)] transition-colors">Servizi</Link>
          <Link href="/#team" className="hover:text-[var(--primary)] transition-colors">Team</Link>
          <Link href="/#galleria" className="hover:text-[var(--primary)] transition-colors">Galleria</Link>
          <Link href="/#recensioni" className="hover:text-[var(--primary)] transition-colors">Recensioni</Link>
          <Link href="/#contatti" className="hover:text-[var(--primary)] transition-colors">Contatti</Link>
        </nav>

        {/* Appointment Button and User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/#prenota" className="btn-primary">Prenota Ora</Link>

          {/* User Icon/Menu */}
          <div className="relative user-menu-container" ref={userMenuDesktopRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
              aria-label={isAuthenticated ? "Menu utente" : "Accedi"}
            >
              {isLoading ? (
                <span className="h-5 w-5 block rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"></span>
              ) : isAuthenticated ? (
                <span className="text-sm font-medium">
                  {getUserInitials()}
                </span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 text-black">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100 text-black">
                      <p className="text-sm font-medium text-black">
                        {user?.user_metadata?.name ? `${user.user_metadata.name} ${user.user_metadata.surname || ''}` : user?.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link 
                      href="/profilo" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Il mio profilo
                    </Link>
                    <Link 
                      href="/appuntamenti" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      I miei appuntamenti
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Esci
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLoginClick}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-black"
                  >
                    Accedi / Registrati
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu and User Icon */}
        <div className="md:hidden flex items-center gap-4">
          {/* User Icon for Mobile */}
          <div className="relative user-menu-container" ref={userMenuMobileRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center"
              aria-label={isAuthenticated ? 'Profilo utente' : 'Accedi'}
            >
              {isLoading ? (
                <span className="h-5 w-5 block rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"></span>
              ) : isAuthenticated ? (
                <span className="text-sm font-medium">
                  {getUserInitials()}
                </span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>
            
            {/* Mobile Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 text-black">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100 text-black">
                      <p className="text-sm font-medium text-black">
                        {user?.user_metadata?.name ? `${user.user_metadata.name} ${user.user_metadata.surname || ''}` : user?.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link 
                      href="/profilo" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Il mio profilo
                    </Link>
                    <Link 
                      href="/appuntamenti" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      I miei appuntamenti
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Esci
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLoginClick}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-black"
                  >
                    Accedi / Registrati
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10"
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-[var(--background)] z-40 transition-transform duration-300 ease-in-out pt-20 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white"
            aria-label="Chiudi menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center gap-6 p-6">
          <Link href="/#servizi" className="text-xl" onClick={() => setIsMenuOpen(false)}>Servizi</Link>
          <Link href="/#team" className="text-xl" onClick={() => setIsMenuOpen(false)}>Team</Link>
          <Link href="/#galleria" className="text-xl" onClick={() => setIsMenuOpen(false)}>Galleria</Link>
          <Link href="/#recensioni" className="text-xl" onClick={() => setIsMenuOpen(false)}>Recensioni</Link>
          <Link href="/#contatti" className="text-xl" onClick={() => setIsMenuOpen(false)}>Contatti</Link>
          <Link href="/#prenota" className="btn-primary mt-4 w-full text-center" onClick={() => setIsMenuOpen(false)}>Prenota Ora</Link>
          
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="mt-4 w-full text-center text-red-600"
            >
              Esci
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/login');
              }}
              className="mt-4 w-full text-center text-[var(--primary)]"
            >
              Accedi / Registrati
            </button>
          )}
        </nav>
      </div>
    </header>
  );
} 