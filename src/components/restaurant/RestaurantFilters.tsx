import React, { useState } from 'react';

interface FilterOption {
  filter_type: 'cuisine' | 'rating' | 'price_range' | 'location';
  value: string;
}

export const RestaurantFilters: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  const filterOptions = {
    cuisine: ['Italian', 'Japanese', 'Mexican', 'Indian'],
    rating: ['5', '4', '3', '2', '1'],
    price_range: ['$', '$$', '$$$', '$$$$'],
    location: ['Downtown', 'Suburbs', 'Beach', 'City Center']
  };

  const handleFilterChange = (type: FilterOption['filter_type'], value: string) => {
    setActiveFilters(prev => {
      const exists = prev.find(f => f.filter_type === type && f.value === value);
      if (exists) {
        return prev.filter(f => !(f.filter_type === type && f.value === value));
      }
      return [...prev, { filter_type: type, value }];
    });
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(filterOptions) as Array<keyof typeof filterOptions>).map((type) => (
          <div key={type} className="space-y-2">
            <h3 className="font-semibold capitalize">{type}</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions[type].map((value) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange(type, value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeFilters.some(f => f.filter_type === type && f.value === value)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};