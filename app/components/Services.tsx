import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Taglio di Capelli',
    description: 'Un taglio di capelli personalizzato che si adatta al tuo stile e alla forma del viso.',
    icon: '✂️',
    price: '€25',
    popular: true
  },
  {
    id: 2,
    title: 'Rifinitura Barba',
    description: 'Servizio di rifinitura barba con prodotti premium e asciugamani caldi.',
    icon: '🪒',
    price: '€18',
    popular: false
  },
  {
    id: 3,
    title: 'Combo Capelli & Barba',
    description: 'Taglio di capelli e rifinitura barba in un unico servizio completo.',
    icon: '👑',
    price: '€40',
    popular: true
  },
  {
    id: 4,
    title: 'Rasatura Tradizionale',
    description: 'Rasatura completa con rasoio a mano libera e trattamento post-rasatura.',
    icon: '💈',
    price: '€28',
    popular: false
  },
  {
    id: 5,
    title: 'Colorazione',
    description: 'Colorazione professionale per capelli o barba con prodotti di qualità.',
    icon: '🎨',
    price: '€35+',
    popular: false
  },
  {
    id: 6,
    title: 'Trattamento Viso',
    description: 'Trattamento viso rivitalizzante con pulizia profonda e massaggio.',
    icon: '✨',
    price: '€30',
    popular: false
  }
];

export default function Services() {
  return (
    <section id="servizi" className="py-20 bg-[var(--muted)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--primary)] uppercase tracking-widest text-sm">I Nostri Servizi</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Servizi Premium</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-70">
            Offriamo una gamma completa di servizi di barbiere con prodotti di alta qualità e attenzione ai dettagli.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`bg-[var(--background)] p-8 rounded-md shadow-sm relative transition-all hover:-translate-y-1 hover:shadow-md ${
                service.popular ? 'border-t-4 border-[var(--primary)]' : ''
              }`}
            >
              {service.popular && (
                <span className="absolute top-2 right-2 bg-[var(--primary)] text-white text-xs py-1 px-2 rounded-sm">
                  Popolare
                </span>
              )}
              
              <div className="text-3xl mb-4">{service.icon}</div>
              
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm opacity-70 mb-4">{service.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-lg">{service.price}</span>
                <button className="text-[var(--primary)] hover:underline font-medium">
                  Prenota
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-sm opacity-70 mb-4">
            * I prezzi possono variare in base alla lunghezza e alla complessità.
            <br />
            Tutti i servizi includono una consulenza gratuita.
          </p>
          <button className="btn-outline mx-auto">
            Vedi Tutti i Servizi
          </button>
        </div>
      </div>
    </section>
  );
} 