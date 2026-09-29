import { Aside } from '@/components/aside/Aside';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="flex">
      <div className="flex">
        <Aside />
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </div>
  ),
});
