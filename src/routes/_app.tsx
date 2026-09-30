import { getInstanceCredentials } from '@/api/http';
import catsAndDogs from '@/assets/cats_and_dogs.svg';
import { Aside } from '@/components/aside/Aside';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { TWallpaper } from '@twallpaper/react';

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    if (!getInstanceCredentials()) {
      throw redirect({ to: '/auth/login', replace: true });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-dvh">
      <TWallpaper
        options={{
          colors: ['#679ced', '#e39fea', '#888dec', '#8adbf2'],
          animate: false,
          fps: 1,
          pattern: {
            mask: false,
            image: catsAndDogs,
          },
        }}
      />

      <div className="flex min-h-0 w-full">
        <Aside />
        <Outlet />
      </div>
    </div>
  );
}
