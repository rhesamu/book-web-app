import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Books, CreateBook, EditBook } from '@/views';
import './index.scss';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Books />,
  },
  {
    path: '/create',
    element: <CreateBook />,
  },
  {
    path: '/edit/:bookId',
    element: <EditBook />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
