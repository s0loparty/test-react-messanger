import { useSendMessageMutation } from '@/queryClient/queries/useSendMessageMutation';
import { AppErrorMessage } from '@/shared/components/AppErrorMessage';
import { MessageInput } from '@/shared/components/MessageInput';
import { Button } from '@/shared/components/ui/button';
import { SendHorizonalIcon } from 'lucide-react';
import { useState, type SubmitEventHandler } from 'react';

type Props = {
  chatId: string;
  onSent: (idMessage: string) => void;
};

export function ChatComposer({ chatId, onSent }: Props) {
  const [inputMessage, setInputMessage] = useState('');
  const {
    mutate: sendMessage,
    isPending: isSending,
    error: sendError,
  } = useSendMessageMutation();

  const handleSendMessage: SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    const message = inputMessage.trim();
    if (!message || isSending) return;

    sendMessage(
      { chatId, message },
      {
        onSuccess: ({ idMessage }) => {
          setInputMessage('');
          onSent(idMessage);
        },
      },
    );
  };

  return (
    <div className="shrink-0 bg-white">
      <form
        onSubmit={handleSendMessage}
        className="flex w-full items-center gap-x-2 px-2"
      >
        <MessageInput
          value={inputMessage}
          onChange={setInputMessage}
          disabled={isSending}
        />
        <Button
          type="submit"
          disabled={isSending || !inputMessage.trim()}
          variant="outline"
          className="size-10 rounded-full border-none bg-blue-500 p-0 transition-colors hover:bg-blue-600"
        >
          <SendHorizonalIcon className="size-5 text-white" />
        </Button>
      </form>
      {sendError && <AppErrorMessage message={sendError.message} />}
    </div>
  );
}
