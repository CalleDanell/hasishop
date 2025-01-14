import { Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { ShoppingItemCategory, ShoppingListItemModel } from '../api/shoppingListItemApi';
import { useHover } from '@mantine/hooks';
import { IconApple, IconCandy, IconCarrot, IconDeviceUnknown, IconMeat } from '@tabler/icons-react';

function ShoppingListItem({id, name, active, category, note}: ShoppingListItemModel) {
  const { hovered, ref } = useHover();

  const getCategoryIcon = (category: ShoppingItemCategory | undefined) => {
    let icon = <IconDeviceUnknown/>;
    if(!category) {
      return icon;
    } 
    
    switch(category) {
        case ShoppingItemCategory.Meat:
            icon = <IconMeat/>
            break;
        case ShoppingItemCategory.Fruit:
            icon = <IconApple/>
            break;
        case ShoppingItemCategory.Vegetables:
            icon = <IconCarrot/>
            break;
        case ShoppingItemCategory.Snacks:
            icon = <IconCandy/>
            break;
      }
      return icon;
    }
  
    return (
      <Card 
        ref={ref} 
        withBorder 
        shadow="md" 
        radius="md" 
        padding="md"
        style={{
            backgroundColor: hovered ? 'lightgray' : 'white', 
            cursor: hovered ? 'pointer' : 'auto'
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