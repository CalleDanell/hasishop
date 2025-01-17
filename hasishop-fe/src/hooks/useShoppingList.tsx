import { useEffect, useState } from 'react';
import { CreateShoppingListDto, ShoppingListApi, ShoppingListModel, UpdateShoppingListDto } from '../api/shoppingListApi';

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

  const updateShoppingList = async (id: string, updateShoppingListDto: UpdateShoppingListDto) => {
    try {
      await shoppingListApi.updateShoppingList(id, updateShoppingListDto);
      //setShoppingLists((prevShoppingLists) =>
      //  prevShoppingLists.map((item) => (item.id === id ? updatedList : item))
      //);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const addShoppingList = async (createShoppingListDto: CreateShoppingListDto) => {
    try {
      await shoppingListApi.createShoppingList(createShoppingListDto);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const deleteShoppingList = async (id: string) => {
    try {
      await shoppingListApi.deleteShoppingList(id);
      //setShoppingLists((prevShoppingLists) =>
      //  prevShoppingLists.filter((item) => item.id !== id)
      //);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return { addShoppingList, deleteShoppingList, updateShoppingList, shoppingLists, loading, error };
};