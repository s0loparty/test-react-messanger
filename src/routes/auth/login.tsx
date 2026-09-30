import { useLoginMutation } from '@/queryClient/queries/useLoginMutation';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import { useState, type SubmitEventHandler } from 'react';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [idInstance, setIdInstance] = useState('');
  const [apiToken, setApiToken] = useState('');

  const { mutate, isPending, error } = useLoginMutation();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ idInstance, apiTokenInstance: apiToken });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Войти в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="idInstance">ID Instance</Label>
              <Input
                id="idInstance"
                name="idInstance"
                type="text"
                value={idInstance}
                onChange={(e) => setIdInstance(e.currentTarget.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apiToken">API Token Instance</Label>
              <Input
                id="apiToken"
                name="apiToken"
                type="text"
                value={apiToken}
                onChange={(e) => setApiToken(e.currentTarget.value)}
                required
              />
            </div>
          </div>

          {error?.message && (
            <p className="mt-1 text-red-500">{error.message}</p>
          )}

          <Button disabled={isPending} className="mt-2 w-full">
            Войти
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
