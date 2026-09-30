import { Toaster } from '@/shared/components/ui/sonner';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <Outlet />
      <Toaster />
    </main>
  );
}
