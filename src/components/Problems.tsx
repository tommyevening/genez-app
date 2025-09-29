import React from 'react';

const ProblemCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-8 rounded-2xl text-center">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Problems: React.FC = () => {
  const problems = [
    {
      title: "😰 Strach przed próbowaniem nowych rzeczy",
      description: "Pomagamy przełamać barierę strachu przed nowymi aktywnościami dzięki wsparciu grupy"
    },
    {
      title: "🤷‍♂️ Trudności z poznawaniem ludzi",
      description: "Ułatwiamy nawiązywanie nowych znajomości w naturalny sposób poprzez wspólne zainteresowania"
    }
  ];

  return (
    <section id="problems" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-800">Jakie problemy rozwiązujemy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;