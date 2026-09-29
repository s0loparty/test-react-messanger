import './assets/css/app.css';

import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree, history: createHashHistory() });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
