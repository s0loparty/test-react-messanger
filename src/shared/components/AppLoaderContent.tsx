import { cn } from 'cn';
import { LoaderIcon } from 'lucide-react';

export function AppLoaderContent({ className }: { className?: string }) {
  return (
    <LoaderIcon className={cn('mx-auto mt-4 size-5 animate-spin', className)} />
  );
}
