import { useLocation } from 'react-router-dom';
import { useShoppingListItems } from '../../hooks/useShoppingListItem'
import ShoppingListItem from './ShoppingListItem';
import { Anchor, Breadcrumbs, Button, Group, Modal, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import ShoppingListItemForm from './ShoppingListItemForm';
import { CreateShoppingListItemDto, UpdateShoppingListItemDto } from '../../api/shoppingListItemApi';

function ShoppingListItems() {
  const location = useLocation();
  const { listMetadata } = location.state || {};
  const [opened, { open, close }] = useDisclosure(false);
  const { shoppingListItems, addShoppingListItem, updateShoppingListItem, loading, error } = useShoppingListItems(listMetadata.id);

  if (!listMetadata) {
    return <Title order={1}>List not found.</Title>
  }

  const items = [
    { title: 'Shopping lists', href: '/' },
    { title: listMetadata.name, href: listMetadata.id ? listMetadata.id : '/' },
  ].map((item, index) => (
    <Anchor href={item.href as string} key={index}>
      {item.title}
    </Anchor>
  ));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const addShoppingListItemHandler = (dto: CreateShoppingListItemDto) => {
    addShoppingListItem(dto);
    close();
  }

  const updateShoppingListItemHandler = (dto: UpdateShoppingListItemDto) => {
    updateShoppingListItem(dto);
    close();
  }

  return (
    <Stack style={{ marginTop: 10 }}>
      <Modal opened={opened} onClose={close} title="Add item">
        <ShoppingListItemForm addShoppingListItem={addShoppingListItemHandler} shoppingListId={listMetadata.id} />
      </Modal>
      <Group justify='space-between' align='center'>
        <Breadcrumbs>{items}</Breadcrumbs>
        <Button onClick={open} leftSection={<IconPlus size={14} />}>New item</Button>
      </Group>
      <Title order={2}>{listMetadata.name}</Title>
      {
        shoppingListItems.length > 0 ?
          (shoppingListItems.map((item) => (
            <ShoppingListItem updateShoppingListItem={updateShoppingListItemHandler} key={item.id} listId={listMetadata.id} itemId={item.id} name={item.name} active={item.active} category={item.category} note={item.note} />
          ))) : <Title order={3}>This shopping list does not have any items. Add some above. </Title>}
    </Stack>
  )
}

export default ShoppingListItems