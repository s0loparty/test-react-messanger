import { useChatHistoryQuery } from '@/queryClient/queries/useChatHistoryQuery';
import { useSendMessageMutation } from '@/queryClient/queries/useSendMessageMutation';
import { AppBlockEmptyContent } from '@/shared/components/AppBlockEmptyContent';
import { AppErrorMessage } from '@/shared/components/AppErrorMessage';
import { AppLoaderContent } from '@/shared/components/AppLoaderContent';
import { MessageInput } from '@/shared/components/MessageInput';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Bubble, BubbleContent } from '@/shared/components/ui/bubble';
import { Button } from '@/shared/components/ui/button';
import {
  Message,
  MessageAvatar,
  MessageContent,
} from '@/shared/components/ui/message';
import { createFileRoute } from '@tanstack/react-router';
import { SendHorizonalIcon } from 'lucide-react';
import { useState, type SubmitEventHandler } from 'react';

export const Route = createFileRoute('/_app/chat/$chatId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { chatId } = Route.useParams();

  const [inputMessage, setInputMessage] = useState('');

  const { data: messages, error, isFetching } = useChatHistoryQuery({ chatId });
  const { mutate: sendMessage } = useSendMessageMutation({
    chatId,
    message: inputMessage,
  });

  const handleSendMessage: SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    console.log('inputMessage', inputMessage);

    sendMessage();
    setInputMessage('');
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grow">
        {isFetching && <AppLoaderContent className="mx-auto mt-5 text-white" />}
        {error && error?.message && <AppErrorMessage message={error.message} />}
        {messages?.length === 0 ? (
          <AppBlockEmptyContent>Сообщений пока нет</AppBlockEmptyContent>
        ) : messages ? (
          <div>
            {messages.map((mess) => (
              <Message key={mess.idMessage}>
                <MessageAvatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <Bubble>
                    <BubbleContent>{mess.textMessage}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bg-white">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center gap-x-2 px-2"
        >
          <MessageInput value={inputMessage} onChange={setInputMessage} />
          <Button
            variant={'outline'}
            className="size-10 rounded-full border-none bg-blue-500 p-0 transition-colors hover:bg-blue-600"
          >
            <SendHorizonalIcon className="size-5 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}
