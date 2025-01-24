import { TextInput, Button, Group, Stack, ActionIcon, Chip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { CreateShoppingListDto } from '../../api/shoppingListApi';

export interface ShoppingListFormProps {
  addShoppingList: (createShoppingListDto: CreateShoppingListDto) => void;
}

function ShoppingListForm({ addShoppingList }: ShoppingListFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the input element
  const [error, setError] = useState<string | null>(null); // Error state
  const form = useForm({
    initialValues: {
      name: '',
      collaborators: [] as string[],
    },
  });

  const [inputValue, setInputValue] = useState("");

  const validateCollaborators = (collaborators: string) => (/^\S+@\S+$/.test(collaborators) ? true : false);

  const handleAddItem = () => {
    const validEmail = validateCollaborators(inputValue);
    if (!validEmail) {
      setError('Invalid email');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setError(null);
      if (inputValue.trim()) {
        form.insertListItem('collaborators', inputValue.trim());
        setInputValue("");
      }
    }
  };

  const handleRemoveItem = (item: string) => {
    const index = form.getValues().collaborators.indexOf(item);
    form.removeListItem('collaborators', index);
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => addShoppingList(values))}>
        <TextInput
          required
          withAsterisk
          label="Name"
          placeholder="my awesome list"
          {...form.getInputProps('name')}
        />

        <Group>
          <TextInput
            placeholder="email"
            label="Collaborators"
            value={inputValue}
            error={error} // Dynamically show error
            ref={inputRef} // Attach ref to the input
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
              }
            }}
            rightSection={<IconPlus size={18} onClick={handleAddItem} />}
          />
        </Group>
        <Stack pt='lg'>
          {form.getValues().collaborators.map((item, index) => (
            <Group key={index}>
              <Chip checked={false} onChange={() => { }}>{item}</Chip>
              <ActionIcon color="red" onClick={() => handleRemoveItem(item)}>
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ))}
        </Stack>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  )
}

export default ShoppingListForm