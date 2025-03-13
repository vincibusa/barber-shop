import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './lib/AuthContext';
import AuthStateSync from './components/AuthStateSync';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Barber Shop - Prenota il tuo appuntamento',
  description: 'Barber Shop professionale - Prenota un appuntamento per taglio di capelli, barba e trattamenti',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <AuthProvider>
          <AuthStateSync />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
