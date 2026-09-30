/** Ответ WhatsApp GREEN-API: GET getChats. */
export type Chat = {
  id: string;
  name: string;
  type: 'user' | 'group';
  archive: boolean;
  unreadCount: number;
  ephemeralExpiration: number;
  ephemeralSettingTimestamp: number;
  newChatId?: string;
};

/** Необязательный query-параметр count ограничивает число последних чатов. */
export type GetChatsParams = {
  count?: number;
};

export type GetChatsResponse = Chat[];
