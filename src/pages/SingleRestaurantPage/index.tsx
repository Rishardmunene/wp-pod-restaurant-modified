import React from 'react';
import { Layout } from '../../components/base/Layout';
import { useInitialData } from '../../hooks/useInitialData';
import { ImageGallery } from '../../components/common/ImageGallery';
import { LocationMap } from '../../components/common/LocationMap';
import { MenuList } from '../../components/menu/MenuList';

export const SingleRestaurantPage: React.FC = () => {
  const data = useInitialData();

  if (!data) return null;

  return (
    <Layout pageData={data}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{data.restaurant_name}</h1>
        
        <ImageGallery 
          images={data.restaurant_images || []} 
          alt={data.restaurant_name}
        />
        
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <LocationMap 
            coordinates={data.coordinates || ''} 
            address={data.address}
          />
          <MenuList 
            items={data.menus} 
            categories={['Appetizers', 'Main Course', 'Desserts']}
          />
        </div>
      </div>
    </Layout>
  );
}; 