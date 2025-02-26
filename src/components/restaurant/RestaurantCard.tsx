import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../types/pods';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link 
      to={`/restaurant/${restaurant.id}`}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {restaurant.restaurant_logo && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={restaurant.restaurant_logo}
            alt={restaurant.restaurant_name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-semibold">{restaurant.restaurant_name}</h3>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.isArray(restaurant.cuisine_types) && restaurant.cuisine_types.map((cuisine, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-gray-100 rounded-full"
            >
              {cuisine}
            </span>
          ))}
        </div>
        
        <p className="mt-2 text-gray-600">{restaurant.address}</p>
        
        {restaurant.operating_hours && (
          <div className="mt-2 text-sm text-gray-500">
            {restaurant.operating_hours.find(h => !h.closed)?.open_time && 'Open Today'}
          </div>
        )}
      </div>
    </Link>
  );
};