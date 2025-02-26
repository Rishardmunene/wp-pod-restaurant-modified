export interface PodData {
  id: number;
  post_title: string;
  post_content: string;
  post_type: string;
  post_status: string;
  post_modified: string;
}

export interface Restaurant extends PodData {
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_images: string[];
  cuisine_types: string[];
  address: string;
  coordinates: string;
  operating_hours: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    open_time: string;
    close_time: string;
    closed: boolean;
  }[];
  price_range: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  menus: Menu[];
  custom_field_items: {
    field_name: string;
    field_type: 'text' | 'textarea' | 'number' | 'boolean' | 'date' | 'url';
    field_value: string;
  }[];
}

export interface RestaurantListResponse {
  restaurants: Restaurant[];
  total: number;
  page: number;
  per_page: number;
  filters: {
    cuisine_types?: string[];
    price_range?: string[];
    rating?: number[];
    location?: string[];
  };
}

export interface MenuItem {
  id: number;
  item_name: string;
  item_description?: string;
  item_price: number;
  item_images?: string[];
  ingredients?: string[];
  allergens?: string[];
  nutritional_info?: string;
  preparation_time?: number;
  category: string;
}

export interface BasePage {
  navigation_type: 'top_nav' | 'side_nav' | 'both' | 'none';
  page_layout: 'full_width' | 'boxed' | 'contained';
  enable_hero: boolean;
  hero_type?: 'slider' | 'static' | 'video';
  hero_content?: string;
  hero_images?: string[];
}