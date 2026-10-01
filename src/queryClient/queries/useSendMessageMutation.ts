import { sendMessage } from '@/api/app.api';
import type {
  ChatMessage,
  GetChatHistoryResponse,
} from '@/shared/types/messages';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appKeys } from '../keys';

export function useSendMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: appKeys.sendMessage().queryKey,
    mutationFn: sendMessage,
    onSuccess: ({ idMessage }, { chatId, message }) => {
      const sentMessage: ChatMessage = {
        type: 'outgoing',
        idMessage,
        chatId,
        timestamp: Math.floor(Date.now() / 1000),
        typeMessage: 'textMessage',
        textMessage: message,
        sendByApi: true,
        statusMessage: 'pending',
      };

      queryClient.setQueryData<GetChatHistoryResponse>(
        appKeys.chatHistory({ chatId }).queryKey,
        (messages = []) =>
          messages.some((item) => item.idMessage === idMessage)
            ? messages
            : [sentMessage, ...messages],
      );
    },
  });
}
