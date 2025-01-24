import { Card, Checkbox, Group, Text, Title, useMantineTheme } from '@mantine/core'
import { ShoppingItemCategory, UpdateShoppingListItemDto } from '../../api/shoppingListItemApi';
import { IconApple, IconCandy, IconCarrot, IconDeviceUnknown, IconMeat } from '@tabler/icons-react';
import { useState } from 'react';

export interface ShoppingListItemProps {
  updateShoppingListItem: (createShoppingListDto: UpdateShoppingListItemDto) => void;
  listId: string;
  itemId: string;
  name: string;
  active: boolean;
  category: ShoppingItemCategory;
  note: string;
}

function ShoppingListItem({ listId, itemId, name, active, category, note, updateShoppingListItem }: ShoppingListItemProps) {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(active);

  const getCategoryIcon = (category: ShoppingItemCategory | undefined) => {
    switch (category) {
      case ShoppingItemCategory.Meat:
        return <IconMeat />
      case ShoppingItemCategory.Fruit:
        return <IconApple />
      case ShoppingItemCategory.Vegetables:
        return <IconCarrot />
      case ShoppingItemCategory.Snacks:
        return <IconCandy />
      default:
        return <IconDeviceUnknown />;
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);

    const updateDto: UpdateShoppingListItemDto = {
      shoppingListId: listId,
      shoppingListItemId: itemId,
      name,
      active: isChecked,
      category,
      note,
    };
    updateShoppingListItem(updateDto);
  };

  return (
    <Card
      withBorder
      shadow="md"
      radius="md"
      padding="md"
      style={{
        backgroundColor: 'white',
        color: checked ? theme.colors[theme.primaryColor][7] : 'black',
        textDecoration: checked ? 'line-through' : 'none'
      }}
    >
      <Card.Section inheritPadding py="sm">
        <Group>
          {getCategoryIcon(category)}
          <Title order={4} fw={700}>{name}</Title>
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </Group>
      </Card.Section>
      {
        note ?
          (<Card.Section inheritPadding py="sm">
            <Group>
              <Text>{note}</Text>
            </Group>
          </Card.Section>) : null
      }

    </Card>
  );
}

export default ShoppingListItem