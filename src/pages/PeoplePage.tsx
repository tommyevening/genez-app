import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import VerticalSidebar, { FilterState } from '../components/VerticalSidebar';
import AddAnnouncementModal from '../components/AddAnnouncementModal';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

interface Activity {
  id: number;
  name: string;
  activityName: string;
  photo: string;
  location: string;
  activityType: string;
  description: string;
  participants: string[];
  maxParticipants: number;
}

const ActivityCard: React.FC<{ activity: Activity; index: number }> = ({ activity, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isAlmostFull = activity.participants.length / activity.maxParticipants > 0.8;
  const isFull = activity.participants.length >= activity.maxParticipants;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:bg-white/90">
        <div className="relative overflow-hidden">
          <motion.img
            src={activity.photo}
            alt={activity.activityName}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={isFull ? "destructive" : isAlmostFull ? "secondary" : "default"}
              className="text-white border-0"
            >
              {isFull ? "Pełne" : isAlmostFull ? "Prawie pełne" : "Dostępne"}
            </Badge>
          </div>

          {/* Quick stats overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1 text-white text-xs">
              <Users className="w-3 h-3 mr-1" />
              {activity.participants.length}/{activity.maxParticipants}
            </div>
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1 text-white text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              {activity.location}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
              {activity.activityName}
            </CardTitle>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </div>

          <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
            {activity.description}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              {activity.activityType}
            </Badge>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Dziś 18:00
            </Badge>
          </div>

          <div className="space-y-3">
            {/* Participants preview */}
            {activity.participants.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Zapisani:</span>
                <div className="flex -space-x-2">
                  {activity.participants.slice(0, 3).map((participant, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                    >
                      {participant.charAt(0)}
                    </div>
                  ))}
                  {activity.participants.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                      +{activity.participants.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              className={cn(
                "w-full font-semibold transition-all duration-200",
                isFull
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              )}
              disabled={isFull}
            >
              {isFull ? "Brak miejsc" : "Dołącz do aktywności"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PeoplePage: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const activities: Activity[] = useMemo(() => [
    {
      id: 1,
      name: "Anna Kowalska",
      activityName: "Wspinaczka skłkowa",
      photo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop",
      location: "Warszawa",
      activityType: "Outdoor",
      description: "Wspinaczka na ściance wspinaczkowej dla początkujących i zaawansowanych. Sprzęt zapewniony na miejscu.",
      participants: ["Marcin", "Kasia"],
      maxParticipants: 4
    },
    {
      id: 2,
      name: "Michał Nowak",
      activityName: "Koszykówka",
      photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
      location: "Kraków",
      activityType: "Sport",
      description: "Mecz koszykówki 3 na 3 na otwartym boisku. Przyjdź i pokaż swoje umiejętności!",
      participants: ["Piotr", "Asia", "Tomek"],
      maxParticipants: 3
    },
    {
      id: 3,
      name: "Karolina Wiśniewka",
      activityName: "Yoga w parku",
      photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
      location: "Gdańsk",
      activityType: "Wellness",
      description: "Relaksująca sesja jogi w przepięknym otoczeniu przyrody. Mata i spokój ducha mile widziane.",
      participants: ["Magda"],
      maxParticipants: 5
    },
    {
      id: 4,
      name: "Piotr Zieliński",
      activityName: "Warsztaty gotowania",
      photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      location: "Wrocław",
      activityType: "Kulinarnie",
      description: "Nauczymy się przygotowywać tradycyjne polskie potrawy. Wszystkie składniki i przybory zapewnione.",
      participants: [],
      maxParticipants: 6
    },
    {
      id: 5,
      name: "Magdalena Lewandowska",
      activityName: "Bieganie",
      photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      location: "Poznań",
      activityType: "Cardio",
      description: "Poranny bieg po malowniczych trasach miasta. Tempo dostosowane do grupy, mile widziani początkujący.",
      participants: ["Ola", "Basia", "Ania", "Kinga"],
      maxParticipants: 8
    },
    {
      id: 6,
      name: "Jakub Dąbrowski",
      activityName: "Skateboarding",
      photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      location: "Łódź",
      activityType: "Ekstremalne",
      description: "Triki na deskorolce dla każdego poziomu zaawansowania. Przyjdź i naucz się nowych sztuczek w mirakiej atmosferze.",
      participants: ["Maciek"],
      maxParticipants: 4
    },
    {
      id: 7,
      name: "Natalia Kamińska",
      activityName: "Fotografia uliczna",
      photo: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      location: "Warszawa",
      activityType: "Fotografia",
      description: "Odkrywanie ukrytego piękna miasta przez obiektyw aparatu. Naucz się fotografii street w praktyce.",
      participants: ["Zuza", "Patrycja"],
      maxParticipants: 3
    },
    {
      id: 8,
      name: "Tomasz Woźniak",
      activityName: "Wycieczka rowerowa",
      photo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      location: "Zakopane",
      activityType: "Cycling",
      description: "Malownicza trasa rowerowa po okolicach Zakopanego. Piękne widoki i świeże górskie powietrze gwarantowane.",
      participants: ["Dawid", "Michał", "Bartek", "Rafał"],
      maxParticipants: 5
    },
    {
      id: 9,
      name: "Julia Kaczmarek",
      activityName: "Warsztaty makijażu",
      photo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      location: "Kraków",
      activityType: "Beauty",
      description: "Naucz się tajników profesjonalnego makijażu od doświadczonej wizadżistki. Kosmetyki zapewnione na miejscu.",
      participants: ["Weronika"],
      maxParticipants: 10
    },
    {
      id: 10,
      name: "Łukasz Kowalczyk",
      activityName: "Networking biznesowy",
      photo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop",
      location: "Warszawa",
      activityType: "Biznes",
      description: "Spotkanie profesjonalistów z różnych branż. Kawiarnia, wymiana doświadczeń i nowych kontaktów biznesowych.",
      participants: ["Adam", "Kamil", "Sebastian"],
      maxParticipants: 12
    },
    {
      id: 11,
      name: "Olga Wójcik",
      activityName: "Warsztaty teatralne",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      location: "Gdańsk",
      activityType: "Teatr",
      description: "Odkryj swój talent aktorski w przyjaznej atmosferze. Ćwiczenia improwizacji i interpretacji tekstu dla każdego.",
      participants: ["Monika", "Karolina"],
      maxParticipants: 6
    },
    {
      id: 12,
      name: "Adam Jankowski",
      activityName: "Turystyka górska",
      photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      location: "Tatry",
      activityType: "Górski",
      description: "Wyprawa w Tatry dla miłośników gór. Trasa dla średnio zaawansowanych, piękne widoki gwarantowane.",
      participants: [],
      maxParticipants: 8
    }
  ], []);

  // Filter activities based on active filters
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Category filter
      if (filters.selectedCategory) {
        const categoryMap: { [key: string]: string[] } = {
          'sport': ['Sport', 'Cardio', 'Wellness', 'Outdoor', 'Ekstremalne', 'Cycling'],
          'hobby': ['Fotografia', 'Beauty', 'Rękodzieło', 'Teatr'],
          'events': ['Biznes', 'Teatr', 'Górski'],
          'travel': ['Cycling', 'Górski'],
          'cooking': ['Kulinarnie'],
          'learning': ['Biznes']
        };

        const relevantCategories = categoryMap[filters.selectedCategory] || [];
        const hasMatchingCategory = relevantCategories.includes(activity.activityType);
        if (!hasMatchingCategory) return false;
      }

      // Text search in activity name and description
      if (filters.activity && filters.activity !== 'any') {
        const searchTerm = filters.activity.toLowerCase();
        const nameMatch = activity.activityName.toLowerCase().includes(searchTerm);
        const descriptionMatch = activity.description.toLowerCase().includes(searchTerm);
        const typeMatch = activity.activityType.toLowerCase().includes(searchTerm);
        if (!nameMatch && !descriptionMatch && !typeMatch) return false;
      }

      // Location filter
      if (filters.location) {
        const locationMatch = activity.location.toLowerCase().includes(filters.location.toLowerCase());
        if (!locationMatch) return false;
      }

      return true;
    });
  }, [activities, filters]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleAddAnnouncement = (announcementData: any) => {
    console.log('New announcement:', announcementData);
    // Here you would typically save the announcement to a backend
  };

  return (
    <>
      {/* Vertical Sidebar */}
      <VerticalSidebar
        onAddActivityClick={() => setIsModalOpen(true)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      <AddAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAnnouncement}
      />

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-all duration-300",
          isSidebarExpanded ? "ml-[360px]" : "ml-16"
        )}
      >
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
                Znajdź swoją społeczność
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Odkryj nowe pasje, nawiąż przyjaźnie i dołącz do tysięcy osób, które dzielą Twoje zainteresowania
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {[
                { icon: Users, value: "2,547", label: "Aktywnych członków", color: "text-blue-600" },
                { icon: Calendar, value: "156", label: "Wydarzeń w tym miesiącu", color: "text-purple-600" },
                { icon: Award, value: "4.9", label: "Średnia ocena", color: "text-emerald-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters and Actions */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-8"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <TrendingUp className="w-4 h-4" />
                <span>
                  Znaleziono <span className="font-semibold text-primary">{filteredActivities.length}</span>
                  {' '}z {activities.length} aktywności
                </span>
              </motion.div>
            </motion.div>

            {/* Quick Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="p-6 mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <span className="text-muted-foreground font-medium">Popularne kategorie:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Sport', icon: Zap, color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-200' },
                      { name: 'Technologia', icon: Award, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' },
                      { name: 'Sztuka', icon: Heart, color: 'hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200' },
                      { name: 'Podróże', icon: MapPin, color: 'hover:bg-green-50 hover:text-green-600 hover:border-green-200' },
                      { name: 'Gotowanie', icon: Users, color: 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200' },
                    ].map((category, index) => (
                      <motion.button
                        key={category.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-transparent transition-all duration-200 ${category.color}`}
                      >
                        <category.icon className="w-4 h-4" />
                        <span className="font-medium">{category.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Activities Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={cn(
                "grid gap-6 transition-all duration-300",
                isSidebarExpanded
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredActivities.map((activity, index) => (
                <ActivityCard key={activity.id} activity={activity} index={index} />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredActivities.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Brak wyników</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Nie znaleziono aktywności pasujących do wybranych filtrów. Spróbuj zmienić kryteria wyszukiwania.
                </p>
                <Button
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
                  variant="outline"
                  className="hover:bg-blue-50"
                >
                  Wyczyść wszystkie filtry
                </Button>
              </motion.div>
            )}

            {/* Load More */}
            {filteredActivities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center mt-12"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/80 hover:bg-white border-0 shadow-lg"
                >
                  Załaduj więcej aktywności
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PeoplePage;