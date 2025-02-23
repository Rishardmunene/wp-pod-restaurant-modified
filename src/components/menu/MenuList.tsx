import React from 'react';
import { MenuCategory } from './MenuCategory';
import { MenuItem } from '../../types/pods';

interface MenuListProps {
  items: MenuItem[];
  categories: string[];
}

export const MenuList: React.FC<MenuListProps> = ({ items, categories }) => {
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category] = items.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <MenuCategory
          key={category}
          name={category}
          items={itemsByCategory[category]}
        />
      ))}
    </div>
  );
};
