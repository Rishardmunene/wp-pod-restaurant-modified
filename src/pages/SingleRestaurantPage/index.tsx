import React from 'react';
import { usePodData } from '../../hooks/usePodData';
import { Restaurant, BasePage } from '../../types/pods';
import { Layout } from '../../components/base/Layout';
import { ImageGallery } from '../../components/common/ImageGallery';
import { LocationMap } from '../../components/common/LocationMap';
import { MenuList } from '../../components/menu/MenuList';

interface SingleRestaurantPageProps {
  id: number;
}

export const SingleRestaurantPage: React.FC<SingleRestaurantPageProps> = ({ id }) => {
  const { data: restaurant, loading, error } = usePodData<Restaurant>(`restaurant/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!restaurant) return <div>Restaurant not found</div>;

  // Create base page data
  const basePageData: BasePage = {
    navigation_type: 'top_nav',
    page_layout: 'contained',
    enable_hero: false
  };

  return (
    <Layout pageData={basePageData}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{restaurant.restaurant_name}</h1>
        
        <ImageGallery 
          images={restaurant.restaurant_images || []} 
          alt={restaurant.restaurant_name}
        />
        
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <LocationMap 
            coordinates={restaurant.coordinates || ''} 
            address={restaurant.address}
          />
          <MenuList 
            items={restaurant.menus || []} 
            categories={['Appetizers', 'Main Course', 'Desserts']}
          />
        </div>
      </div>
    </Layout>
  );
}; 