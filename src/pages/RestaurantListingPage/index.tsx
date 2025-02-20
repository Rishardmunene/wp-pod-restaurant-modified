import React from 'react';
import { Layout } from '../../components/base/Layout';
import { RestaurantList } from '../../components/restaurant/RestaurantList';
import { usePodData } from '../../hooks/usePodData';
import { BasePage } from '../../types/pods';

interface RestaurantListingPageData extends BasePage {
  display_type: 'grid' | 'list' | 'masonry';
  items_per_page: number;
  enable_filters: boolean;
}

export const RestaurantListingPage: React.FC = () => {
  const { data: pageData, loading, error } = usePodData<RestaurantListingPageData>('restaurant_listing_page');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!pageData) return <div>Page not found</div>;

  return (
    <Layout pageData={pageData}>
      <RestaurantList
        display_type={pageData.display_type}
        items_per_page={pageData.items_per_page}
        enable_filters={pageData.enable_filters}
      />
    </Layout>
  );
};