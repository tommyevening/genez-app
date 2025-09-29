import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center transition-transform hover:-translate-y-2">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-indigo-500">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: "🏃‍♂️",
      title: "Sport & Aktywność",
      description: "Umów się na wspólne treningi, biegi, mecze czy inne aktywności sportowe. Znajdź partnera do ćwiczeń!"
    },
    {
      icon: "🎨",
      title: "Hobby & Zainteresowania",
      description: "Odkryj nowe pasje i podziel się swoimi zainteresowaniami z podobnie myślącymi ludźmi."
    },
    {
      icon: "🎭",
      title: "Wydarzenia",
      description: "Organizuj i dołączaj do lokalnych wydarzeń, koncertów, wystaw czy spotkań tematycznych."
    },
    {
      icon: "✈️",
      title: "Podróże",
      description: "Znajdź towarzysza podróży lub dołącz do grupowych wyjazdów. Odkrywaj świat razem z innymi!"
    },
    {
      icon: "👥",
      title: "Społeczność",
      description: "Buduj prawdziwe relacje i poznawaj nowych ludzi w bezpiecznym środowisku."
    },
    {
      icon: "🤝",
      title: "Realne spotkania",
      description: "Nacisk na prawdziwe, osobiste kontakty - nie randkowanie, ale budowanie społeczności."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-800">Główne założenia aplikacji</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;