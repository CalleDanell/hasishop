import { Card, Group, Text, Title } from '@mantine/core'
import { ShoppingItemCategory, ShoppingListItemModel } from '../../api/shoppingListItemApi';
import { useHover } from '@mantine/hooks';
import { IconApple, IconCandy, IconCarrot, IconDeviceUnknown, IconMeat } from '@tabler/icons-react';

function ShoppingListItem({ id, name, active, category, note }: ShoppingListItemModel) {
  const { hovered, ref } = useHover();

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

  return (
    <Card
      ref={ref}
      withBorder
      shadow="md"
      radius="md"
      padding="md"
      style={{
        backgroundColor: hovered ? 'pink' : 'white',
        cursor: hovered ? 'pointer' : 'auto',
        color: hovered ? 'black' : 'black'
      }}
    >
      <Card.Section inheritPadding py="sm">
        <Group>
          {getCategoryIcon(category)}
          <Title order={4} fw={700}>{name}</Title>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py="sm">
        <Group>
          <Text c="dimmed">{note}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default ShoppingListItem