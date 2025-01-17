import { Group, Stack, Text, Card, Title, Divider, AvatarGroup, Avatar } from '@mantine/core'
import { ShoppingListModel } from '../../api/shoppingListApi';
import { useHover } from '@mantine/hooks';

function ShoppingList({ id, name }: ShoppingListModel) {
  const { hovered, ref } = useHover();

  return (
    <Stack style={{ marginTop: 10 }}>
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
            <Title order={3} c="dimmed">#{id}</Title>
            <Title order={3} fw={700}>{name}</Title>
          </Group>
        </Card.Section>

        <Divider my="md" />
        <Card.Section inheritPadding>
          <Text>Last update: {Date.now()}</Text>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Group>
            <AvatarGroup>
              <Avatar></Avatar>
              <Avatar></Avatar>
            </AvatarGroup>
          </Group>
        </Card.Section>
      </Card>
    </Stack>
  )
}

export default ShoppingList