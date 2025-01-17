import { TextInput, Button, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CreateShoppingListItemDto, ShoppingItemCategory } from '../../api/shoppingListItemApi';

export interface ShoppingListItemFormProps {
  addShoppingListItem: (createShoppingListDto: CreateShoppingListItemDto) => void;
  shoppingListId: string;
}

function ShoppingListItemForm({ shoppingListId, addShoppingListItem }: ShoppingListItemFormProps) {
  const form = useForm({
    initialValues: {
      shoppingListId: shoppingListId,
      name: '',
      category: ShoppingItemCategory.Other,
      active: true,
      note: ''
    }
  });

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => addShoppingListItem(values))}>
        <TextInput
          required
          withAsterisk
          label="Name"
          placeholder="item"
          {...form.getInputProps('name')}
        />

        <TextInput
          required
          withAsterisk
          label="Note"
          placeholder="note"
          {...form.getInputProps('note')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  )
}

export default ShoppingListItemForm