import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Target,
  Clock,
  Star,
  Search,
  Award,
  Navigation,
  Dumbbell,
  Palette,
  Calendar,
  Plane,
  ChefHat,
  BookOpen,
  Gamepad2,
  Music,
  Camera,
  Coffee,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { cn } from '../lib/utils';

export interface FilterState {
  location: string;
  radius: string;
  activity: string;
  timePreference: string;
  skillLevel: string;
  groupSize: string;
  ageRange: string;
  selectedCategory: string;
  priceRange: number[];
  onlineOnly: boolean;
  instantBooking: boolean;
  dateRange: string;
  sortBy: string;
}

interface VerticalSidebarProps {
  onAddActivityClick: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const VerticalSidebar: React.FC<VerticalSidebarProps> = ({
  onAddActivityClick,
  filters,
  onFiltersChange,
  isExpanded,
  setIsExpanded
}) => {
  const categories = [
    { id: 'sport', icon: Dumbbell, name: 'Sport', color: 'bg-red-500' },
    { id: 'hobby', icon: Palette, name: 'Hobby & Sztuka', color: 'bg-purple-500' },
    { id: 'events', icon: Calendar, name: 'Wydarzenia', color: 'bg-blue-500' },
    { id: 'travel', icon: Plane, name: 'Podróże', color: 'bg-green-500' },
    { id: 'cooking', icon: ChefHat, name: 'Gotowanie', color: 'bg-orange-500' },
    { id: 'learning', icon: BookOpen, name: 'Nauka', color: 'bg-indigo-500' },
    { id: 'gaming', icon: Gamepad2, name: 'Gaming', color: 'bg-pink-500' },
    { id: 'music', icon: Music, name: 'Muzyka', color: 'bg-yellow-500' },
    { id: 'photo', icon: Camera, name: 'Fotografia', color: 'bg-teal-500' },
    { id: 'social', icon: Coffee, name: 'Spotkania', color: 'bg-amber-500' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleCategorySelect = (categoryId: string) => {
    const newCategory = filters.selectedCategory === categoryId ? '' : categoryId;
    const newFilters = { ...filters, selectedCategory: newCategory };
    onFiltersChange(newFilters);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          handleFilterChange('location', `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        },
        (error) => {
          alert('Nie udało się pobrać lokalizacji: ' + error.message);
        }
      );
    } else {
      alert('Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.');
    }
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
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
    };
    onFiltersChange(emptyFilters);
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isExpanded ? 360 : 64
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200
      }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-30 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Filtry</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-9 w-9 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!isExpanded ? (
          // Collapsed state - icon buttons
          <div className="p-3 space-y-2">
            {/* Add Activity Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onAddActivityClick}
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md p-0 h-11 w-11"
                title="Dodaj aktywność"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Location Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-blue-50"
                title="Lokalizacja"
              >
                <MapPin className="h-5 w-5 text-blue-600" />
              </Button>
            </motion.div>

            {/* Categories Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-purple-50"
                title="Kategorie"
              >
                <Target className="h-5 w-5 text-purple-600" />
              </Button>
            </motion.div>

            {/* Activity Search Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-green-50"
                title="Wyszukaj aktywność"
              >
                <Search className="h-5 w-5 text-green-600" />
              </Button>
            </motion.div>

            {/* Radius Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-orange-50"
                title="Promień"
              >
                <Navigation className="h-5 w-5 text-orange-600" />
              </Button>
            </motion.div>

            {/* Time Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-red-50"
                title="Czas"
              >
                <Clock className="h-5 w-5 text-red-600" />
              </Button>
            </motion.div>

            {/* Skill Level Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-yellow-50"
                title="Poziom umiejętności"
              >
                <Star className="h-5 w-5 text-yellow-600" />
              </Button>
            </motion.div>

            {/* Advanced Filters Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                className="w-full justify-center p-0 h-11 w-11 hover:bg-indigo-50"
                title="Filtry zaawansowane"
              >
                <Award className="h-5 w-5 text-indigo-600" />
              </Button>
            </motion.div>
          </div>
        ) : (
          // Expanded state - full filters
          <div className="p-4 space-y-4">
            {/* Add Activity Button */}
            <Button
              onClick={onAddActivityClick}
              className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Dodaj aktywność
            </Button>

            {/* Location Search */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Lokalizacja</Label>
                </div>
                <div className="relative">
                  <Input
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Wprowadź miasto..."
                    className="pr-10 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-7 w-7 p-0"
                    onClick={getCurrentLocation}
                  >
                    <Navigation className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Kategorie</Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = filters.selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg border-2 transition-all duration-200 text-xs",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-accent"
                        )}
                      >
                        <Icon className="w-3 h-3 flex-shrink-0" />
                        <span className="font-medium truncate">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Activity Search */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Aktywność</Label>
                </div>
                <Input
                  value={filters.activity}
                  onChange={(e) => handleFilterChange('activity', e.target.value)}
                  placeholder="np. bieganie..."
                  className="text-sm"
                />
              </CardContent>
            </Card>

            {/* Radius */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Promień</Label>
                </div>
                <Select
                  value={filters.radius}
                  onValueChange={(value) => handleFilterChange('radius', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Zasięg" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 km</SelectItem>
                    <SelectItem value="2">2 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Time Preference */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Czas</Label>
                </div>
                <Select
                  value={filters.timePreference}
                  onValueChange={(value) => handleFilterChange('timePreference', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Kiedy?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Dowolna pora</SelectItem>
                    <SelectItem value="morning">Rano (6:00-12:00)</SelectItem>
                    <SelectItem value="afternoon">Popołudnie (12:00-18:00)</SelectItem>
                    <SelectItem value="evening">Wieczór (18:00-22:00)</SelectItem>
                    <SelectItem value="weekend">Weekendy</SelectItem>
                    <SelectItem value="weekday">Dni robocze</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Skill Level */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Poziom</Label>
                </div>
                <Select
                  value={filters.skillLevel}
                  onValueChange={(value) => handleFilterChange('skillLevel', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Umiejętności" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Dowolny</SelectItem>
                    <SelectItem value="beginner">Początkujący</SelectItem>
                    <SelectItem value="intermediate">Średniozaawansowany</SelectItem>
                    <SelectItem value="advanced">Zaawansowany</SelectItem>
                    <SelectItem value="mixed">Mieszana grupa</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Advanced Filters */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Zaawansowane</Label>
                </div>

                <div className="space-y-3">
                  {/* Price Range */}
                  <div>
                    <Label className="text-xs">Cena (zł): {filters.priceRange[0]} - {filters.priceRange[1]}</Label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value: number[]) => handleFilterChange('priceRange', value)}
                      max={500}
                      min={0}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  {/* Quick Toggles */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Tylko online</Label>
                      <Switch
                        checked={filters.onlineOnly}
                        onCheckedChange={(checked) => handleFilterChange('onlineOnly', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Natychmiastowa rezerwacja</Label>
                      <Switch
                        checked={filters.instantBooking}
                        onCheckedChange={(checked) => handleFilterChange('instantBooking', checked)}
                      />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <Label className="text-xs mb-2 block">Sortuj według</Label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => handleFilterChange('sortBy', value)}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Najnowsze</SelectItem>
                        <SelectItem value="distance">Odległość</SelectItem>
                        <SelectItem value="price-low">Cena: od najniższej</SelectItem>
                        <SelectItem value="price-high">Cena: od najwyższej</SelectItem>
                        <SelectItem value="rating">Najwyżej oceniane</SelectItem>
                        <SelectItem value="popular">Najpopularniejsze</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clear Filters Button */}
            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full text-sm"
            >
              <X className="w-4 h-4 mr-2" />
              Wyczyść filtry
            </Button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default VerticalSidebar;