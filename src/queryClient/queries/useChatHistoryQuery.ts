import { getChatHistory } from '@/api/app.api';
import type { GetChatHistoryParams } from '@/shared/types/messages';
import { useQuery } from '@tanstack/react-query';
import { appKeys } from '../keys';

export function useChatHistoryQuery(params: GetChatHistoryParams) {
  return useQuery({
    queryKey: appKeys.chatHistory(params).queryKey,
    queryFn: () => getChatHistory(params),
  });
}
