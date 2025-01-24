// hooks/useUsers.ts
import { useEffect, useState } from 'react';
import { CreateShoppingListItemDto, ShoppingListItemApi, ShoppingListItemModel, UpdateShoppingListItemDto } from '../api/shoppingListItemApi';

const shoppingListApi = new ShoppingListItemApi('https://api.example.com');

export const useShoppingListItems = (shoppingListId: string | undefined) => {
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shoppingListId) {
      setLoading(false);
      setError('Error: Missing shopping list id.');
      return;
    }

    const fetchShoppingListItems = async () => {
      try {
        const data = await shoppingListApi.fetchShoppingListItems(shoppingListId);
        setShoppingListItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingListItems();
  }, [shoppingListId]);

  const addShoppingListItem = async (createShoppingListDto: CreateShoppingListItemDto) => {
    try {
      const newItem = await shoppingListApi.createShoppingListItem(createShoppingListDto);
      setShoppingListItems((prevItems) => [...prevItems, newItem]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const updateShoppingListItem = async (createShoppingListDto: UpdateShoppingListItemDto) => {
    try {
      await shoppingListApi.updateShoppingListItem(createShoppingListDto);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return { shoppingListItems, addShoppingListItem, updateShoppingListItem, loading, error };
};
