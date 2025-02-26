import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RestaurantListingPage } from './pages/RestaurantListingPage'
import { SingleRestaurantPage } from './pages/SingleRestaurantPage'
import RestaurantList from './components/restaurant/RestaurantList'

interface PageSettings {
  display_type: 'grid' | 'list' | 'masonry';
  items_per_page: number;
  enable_filters: boolean;
}

interface AppProps {
  pageData: {
    post_type: string;
    post_id: number;
    template: string;
    settings: {
      display_type: 'grid' | 'list';
      items_per_page: number;
      enable_filters: boolean;
    };
  }
}

const App: React.FC<AppProps> = ({ pageData }) => {
  console.log('Page Data:', pageData); // Debug log

  // Check if this is a restaurant listing page
  if (pageData.template === 'templates/restaurant-listing.php') {
    return (
      <BrowserRouter>
        <div className="wp-react-pods">
          <RestaurantList 
            displayType={pageData.settings.display_type}
            itemsPerPage={pageData.settings.items_per_page}
            enableFilters={pageData.settings.enable_filters}
          />
        </div>
      </BrowserRouter>
    );
  }

  const defaultSettings: PageSettings = {
    display_type: 'grid',
    items_per_page: 12,
    enable_filters: true
  };

  switch (pageData.post_type) {
    case 'restaurant':
      return <SingleRestaurantPage id={pageData.post_id} />;
    case 'restaurant_listing_page':
      const settings = pageData.settings || defaultSettings;
      return (
        <BrowserRouter>
          <RestaurantListingPage 
            display_type={settings.display_type}
            items_per_page={settings.items_per_page}
            enable_filters={settings.enable_filters}
          />
        </BrowserRouter>
      );
    default:
      return <div>Page type not supported</div>;
  }
}

export default App
