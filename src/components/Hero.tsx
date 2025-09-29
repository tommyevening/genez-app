import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 text-center text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">ConnectUp</h1>
        <p className="text-xl mb-8 opacity-90">Znajdź swoją społeczność i odkryj nowe pasje razem z innymi</p>
        <a
          href="#features"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40"
        >
          Poznaj aplikację
        </a>
      </div>
    </section>
  );
};

export default Hero;