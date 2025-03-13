'use client';

import { useState } from 'react';

const team = [
  {
    id: 1,
    name: 'Marco Rossi',
    role: 'Fondatore & Master Barber',
    bio: 'Oltre 20 anni di esperienza nel settore. Specializzato in tagli classici e rasature tradizionali.',
    image: 'https://images.unsplash.com/photo-1618499890638-3f8466d388a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Luca Bianchi',
    role: 'Senior Barber',
    bio: 'Esperto di styling moderno e tagli alla moda. Con noi da 5 anni e sempre aggiornato sulle ultime tendenze.',
    image: 'https://images.unsplash.com/photo-1585417239763-fbc6c2e24f57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    name: 'Alessandro Verdi',
    role: 'Color Specialist',
    bio: 'Specialista in colorazioni e trattamenti per capelli e barba. Maestro nel creare look personalizzati.',
    image: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 4,
    name: 'Matteo Ferrari',
    role: 'Junior Barber',
    bio: 'Giovane talento con una passione per tagli moderni e creativi. Sempre pronto a sperimentare nuovi stili.',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--primary)] uppercase tracking-widest text-sm">I Nostri Esperti</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Incontra i Maestri</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-70">
            I nostri barbieri combinano anni di esperienza con continua formazione per offrirti il meglio.
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-md mb-4">
                <div 
                  className="aspect-[3/4] w-full bg-cover bg-center" 
                  style={{backgroundImage: `url(${member.image})`}}
                ></div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-sm">
                    Prenota
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[var(--primary)] mb-2">{member.role}</p>
                <p className="text-sm opacity-70">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 