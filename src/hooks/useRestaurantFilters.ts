import { useState, useCallback } from 'react';
import { Restaurant } from '../types/pods';

interface Filters {
  cuisine_type?: string;
  price_range?: string;
  rating?: number;
  location?: string;
}

export const useRestaurantFilters = (restaurants: Restaurant[]) => {
  const [filters, setFilters] = useState<Filters>({});

  const filteredRestaurants = useCallback(() => {
    return restaurants.filter(restaurant => {
      if (filters.cuisine_type && !restaurant.cuisine_types.includes(filters.cuisine_type)) {
        return false;
      }
      if (filters.price_range && restaurant.price_range !== filters.price_range) {
        return false;
      }
      if (filters.rating && restaurant.rating < filters.rating) {
        return false;
      }
      if (filters.location && !restaurant.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [restaurants, filters]);

  return {
    filters,
    setFilters,
    filteredRestaurants
  };
};
