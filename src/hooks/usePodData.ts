import { useState, useEffect } from 'react';

export function usePodData<T>(podName: string, id?: number) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPodData() {
      try {
        const response = await fetch(
          `/wp-json/wp/v2/${podName}${id ? `/${id}` : ''}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchPodData();
  }, [podName, id]);

  return { data, loading, error };
}