import React from 'react';
import { MenuItem } from './MenuItem';
import { MenuItem as MenuItemType } from '../../types/pods';

interface MenuCategoryProps {
  name: string;
  items: MenuItemType[];
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ name, items }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold border-b pb-2">{name}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
