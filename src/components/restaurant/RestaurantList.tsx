import React, { useEffect, useState } from 'react';
import { RestaurantFilters } from './RestaurantFilters';
import { RestaurantCard } from './RestaurantCard';
import { Restaurant } from '../../types/pods';

interface RestaurantListProps {
  displayType: 'grid' | 'list' | 'masonry';
  itemsPerPage: number;
  enableFilters: boolean;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  displayType,
  itemsPerPage,
  enableFilters
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/wp-json/wp-react-pods/v1/restaurants');
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const data = await response.json();
        setRestaurants(data.restaurants);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch restaurants'));
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <div>Loading restaurants...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!restaurants?.length) return <div>No restaurants found</div>;

  return (
    <div className="restaurant-list">
      <h1>Our Restaurants</h1>
      {enableFilters && <RestaurantFilters />}
      <div className={`restaurant-container ${displayType}`}>
        {restaurants.slice(0, itemsPerPage).map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;