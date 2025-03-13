'use client';

import { useState } from 'react';

const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Barba'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Capelli'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Combo'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1565461181924-338eb918a4cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Capelli'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Barba'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1504710599834-e298425380db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Combo'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1519420638722-a2a5033d8be4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Capelli'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Barba'
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState('Tutti');
  
  const categories = ['Tutti', 'Capelli', 'Barba', 'Combo'];
  
  const filteredImages = filter === 'Tutti' 
    ? images 
    : images.filter(image => image.category === filter);

  return (
    <section id="galleria" className="py-20 bg-[var(--secondary)] text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--primary)] uppercase tracking-widest text-sm">La Nostra Arte</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Galleria di Stili</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-70">
            Scopri i nostri migliori lavori e lasciati ispirare per il tuo prossimo look.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-sm transition-all ${
                filter === category 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'bg-transparent text-white border border-[var(--primary)] hover:bg-[var(--primary)]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <div key={image.id} className="overflow-hidden rounded-md aspect-square group relative">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url(${image.url})` }}
              ></div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs md:text-sm uppercase tracking-widest bg-[var(--primary)] text-white px-3 py-1">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Instagram CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg mb-4">Seguici su Instagram per più ispirazioni</p>
          <a href="#" className="btn-outline border-white text-white hover:bg-white hover:text-[var(--secondary)]">
            @BarberStyle
          </a>
        </div>
      </div>
    </section>
  );
} 