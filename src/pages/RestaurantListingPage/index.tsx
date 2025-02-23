import React from 'react';
import { Layout } from '../../components/base/Layout';
import { RestaurantList } from '../../components/restaurant/RestaurantList';
import { useInitialData } from '../../hooks/useInitialData';
import { Hero } from '../../components/base/Hero';

export const RestaurantListingPage: React.FC = () => {
  const data = useInitialData();

  if (!data) return null;

  return (
    <Layout pageData={data}>
      {data.enable_hero && (
        <Hero 
          type={data.hero_type}
          content={data.hero_content}
          images={data.hero_images}
        />
      )}
      <RestaurantList
        display_type={data.display_type}
        items_per_page={data.items_per_page}
        enable_filters={data.enable_filters}
      />
    </Layout>
  );
};