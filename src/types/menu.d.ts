export interface Menu {
  id: number;
  menu_name: string;
  menu_type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Special';
  menu_items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  dietary_info?: string[];
  spice_level?: 1 | 2 | 3 | 4 | 5;
}
