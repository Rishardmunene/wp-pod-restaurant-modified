import React from 'react';
import { Link } from 'react-router-dom';
import { usePodData } from '../../hooks/usePodData';

interface NavigationProps {
  type: 'top_nav' | 'side_nav' | 'both' | 'none';
}

interface NavigationItem {
  item_label: string;
  item_link: string;
  item_icon?: string;
  parent_item?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ type }) => {
  const { data: navItems, loading, error } = usePodData<NavigationItem[]>('navigation');

  if (type === 'none' || loading || error || !navItems) {
    return null;
  }

  const renderNavItems = (items: NavigationItem[]) => (
    <ul className="flex gap-6">
      {items.map((item) => (
        <li key={item.item_label}>
          <Link 
            to={item.item_link}
            className="text-gray-700 hover:text-gray-900 flex items-center gap-2"
          >
            {item.item_icon && (
              <img src={item.item_icon} alt="" className="w-5 h-5" />
            )}
            {item.item_label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {(type === 'top_nav' || type === 'both') && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {renderNavItems(navItems)}
          </div>
        </nav>
      )}
      
      {(type === 'side_nav' || type === 'both') && (
        <nav className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6">
          {renderNavItems(navItems)}
        </nav>
      )}
    </>
  );
};