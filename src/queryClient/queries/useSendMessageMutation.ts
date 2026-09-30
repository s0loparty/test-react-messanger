import { sendMessage } from '@/api/app.api';
import type { SendMessageParams } from '@/shared/types/messages';
import { useMutation } from '@tanstack/react-query';
import { appKeys } from '../keys';

export function useSendMessageMutation(params: SendMessageParams) {
  return useMutation({
    mutationKey: appKeys.sendMessage(params).queryKey,
    mutationFn: async () => {
      const res = await sendMessage(params);
      return res;
    },

    // можно обрабатывать разные статусы, но для тестового и так пойдет
  });
}
