import { Group, Stack, Text, Card, Title, Divider, AvatarGroup, useMantineTheme } from '@mantine/core'
import { ShoppingListModel } from '../../api/shoppingListApi';
import { useHover } from '@mantine/hooks';
import ShareButton from '../shareButton';

function ShoppingList({id, name, collaborators, lastUpdate }: ShoppingListModel) {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  return (
    <Stack style={{ marginTop: 10 }}>
      <Card
        ref={ref}
        withBorder
        shadow="md"
        radius="md"
        padding="md"
        style={{
          backgroundColor: hovered ? theme.colors[theme.primaryColor][1] : 'white',
          cursor: hovered ? 'pointer' : 'auto',
          color: hovered ? 'black' : 'black'
        }}
      >
        <Card.Section inheritPadding py="sm">
          <Group justify='space-between'>
            <Title order={3} fw={700}>{name}</Title>
            <ShareButton title={`Sharing ${name}`} url={`http://localhost:5173/${id}`} text='' />
          </Group>
        </Card.Section>

        <Divider my="md" />
        <Card.Section inheritPadding>
          <Text>Last update: {lastUpdate}</Text>
        </Card.Section>

        <Card.Section inheritPadding py="sm">
          <Group>
            <AvatarGroup>
            {
              collaborators?.length > 0 ?
              collaborators.map((item) => (
                <p>{item}</p>
              )) : null}
            </AvatarGroup>
          </Group>
        </Card.Section>
      </Card>
    </Stack>
  )
}

export default ShoppingList