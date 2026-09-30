// @ts-expect-error twallpaper не удается найти импорт, а он есть
import '@twallpaper/react/css';
import './assets/css/app.css';

import { QueryClientProvider } from '@tanstack/react-query';
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { subscribeToAuthLoss } from './api/http';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree, history: createHashHistory() });

subscribeToAuthLoss(() => {
  queryClient.clear();
  router.invalidate();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
