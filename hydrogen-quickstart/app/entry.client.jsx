import { QueryClient, QueryClientProvider } from 'react-query';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';


const queryClient = new QueryClient();

hydrateRoot(
  document,
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <RemixBrowser />
      </QueryClientProvider>
  </StrictMode>,
);
