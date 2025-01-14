// hooks/useUsers.ts
import { useEffect, useState } from 'react';
import { ShoppingListItemApi, ShoppingListItemModel } from '../api/shoppingListItemApi';

const shoppingListApi = new ShoppingListItemApi('https://api.example.com');

export const useShoppingListItems = (shoppingListId: string | undefined) => {
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    if (!shoppingListId) {
      setLoading(false);
      setError(new Error("Invalid shopping list id."));
      return;
    }

    const fetchShoppingListItems = async () => {
      try {
        const data = await shoppingListApi.fetchShoppingListItems(shoppingListId);
        setShoppingListItems(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(new Error(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingListItems();
  }, [shoppingListId]);

  return { shoppingListItems, loading, error };
};
