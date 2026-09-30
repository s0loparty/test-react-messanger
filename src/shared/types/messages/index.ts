/** Сообщение из ответа WhatsApp GREEN-API: POST getChatHistory. */
export type ChatMessageType =
  | 'textMessage'
  | 'extendedTextMessage'
  | 'quotedMessage'
  | 'imageMessage'
  | 'videoMessage'
  | 'documentMessage'
  | 'audioMessage'
  | 'stickerMessage'
  | 'reactionMessage'
  | 'locationMessage'
  | 'contactMessage'
  | 'contactsArrayMessage'
  | 'pollMessage'
  | 'pollUpdateMessage'
  | 'groupInviteMessage';

export type OutgoingMessageStatus =
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'
  | 'suspended'
  | 'yellowCard';

type ChatMessageBase = {
  idMessage: string;
  chatId: string;
  /** UNIX-время в секундах. */
  timestamp: number;
  typeMessage: ChatMessageType;
  /** Поле есть у текстовых сообщений; для медиа может быть caption. */
  textMessage?: string;
  caption?: string;
  downloadUrl?: string;
  isForwarded?: boolean;
  forwardingScore?: number;
  isEdited?: boolean;
  isDeleted?: boolean;
};

export type ChatMessage = ChatMessageBase &
  (
    | {
        type: 'incoming';
        senderId?: string;
        senderName?: string;
        senderContactName?: string;
      }
    | {
        type: 'outgoing';
        statusMessage?: OutgoingMessageStatus;
        sendByApi?: boolean;
        description?: string;
      }
  );

export type GetChatHistoryParams = {
  chatId: string;
  /** По умолчанию API возвращает 100 сообщений. */
  count?: number;
};

/** Сообщения отсортированы API от новых к старым. */
export type GetChatHistoryResponse = ChatMessage[];

/** Тело запроса WhatsApp GREEN-API: POST sendMessage. */
export type SendMessageParams = {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  linkPreview?: boolean;
  typePreview?: 'large' | 'small';
  typingTime?: number;
};

export type SendMessageResponse = {
  idMessage: string;
};
