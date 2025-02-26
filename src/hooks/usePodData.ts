import { useState, useEffect } from 'react';
import type { Restaurant, BasePage } from '../types/pods';

// Mock data types
type MockData = {
  'restaurant-listing': BasePage & {
    post_type: string;
    display_type: 'grid' | 'list' | 'masonry';
    items_per_page: number;
    enable_filters: boolean;
  };
  'restaurant': Restaurant[];
}

// Test data
const MOCK_DATA: MockData = {
  'restaurant-listing': {
    post_type: 'restaurant_listing_page',
    navigation_type: 'top_nav',
    page_layout: 'contained',
    enable_hero: true,
    hero_type: 'slider',
    hero_content: '<h1>Find Your Perfect Restaurant</h1>',
    hero_images: [
      'https://placehold.co/1200x400',
      'https://placehold.co/1200x400'
    ],
    display_type: 'grid',
    items_per_page: 12,
    enable_filters: true
  },
  'restaurant': [
    {
      id: 1,
      post_title: "Sample Restaurant",
      post_content: "",
      post_type: "restaurant",
      post_status: "publish",
      post_modified: "",
      restaurant_name: "Sample Restaurant",
      restaurant_logo: "/path/to/logo.jpg",
      restaurant_images: [],
      cuisine_types: ["Italian", "Mediterranean"],
      address: "123 Foodie Street, Culinary District",
      coordinates: "40.7128,-74.0060",
      operating_hours: [
        {
          day: "Monday",
          open_time: "11:00",
          close_time: "22:00",
          closed: false
        },
        // ... add other days
      ],
      price_range: "$$",
      rating: 4.5,
      menus: [],
      custom_field_items: []
    },
    {
      id: 2,
      post_title: "Mediterranean Delight",
      post_content: "",
      post_type: "restaurant",
      post_status: "publish",
      post_modified: "",
      restaurant_name: "Mediterranean Delight",
      restaurant_logo: "https://placehold.co/200x200",
      restaurant_images: [
        "https://placehold.co/800x600",
        "https://placehold.co/800x600"
      ],
      cuisine_types: ["Mediterranean", "Greek", "Turkish"],
      address: "456 Olive Grove Ave",
      coordinates: "40.7129,-74.0061",
      operating_hours: [
        {
          day: "Tuesday",
          open_time: "12:00",
          close_time: "21:00",
          closed: false
        },
        {
          day: "Sunday",
          open_time: "12:00",
          close_time: "21:00",
          closed: false
        }
      ],
      price_range: "$$",
      rating: 4.7,
      menus: [
        {
          id: 3,
          item_name: "Mixed Meze Platter",
          item_description: "Selection of traditional appetizers",
          item_price: 24.99,
          category: "Appetizers",
          ingredients: ["Hummus", "Baba ganoush", "Falafel"],
          allergens: ["Sesame"],
          preparation_time: 15
        }
      ],
      custom_field_items: []
    }
  ]
};

interface PodDataResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePodData<T>(podType: string): PodDataResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Handle single restaurant fetch
      if (podType.startsWith('restaurant/')) {
        const id = Number(podType.split('/')[1]);
        const restaurant = MOCK_DATA.restaurant.find(r => r.id === id);
        if (restaurant) {
          setData(restaurant as unknown as T);
        } else {
          throw new Error('Restaurant not found');
        }
      } 
      // Handle restaurant listing
      else if (podType === 'restaurant') {
        setData(MOCK_DATA.restaurant as unknown as T);
      }
      // Handle restaurant listing page
      else if (podType === 'restaurant-listing') {
        setData(MOCK_DATA['restaurant-listing'] as unknown as T);
      }
      else {
        throw new Error('Invalid pod type');
      }

    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, [podType]);

  return { data, loading, error, refetch: fetchData };
}