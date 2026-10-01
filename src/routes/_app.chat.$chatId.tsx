import { ChatComposer } from '@/components/chat/ChatComposer';
import { ChatHistory } from '@/components/chat/ChatHistory';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_app/chat/$chatId')({
  component: RouteComponent,
});

type StateMessage = {
  chatId: string;
  idMessage: string;
} | null;

function RouteComponent() {
  const { chatId } = Route.useParams();
  const [sentMessage, setSentMessage] = useState<StateMessage>(null);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col">
      <ChatHistory
        chatId={chatId}
        scrollToMessageId={
          sentMessage?.chatId === chatId ? sentMessage.idMessage : null
        }
      />
      <ChatComposer
        chatId={chatId}
        onSent={(idMessage) => setSentMessage({ chatId, idMessage })}
      />
    </div>
  );
}
