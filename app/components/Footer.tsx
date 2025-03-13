import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contatti" className="bg-[var(--secondary)] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Info */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-serif text-[var(--primary)] font-bold">BarberStyle</span>
            </Link>
            <p className="opacity-70 mb-6">
              Un'esperienza di barbiere premium che combina tradizione e modernità per un look che ti distingue.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Link Rapidi</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#servizi" className="opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link href="/#team" className="opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                  Il Nostro Team
                </Link>
              </li>
              <li>
                <Link href="/#galleria" className="opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                  Galleria
                </Link>
              </li>
              <li>
                <Link href="/#recensioni" className="opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                  Recensioni
                </Link>
              </li>
              <li>
                <Link href="/#prenota" className="opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                  Prenota
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contattaci</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[var(--primary)]">📍</span>
                <span className="opacity-70">Via Roma, 123<br />Milano, 20121</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--primary)]">📞</span>
                <span className="opacity-70">+39 02 1234567</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--primary)]">✉️</span>
                <span className="opacity-70">info@barberstyle.it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--primary)]">⏰</span>
                <span className="opacity-70">
                  Lun - Ven: 9:00 - 19:00<br />
                  Sab: 9:00 - 17:00<br />
                  Dom: Chiuso
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="opacity-70 mb-4">
              Iscriviti per ricevere offerte speciali e novità.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="La tua email" 
                className="p-3 bg-[var(--background)] bg-opacity-10 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
              <button type="submit" className="btn-primary">
                Iscriviti
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-700 text-center opacity-70 text-sm">
          <p>© {currentYear} BarberStyle. Tutti i diritti riservati.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-[var(--primary)]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--primary)]">Termini di Servizio</Link>
            <Link href="#" className="hover:text-[var(--primary)]">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 