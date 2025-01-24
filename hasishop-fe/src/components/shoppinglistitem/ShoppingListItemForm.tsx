import { TextInput, Button, Group, Stack, Radio } from '@mantine/core';
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
          placeholder="Name"
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Note"
          placeholder="Note"
          {...form.getInputProps('note')}
        />

        <Radio.Group
          name="itemCategory"
          label="Select the item category"
          withAsterisk
          {...form.getInputProps('category')}
        >
          <Group mt="xs">
            <Radio value={ShoppingItemCategory.Other} label="Other" />
            <Radio value={ShoppingItemCategory.Meat} label="Meat" />
            <Radio value={ShoppingItemCategory.Fruit} label="Fruit" />
            <Radio value={ShoppingItemCategory.Vegetables} label="Vegetables" />
            <Radio value={ShoppingItemCategory.Snacks} label="Snacks" />
          </Group>

        </Radio.Group>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  )
}

export default ShoppingListItemForm