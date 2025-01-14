import { useEffect, useState } from 'react';
import { ShoppingListApi, ShoppingListModel } from '../api/shoppingListApi';

const shoppingListApi = new ShoppingListApi('https://api.example.com');

export const useShoppingLists = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const data = await shoppingListApi.fetchShoppingLists();
        setShoppingLists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  return { shoppingLists, loading, error };
};
