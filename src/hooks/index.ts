import { useEffect, useState } from 'react';
import { getLocalFavorites, setLocalFavorites } from '@/services';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getLocalFavorites());
  }, []);

  const handleFavorites = (id: number) => {
    setLocalFavorites(id);

    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return { favorites, handleFavorites };
}
