import { createBrowserRouter } from 'react-router-dom';
import { RestaurantListingPage } from '../pages/RestaurantListingPage';
import { SingleRestaurantPage } from '../pages/SingleRestaurantPage';

const defaultSettings = {
  display_type: 'grid' as const,
  items_per_page: 12,
  enable_filters: true
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RestaurantListingPage {...defaultSettings} />,
  },
  {
    path: '/restaurant/:id',
    element: <SingleRestaurantPage id={0} />,
    loader: ({ params }) => {
      return { id: Number(params.id) };
    },
  }
]); 