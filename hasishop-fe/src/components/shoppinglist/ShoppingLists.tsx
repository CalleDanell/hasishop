import { Button, Group, Modal, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';

import { useShoppingLists } from '../../hooks/useShoppingList'
import ShoppingList from './ShoppingList';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ShoppingListForm from './ShoppingListForm';
import { CreateShoppingListDto, ShoppingListModel } from '../../api/shoppingListApi';

function ShoppingLists() {
  const { shoppingLists, addShoppingList, loading, error } = useShoppingLists();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleNavigate = (list: ShoppingListModel) => {
    navigate(`/${list.id}`, { state: { listMetadata: list } });
  };

  const addShoppingListHandler = (dto: CreateShoppingListDto) => {
    addShoppingList(dto);
    close();
  }

  return (
    <Stack style={{ marginTop: 10 }}>
      <Modal opened={opened} onClose={close} title="Add shopping list">
        <ShoppingListForm addShoppingList={addShoppingListHandler}/>
      </Modal>
      <Group justify='space-between' align='center'>
        <Title order={2}>Shopping Lists</Title>
        <Button onClick={open} leftSection={<IconPlus size={14} />}>New shopping list</Button>
      </Group>
      <Stack>
        {
        shoppingLists.length > 0 ?
        shoppingLists.map((list) => (
          <span key={"span-" + list.id} onClick={() => handleNavigate(list)}>
            <ShoppingList key={list.id} name={list.name} id={list.id} completed={list.completed} collaborators={list.collaborators} lastUpdate={list.lastUpdate}/>
          </span>
        )) : 
        <Title>You don't have any shopping lists. Create one above.</Title>}
      </Stack>
    </Stack>
  )
}

export default ShoppingLists