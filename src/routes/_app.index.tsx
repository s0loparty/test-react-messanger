import { AppBlockEmptyContent } from '@/shared/components/AppBlockEmptyContent';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <>
      <div className="h-max w-full">
        <AppBlockEmptyContent>
          Здесь пока ничего нет... <br />
          ¯\_(ツ)_/¯
        </AppBlockEmptyContent>
      </div>
    </>
  );
}
