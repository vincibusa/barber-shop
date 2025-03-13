'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Alessandro Ricci',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Da quando ho scoperto BarberStyle, non vado più da nessun\'altra parte. Marco è un vero artista con le forbici e il rasoio. Il rapporto qualità-prezzo è imbattibile!',
    rating: 5
  },
  {
    id: 2,
    name: 'Davide Moretti',
    photo: 'https://randomuser.me/api/portraits/men/44.jpg',
    text: 'Ambiente accogliente e professionale. Ho apprezzato particolarmente la consulenza personalizzata e l\'attenzione ai dettagli. Consigliatissimo per chi vuole un look curato.',
    rating: 5
  },
  {
    id: 3,
    name: 'Francesco Esposito',
    photo: 'https://randomuser.me/api/portraits/men/58.jpg',
    text: 'L\'atmosfera rilassante e il servizio impeccabile rendono ogni visita un\'esperienza piacevole. Il mio barbiere di fiducia ormai da due anni.',
    rating: 4
  },
  {
    id: 4,
    name: 'Lorenzo Colombo',
    photo: 'https://randomuser.me/api/portraits/men/71.jpg',
    text: 'Ho provato diversi barbieri in città, ma nessuno è al livello di BarberStyle. Taglio preciso, conversazione piacevole e prodotti di qualità. Tornerò sicuramente!',
    rating: 5
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="recensioni" className="py-20 bg-[var(--muted)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--primary)] uppercase tracking-widest text-sm">Testimonianze</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Cosa Dicono i Clienti</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-70">
            Le opinioni di chi ha provato la nostra esperienza di barbiere.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden py-10">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map(testimonial => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-6 md:px-12"
                >
                  <div className="bg-[var(--background)] p-8 rounded-md shadow-sm">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        <div className="flex text-[var(--primary)]">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-xl">
                              {i < testimonial.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-lg italic">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === index ? 'bg-[var(--primary)] w-6' : 'bg-gray-300'
                }`}
                aria-label={`Vai alla testimonianza ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Review CTA */}
        <div className="mt-16 text-center">
          <a 
            href="https://g.page/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Lascia una Recensione
          </a>
        </div>
      </div>
    </section>
  );
} 