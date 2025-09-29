import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Target,
  Clock,
  Star,
  Calendar,
  Search,
  Award,
  Palette,
  Plane,
  ChefHat,
  BookOpen,
  Gamepad2,
  Music,
  Camera,
  Dumbbell,
  Coffee,
  Navigation
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterState) => void;
}

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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    radius: '5',
    activity: '',
    timePreference: '',
    skillLevel: '',
    groupSize: '',
    ageRange: '',
    selectedCategory: '',
    priceRange: [0, 100],
    onlineOnly: false,
    instantBooking: false,
    dateRange: '',
    sortBy: 'newest'
  });

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

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleCategorySelect = (categoryId: string) => {
    const newCategory = filters.selectedCategory === categoryId ? '' : categoryId;
    const newFilters = { ...filters, selectedCategory: newCategory };
    setFilters(newFilters);
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

  const applyFilters = () => {
    onFiltersChange(filters);
    onClose();
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
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  useEffect(() => {
    console.log('Sidebar isOpen:', isOpen);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-96 bg-background border-r shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Filtry</h2>
                    <p className="text-sm text-muted-foreground">Spersonalizuj wyniki</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>

              <div className="space-y-6">
                {/* Location Search */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Lokalizacja</Label>
                      </div>
                      <div className="relative">
                        <Input
                          value={filters.location}
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          placeholder="Wprowadź miasto..."
                          className="pr-12"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={getCurrentLocation}
                        >
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Kategorie</Label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category, index) => {
                          const Icon = category.icon;
                          const isSelected = filters.selectedCategory === category.id;
                          return (
                            <motion.button
                              key={category.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleCategorySelect(category.id)}
                              className={cn(
                                "flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 text-sm",
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-lg"
                                  : "border-border hover:border-primary/50 hover:bg-accent"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{category.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Search & Radius */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Aktywność</Label>
                      </div>
                      <Input
                        value={filters.activity}
                        onChange={(e) => handleFilterChange('activity', e.target.value)}
                        placeholder="np. bieganie..."
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Promień</Label>
                      </div>
                      <Select
                        value={filters.radius}
                        onValueChange={(value) => handleFilterChange('radius', value)}
                      >
                        <SelectTrigger>
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
                </motion.div>

                {/* Time & Skill Level */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Czas</Label>
                      </div>
                      <Select
                        value={filters.timePreference}
                        onValueChange={(value) => handleFilterChange('timePreference', value)}
                      >
                        <SelectTrigger>
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

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Poziom</Label>
                      </div>
                      <Select
                        value={filters.skillLevel}
                        onValueChange={(value) => handleFilterChange('skillLevel', value)}
                      >
                        <SelectTrigger>
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
                </motion.div>

                {/* Advanced Filters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-primary" />
                        <Label className="font-semibold">Zaawansowane</Label>
                      </div>

                      <div className="space-y-4">
                        {/* Price Range */}
                        <div>
                          <Label className="text-sm">Cena (zł): {filters.priceRange[0]} - {filters.priceRange[1]}</Label>
                          <Slider
                            value={filters.priceRange}
                            onValueChange={(value: number[]) => setFilters({...filters, priceRange: value})}
                            max={500}
                            min={0}
                            step={10}
                            className="mt-2"
                          />
                        </div>

                        {/* Quick Toggles */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Tylko online</Label>
                            <Switch
                              checked={filters.onlineOnly}
                              onCheckedChange={(checked) => setFilters({...filters, onlineOnly: checked})}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Natychmiastowa rezerwacja</Label>
                            <Switch
                              checked={filters.instantBooking}
                              onCheckedChange={(checked) => setFilters({...filters, instantBooking: checked})}
                            />
                          </div>
                        </div>

                        {/* Sort By */}
                        <div>
                          <Label className="text-sm mb-2 block">Sortuj według</Label>
                          <Select
                            value={filters.sortBy}
                            onValueChange={(value) => handleFilterChange('sortBy', value)}
                          >
                            <SelectTrigger>
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
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3 pt-4"
                >
                  <Button
                    onClick={applyFilters}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    size="lg"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Zastosuj filtry
                  </Button>

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Wyczyść wszystkie
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;