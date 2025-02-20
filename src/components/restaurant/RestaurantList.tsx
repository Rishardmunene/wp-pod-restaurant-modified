import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantFilters } from './RestaurantFilters';
import { usePodData } from '../../hooks/usePodData';
import { Restaurant } from '../../types/pods';

interface RestaurantListProps {
  display_type: 'grid' | 'list' | 'masonry';
  items_per_page: number;
  enable_filters: boolean;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  display_type,
  items_per_page,
  enable_filters
}) => {
  const { data: restaurants, loading, error } = usePodData<Restaurant[]>('restaurant');

  const displayStyles = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    list: 'space-y-6',
    masonry: 'columns-1 md:columns-2 lg:columns-3 gap-6'
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!restaurants) return <div>No restaurants found</div>;

  return (
    <div>
      {enable_filters && <RestaurantFilters />}
      
      <div className={displayStyles[display_type]}>
        {restaurants.slice(0, items_per_page).map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};