import { useChatHistoryQuery } from '@/queryClient/queries/useChatHistoryQuery';
import { AppBlockEmptyContent } from '@/shared/components/AppBlockEmptyContent';
import { AppErrorMessage } from '@/shared/components/AppErrorMessage';
import { AppLoaderContent } from '@/shared/components/AppLoaderContent';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { ChatMessageItem } from './ChatMessageItem';

type Props = {
  chatId: string;
  scrollToMessageId: string | null;
};

export function ChatHistory({ chatId, scrollToMessageId }: Props) {
  const { data: messages, error, isFetching } = useChatHistoryQuery({ chatId });
  const sentMessageRef = useRef<HTMLDivElement>(null);
  const lastScrolledMessageId = useRef<string | null>(null);

  useEffect(() => {
    if (
      !scrollToMessageId ||
      lastScrolledMessageId.current === scrollToMessageId ||
      !sentMessageRef.current
    ) {
      return;
    }

    lastScrolledMessageId.current = scrollToMessageId;
    sentMessageRef.current.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'end',
    });
  }, [scrollToMessageId, messages]);

  return (
    <div className="flex min-h-0 w-full grow flex-col">
      {isFetching && <AppLoaderContent className="mx-auto mt-5 text-white" />}
      {error?.message && <AppErrorMessage message={error.message} />}
      {messages?.length === 0 ? (
        <AppBlockEmptyContent>Сообщений пока нет</AppBlockEmptyContent>
      ) : messages ? (
        <ScrollArea className="min-h-0 flex-1 px-4 pb-0.5">
          <div className="mx-auto w-full space-y-2 sm:max-w-3xl">
            {messages.map((message) => (
              <ChatMessageItem
                key={message.idMessage}
                message={message}
                messageRef={
                  message.idMessage === scrollToMessageId
                    ? sentMessageRef
                    : undefined
                }
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}
