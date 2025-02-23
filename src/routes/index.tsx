import { createBrowserRouter } from 'react-router-dom';
import { RestaurantListingPage } from '../pages/RestaurantListingPage';
import { SingleRestaurantPage } from '../pages/SingleRestaurantPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RestaurantListingPage />,
  },
  {
    path: '/restaurant/:id',
    element: <SingleRestaurantPage />,
  }
]); 