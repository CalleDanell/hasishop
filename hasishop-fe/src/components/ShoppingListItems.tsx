import { useParams } from 'react-router-dom';
import { useShoppingListItems } from '../hooks/useShoppingListItem'
import ShoppingListItem from './ShoppingListItem';
import { Anchor, Breadcrumbs, Button, Group, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

function ShoppingListItems() {
  const { id } = useParams<{ id: string }>();
  const { shoppingListItems, loading, error } = useShoppingListItems(id);

  if (!id) {
    return <Title order={1}>List not found.</Title>
  }

  const items = [
    { title: 'Home', href: '/' },
    { title: 'List', href: id ? id : '/' },
  ].map((item, index) => (
    <Anchor href={item.href as string} key={index}>
      {item.title}
    </Anchor>
  ));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Stack style={{ marginTop: 10 }}>
      <Group justify='space-between' align='center'>
        <Breadcrumbs>{items}</Breadcrumbs>
        <Button leftSection={<IconPlus size={14} />}>New item</Button>
      </Group>
      {
        shoppingListItems.map((item) => (
          <ShoppingListItem key={item.id} id={item.id} name={item.name} active={item.active} category={item.category} note={item.note} />
        ))}
    </Stack>
  )
}

export default ShoppingListItems