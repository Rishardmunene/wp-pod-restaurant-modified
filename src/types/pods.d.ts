interface BasePage {
    navigation_type: 'top_nav' | 'side_nav' | 'both' | 'none';
    page_layout: 'full_width' | 'boxed' | 'contained';
    enable_hero: boolean;
    hero_type?: 'slider' | 'static' | 'video';
    hero_content?: string;
    hero_images?: string[];
  }
  
  interface Restaurant {
    id: number;
    restaurant_name: string;
    restaurant_logo?: string;
    restaurant_images?: string[];
    cuisine_types: string[];
    address: string;
    coordinates?: string;
    operating_hours: OperatingHour[];
  }
  
  interface MenuItem {
    item_name: string;
    item_description?: string;
    item_price: number;
    item_images?: string[];
    ingredients?: string[];
    allergens?: string[];
    nutritional_info?: string;
    preparation_time?: number;
  }
  
  export type { BasePage, Restaurant, MenuItem };