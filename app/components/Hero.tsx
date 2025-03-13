import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070')",
          filter: "brightness(0.5)"
        }}
      ></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 flex flex-col items-center text-center text-white py-20">
        <span className="text-[var(--primary)] uppercase tracking-widest mb-3 text-sm md:text-base">Esperienza di barbiere autentica</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          Arte, Stile & <br className="md:hidden" />
          <span className="text-[var(--primary)]">Precisione</span>
        </h1>
        <p className="max-w-lg mx-auto mb-8 text-lg opacity-90">
          Un'esperienza di barbiere premium che combina tradizione e modernità per un look che ti distingue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/#prenota" className="btn-primary">
            Prenota Appuntamento
          </Link>
          <Link href="/#servizi" className="btn-outline border-white text-white hover:bg-white hover:text-[var(--secondary)]">
            Scopri i Servizi
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 w-full max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-[var(--primary)]">28+</span>
            <span className="text-sm opacity-80 mt-1">Anni di Esperienza</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-[var(--primary)]">5k+</span>
            <span className="text-sm opacity-80 mt-1">Clienti Soddisfatti</span>
          </div>
          <div className="flex flex-col items-center md:col-span-1 col-span-2 mx-auto">
            <span className="text-3xl md:text-4xl font-bold text-[var(--primary)]">4.9</span>
            <span className="text-sm opacity-80 mt-1">Valutazione Media</span>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest mb-2">Scorri</span>
          <div className="w-5 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 