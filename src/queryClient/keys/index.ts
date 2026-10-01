import type { GetChatsParams } from '@/shared/types/chats';
import type { GetChatHistoryParams } from '@/shared/types/messages';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const authKeys = createQueryKeys('auth', {
  login: () => ['login'],
});

export const appKeys = createQueryKeys('app', {
  chats: (params?: GetChatsParams) => ['chats', params],
  chatHistory: (params: GetChatHistoryParams) => ['chatHistory', params],
  sendMessage: () => ['sendMessage'],
});
