import { cn } from 'cn';
import type { HTMLAttributes, ReactNode } from 'react';
import { Card, CardContent } from './ui/card';

type Props = {
  children: ReactNode;
  classParent?: HTMLAttributes<HTMLLIElement>['className'];
  classContent?: HTMLAttributes<HTMLLIElement>['className'];
};

export function AppBlockEmptyContent(props: Props) {
  return (
    <Card
      className={cn(
        'mx-auto mt-10 w-[80%] bg-black/50 shadow-none sm:w-sm',
        props.classParent,
      )}
    >
      <CardContent
        className={cn('text-center font-normal text-white', props.classContent)}
      >
        {props.children}
      </CardContent>
    </Card>
  );
}
