import { Button, Group, Stack, Title } from '@mantine/core'
import { useShoppingLists } from '../hooks/useShoppingList'
import ShoppingList from './ShoppingList';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function ShoppingLists() {
  const { shoppingLists, loading, error } = useShoppingLists();
  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleNavigate = (id: string) => {
    navigate(`/${id}`); // Replace with your desired route
  };

  return (
    <Stack style={{ marginTop: 10 }}>
      <Group justify='space-between' align='center'>
        <Title order={2}>Shopping Lists</Title>
        <Button leftSection={<IconPlus size={14} />}>New shopping list</Button>
      </Group>
      <Stack>
        {shoppingLists.map((list) => (
          <span key={"span-" + list.id} onClick={() => handleNavigate(list.id)}>
            <ShoppingList key={list.id} name={list.name} id={list.id} completed={list.completed} />
          </span>
        ))}
      </Stack>
    </Stack>
  )
}

export default ShoppingLists