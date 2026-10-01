import type { GetWaSettingsResponse } from '@/shared/types/account';
import type {
  CheckWhatsappParams,
  CheckWhatsappResponse,
  GetChatsParams,
  GetChatsResponse,
} from '@/shared/types/chats';
import type {
  GetChatHistoryParams,
  GetChatHistoryResponse,
  SendMessageParams,
  SendMessageResponse,
} from '@/shared/types/messages';
import http, { instanceRequestPath } from './http';

export async function getAccountInfo() {
  const { data } = await http.get<GetWaSettingsResponse>(
    instanceRequestPath('getWaSettings'),
  );

  return data;
}

export async function getChats(params?: GetChatsParams) {
  const { data } = await http.get<GetChatsResponse>(
    instanceRequestPath('getChats'),
    { params },
  );

  return data;
}

export async function checkWhatsapp(
  params: CheckWhatsappParams,
  signal?: AbortSignal,
) {
  const chatId = params.chatId.trim();
  const { data } = await http.post<CheckWhatsappResponse>(
    instanceRequestPath('checkWhatsapp'),
    {
      ...params,
      chatId: /^\d{11,16}$/.test(chatId) ? `${chatId}@c.us` : chatId,
    },
    { signal },
  );

  return data;
}

export async function getChatHistory(params: GetChatHistoryParams) {
  const { data } = await http.post<GetChatHistoryResponse>(
    instanceRequestPath('getChatHistory'),
    params,
  );

  return data;
}

export async function sendMessage(params: SendMessageParams) {
  const { data } = await http.post<SendMessageResponse>(
    instanceRequestPath('sendMessage'),
    params,
  );

  return data;
}
