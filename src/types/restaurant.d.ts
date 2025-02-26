import { Restaurant as BaseRestaurant } from './pods';

export interface RestaurantFilters {
  cuisine_types?: string[];
  price_range?: string[];
  rating?: number[];
  location?: string[];
}

export interface RestaurantListResponse {
  restaurants: BaseRestaurant[];
  total: number;
  page: number;
  per_page: number;
  filters: RestaurantFilters;
}

export { BaseRestaurant as Restaurant };


