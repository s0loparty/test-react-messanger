import { checkWhatsapp } from '@/api/app.api';
import type { CheckWhatsappParams } from '@/shared/types/chats';
import { useQuery } from '@tanstack/react-query';
import { appKeys } from '../keys';

export function useCheckWhatsappQuery(params: CheckWhatsappParams) {
  return useQuery({
    queryKey: appKeys.checkWhatsapp(params).queryKey,
    queryFn: ({ signal }) => checkWhatsapp(params, signal),
    enabled: Boolean(params.chatId.trim()),
  });
}
