import React from 'react';
import RestaurantList from '../../components/restaurant/RestaurantList';

interface RestaurantListingPageProps {
  display_type: 'grid' | 'list' | 'masonry';
  items_per_page: number;
  enable_filters: boolean;
}

export const RestaurantListingPage: React.FC<RestaurantListingPageProps> = ({
  display_type,
  items_per_page,
  enable_filters
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantList 
        displayType={display_type}
        itemsPerPage={items_per_page}
        enableFilters={enable_filters}
      />
    </div>
  );
};