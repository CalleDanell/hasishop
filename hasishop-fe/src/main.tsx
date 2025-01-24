import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@mantine/core/styles.css';
import { Container, MantineProvider } from '@mantine/core';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={{ primaryColor: 'pink' }}>
      <Container size="responsive" style={{ maxWidth: 1200 }}>
        <App />
      </Container>
    </MantineProvider>
  </StrictMode>,
)
