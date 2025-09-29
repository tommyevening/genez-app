import React, { useState } from 'react';

interface AddAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (announcement: AnnouncementData) => void;
}

interface AnnouncementData {
  title: string;
  description: string;
  category: string;
  location: string;
  contactInfo: string;
  price?: string;
  image?: string;
}

const AddAnnouncementModal: React.FC<AddAnnouncementModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AnnouncementData>({
    title: '',
    description: '',
    category: '',
    location: '',
    contactInfo: '',
    price: '',
    image: ''
  });

  const [errors, setErrors] = useState<Partial<AnnouncementData>>({});

  const categories = [
    'Usługi',
    'Sprzedaż',
    'Praca',
    'Nieruchomości',
    'Motoryzacja',
    'Elektronika',
    'Dom i ogród',
    'Moda',
    'Sport i rekreacja',
    'Edukacja',
    'Inne'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof AnnouncementData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AnnouncementData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Opis jest wymagany';
    }
    if (!formData.category) {
      newErrors.category = 'Kategoria jest wymagana';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Lokalizacja jest wymagana';
    }
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Informacje kontaktowe są wymagane';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        contactInfo: '',
        price: '',
        image: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ paddingTop: '440px' }}>
      {/* Invisible backdrop for closing */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-100 text-gray-900 rounded-lg border border-gray-300 shadow-lg w-full max-w-4xl m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-900">Dodaj nowe ogłoszenie</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Tytuł ogłoszenia *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Wprowadź tytuł ogłoszenia"
                />
                {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Kategoria *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Wybierz kategorię</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="price" className="text-sm font-medium text-gray-700">
                    Cena
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="np. 500 zł"
                  />
                </div>
              </div>

              {/* Location and Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Lokalizacja *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Miasto, województwo"
                  />
                  {errors.location && <p className="text-xs text-red-600">{errors.location}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="contactInfo" className="text-sm font-medium text-gray-700">
                    Kontakt *
                  </label>
                  <input
                    type="text"
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email lub telefon"
                  />
                  {errors.contactInfo && <p className="text-xs text-red-600">{errors.contactInfo}</p>}
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label htmlFor="image" className="text-sm font-medium text-gray-700">
                  Link do zdjęcia
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Description */}
              <div className="space-y-1">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Opis *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Opisz szczegóły swojego ogłoszenia..."
                />
                {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Dodaj ogłoszenie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;