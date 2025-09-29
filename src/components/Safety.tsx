import React from 'react';

const SafetyCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const Safety: React.FC = () => {
  const safetyFeatures = [
    {
      title: "✅ Weryfikacja użytkowników",
      description: "Każdy użytkownik przechodzi proces weryfikacji dla zapewnienia bezpieczeństwa społeczności"
    },
    {
      title: "🚨 System zgłoszeń",
      description: "Możliwość szybkiego zgłaszania niepożądanych zachowań i skuteczna moderacja"
    },
    {
      title: "📋 Jasne zasady",
      description: "Przejrzysty regulamin i zasady fair play dla wszystkich uczestników"
    },
    {
      title: "⚖️ Odpowiedzialność",
      description: "Organizator aktywności nie odpowiada za zachowania poza aplikacją, ale promujemy wzajemny szacunek"
    }
  ];

  return (
    <section id="safety" className="py-20 bg-gradient-to-br from-teal-500 to-green-600 text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl font-bold mb-12">Bezpieczeństwo i zasady</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {safetyFeatures.map((feature, index) => (
            <SafetyCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safety;