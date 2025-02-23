import { useEffect, useState } from 'react';
import { BasePage, Restaurant } from '../types/pods';

type InitialData = (BasePage & Restaurant) | null;

export const useInitialData = () => {
  const [data, setData] = useState<InitialData>(null);

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const initialData = rootElement.getAttribute('data-initial-data');
      if (initialData) {
        setData(JSON.parse(initialData));
      }
    }
  }, []);

  return data;
}; 