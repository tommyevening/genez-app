import React from 'react';

const AudienceCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-2xl text-center flex-1 min-w-[200px]">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Audience: React.FC = () => {
  const audiences = [
    {
      title: "🎓 Studenci",
      description: "Młodzi ludzie szukający nowych doświadczeń i znajomości podczas studiów"
    },
    {
      title: "🌟 Poszukiwacze znajomości",
      description: "Osoby chcące poszerzyć swoje kręgi towarzyskie i poznać ciekawych ludzi"
    },
    {
      title: "🔍 Odkrywcy hobby",
      description: "Ludzie pragnący rozwijać nowe zainteresowania i pasje w towarzystwie innych"
    }
  ];

  return (
    <section id="audience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-800">Nasza grupa docelowa</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {audiences.map((audience, index) => (
            <AudienceCard
              key={index}
              title={audience.title}
              description={audience.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;