import { getChats } from '@/api/app.api';
import type { GetChatsParams } from '@/shared/types/chats';
import { useQuery } from '@tanstack/react-query';
import { appKeys } from '../keys';

export function useChatsQuery(params?: GetChatsParams) {
  return useQuery({
    queryKey: appKeys.chats(params).queryKey,
    queryFn: () => getChats(params),
    retry: false,
  });
}
