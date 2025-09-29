import React, { useState, useMemo } from 'react';
import Sidebar, { FilterState } from './Sidebar';

interface Person {
  id: number;
  name: string;
  age: number;
  photo: string;
  categories: string[];
  location?: string;
  distance?: string;
  skillLevel?: string;
}

const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-purple-400 to-pink-400',
      'bg-gradient-to-r from-blue-400 to-cyan-400',
      'bg-gradient-to-r from-green-400 to-emerald-400'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Photo */}
      <div className="relative">
        <img
          src={person.photo}
          alt={person.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
          {person.age}
        </div>
        {person.distance && (
          <div className="absolute top-4 left-4 bg-indigo-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white">
            {person.distance}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{person.name}</h3>

        {person.location && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span className="mr-2">📍</span>
            <span>{person.location}</span>
          </div>
        )}

        {person.skillLevel && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span className="mr-2">🎯</span>
            <span>{person.skillLevel}</span>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {person.categories.map((category, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(index)}`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const People: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    radius: '5',
    activity: '',
    timePreference: 'any',
    skillLevel: 'any',
    groupSize: '',
    ageRange: '',
    selectedCategory: '',
    priceRange: [0, 100],
    onlineOnly: false,
    instantBooking: false,
    dateRange: '',
    sortBy: 'newest'
  });

  const people: Person[] = useMemo(() => [
    {
      id: 1,
      name: "Anna Kowalska",
      age: 23,
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612993f?w=400&h=400&fit=crop&crop=face",
      categories: ["Sport", "Podróże", "Fotografia"],
      location: "Kraków, Stare Miasto",
      distance: "1.2 km",
      skillLevel: "Początkujący"
    },
    {
      id: 2,
      name: "Michał Nowak",
      age: 27,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      categories: ["Gaming", "Programowanie", "Muzyka"],
      location: "Kraków, Kazimierz",
      distance: "2.1 km",
      skillLevel: "Zaawansowany"
    },
    {
      id: 3,
      name: "Karolina Wiśniewska",
      age: 25,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      categories: ["Sztuka", "Taniec", "Książki"],
      location: "Kraków, Podgórze",
      distance: "3.5 km",
      skillLevel: "Średniozaawansowany"
    },
    {
      id: 4,
      name: "Piotr Zieliński",
      age: 29,
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      categories: ["Gotowanie", "Hiking", "Film"],
      location: "Kraków, Nowa Huta",
      distance: "5.2 km",
      skillLevel: "Zaawansowany"
    },
    {
      id: 5,
      name: "Magdalena Lewandowska",
      age: 22,
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      categories: ["Yoga", "Medytacja", "Zdrowie"],
      location: "Kraków, Krowodrza",
      distance: "1.8 km",
      skillLevel: "Początkujący"
    },
    {
      id: 6,
      name: "Jakub Dąbrowski",
      age: 26,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      categories: ["Skateboard", "Graffiti", "Hip-hop"],
      location: "Kraków, Grzegórzki",
      distance: "4.1 km",
      skillLevel: "Średniozaawansowany"
    },
    {
      id: 7,
      name: "Natalia Kamińska",
      age: 24,
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      categories: ["Moda", "Design", "Kawiarnie"],
      location: "Kraków, Centrum",
      distance: "0.8 km",
      skillLevel: "Średniozaawansowany"
    },
    {
      id: 8,
      name: "Tomasz Woźniak",
      age: 28,
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      categories: ["Motocykle", "Mechanika", "Podróże"],
      location: "Kraków, Dębniki",
      distance: "6.3 km",
      skillLevel: "Zaawansowany"
    },
    {
      id: 9,
      name: "Julia Kaczmarek",
      age: 21,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      categories: ["Makeup", "Beauty", "Influencer"],
      location: "Kraków, Prądnik",
      distance: "3.7 km",
      skillLevel: "Początkujący"
    }
  ], []);

  // Filter people based on active filters
  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      // Age range filter
      if (filters.ageRange) {
        const [min, max] = filters.ageRange.includes('+')
          ? [parseInt(filters.ageRange.replace('+', '')), 100]
          : filters.ageRange.split('-').map(Number);
        if (person.age < min || person.age > max) return false;
      }

      // Skill level filter
      if (filters.skillLevel && filters.skillLevel !== 'any' && person.skillLevel !== filters.skillLevel) {
        return false;
      }

      // Category filter
      if (filters.selectedCategory) {
        const categoryMap: { [key: string]: string[] } = {
          'sport': ['Sport', 'Yoga', 'Skateboard'],
          'hobby': ['Fotografia', 'Gaming', 'Programowanie', 'Muzyka', 'Sztuka', 'Taniec', 'Książki', 'Graffiti', 'Hip-hop', 'Moda', 'Design'],
          'travel': ['Podróże'],
          'cooking': ['Gotowanie'],
          'learning': ['Programowanie', 'Książki'],
          'events': ['Muzyka', 'Hip-hop']
        };

        const relevantCategories = categoryMap[filters.selectedCategory] || [];
        const hasMatchingCategory = person.categories.some(cat =>
          relevantCategories.includes(cat)
        );
        if (!hasMatchingCategory) return false;
      }

      // Text search in name and categories
      if (filters.activity && filters.activity !== 'any') {
        const searchTerm = filters.activity.toLowerCase();
        const nameMatch = person.name.toLowerCase().includes(searchTerm);
        const categoryMatch = person.categories.some(cat =>
          cat.toLowerCase().includes(searchTerm)
        );
        if (!nameMatch && !categoryMatch) return false;
      }

      return true;
    });
  }, [people, filters]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onFiltersChange={handleFiltersChange}
      />

      <section id="people" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Poznaj naszą społeczność</h2>
              <p className="text-lg text-gray-600">Dołącz do tysięcy ludzi, którzy już znaleźli swoją grupę</p>
            </div>
            <button
              onClick={() => {
                console.log('Opening sidebar');
                setIsSidebarOpen(true);
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Filtry</span>
            </button>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Znaleziono <span className="font-semibold text-indigo-600">{filteredPeople.length}</span>
              {' '}z {people.length} profili
            </p>
            {(filters.selectedCategory || filters.activity || filters.skillLevel || filters.ageRange) && (
              <button
                onClick={() => handleFiltersChange({
                  location: '',
                  radius: '5',
                  activity: '',
                  timePreference: 'any',
                  skillLevel: 'any',
                  groupSize: '',
                  ageRange: '',
                  selectedCategory: '',
                  priceRange: [0, 100],
                  onlineOnly: false,
                  instantBooking: false,
                  dateRange: '',
                  sortBy: 'newest'
                })}
                className="text-sm text-gray-500 hover:text-indigo-500 transition-colors"
              >
                Wyczyść filtry
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Brak wyników</h3>
              <p className="text-gray-600 mb-6">Nie znaleziono profili pasujących do wybranych filtrów.</p>
              <button
                onClick={() => handleFiltersChange({
                  location: '',
                  radius: '5',
                  activity: '',
                  timePreference: 'any',
                  skillLevel: 'any',
                  groupSize: '',
                  ageRange: '',
                  selectedCategory: '',
                  priceRange: [0, 100],
                  onlineOnly: false,
                  instantBooking: false,
                  dateRange: '',
                  sortBy: 'newest'
                })}
                className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Wyczyść filtry
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              Zobacz więcej profili
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default People;