import React from 'react';
import { MenuItem as MenuItemType } from '../../types/pods';

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{item.item_name}</h3>
          {item.item_description && (
            <p className="mt-1 text-sm text-gray-600">{item.item_description}</p>
          )}
          {item.preparation_time && (
            <p className="mt-1 text-sm text-gray-500">
              Prep time: {item.preparation_time} mins
            </p>
          )}
        </div>
        <span className="font-semibold">${item.item_price.toFixed(2)}</span>
      </div>
      
      {(item.allergens?.length || item.ingredients?.length) && (
        <div className="mt-3 space-y-2">
          {item.ingredients?.length && (
            <p className="text-sm">
              <span className="font-medium">Ingredients:</span>{' '}
              {item.ingredients.join(', ')}
            </p>
          )}
          {item.allergens?.length && (
            <p className="text-sm text-red-600">
              <span className="font-medium">Allergens:</span>{' '}
              {item.allergens.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
