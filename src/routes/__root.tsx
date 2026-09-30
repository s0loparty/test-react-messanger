import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
        <TanStackRouterDevtools position="bottom-left" />
      </>
    );
  },
});
