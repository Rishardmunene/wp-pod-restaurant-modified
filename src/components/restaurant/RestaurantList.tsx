import React from 'react';
import { RestaurantCard } from './RestaurantCard';
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

  if (loading) return <div>Loading restaurants...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!restaurants?.length) return <div>No restaurants found</div>;

  const gridClass = {
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
    list: 'space-y-6',
    masonry: 'columns-1 md:columns-2 lg:columns-3 gap-6'
  }[display_type];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {enable_filters && (
        <div className="mb-8">
          {/* Filter components will go here */}
        </div>
      )}
      
      <div className={gridClass}>
        {restaurants.slice(0, items_per_page).map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};