import {
  getInstanceCredentials,
  subscribeToCredentialsChange,
} from '@/api/http';
import {
  deleteNotification,
  RECEIVE_TIMEOUT_SECONDS,
  receiveNotification,
} from '@/api/notifications.api';
import type { Chat } from '@/shared/types/chats';
import type {
  ChatMessage,
  GetChatHistoryResponse,
} from '@/shared/types/messages';
import type { QueryClient } from '@tanstack/react-query';
import { appKeys } from './keys';

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function incomingTextMessage(body: unknown): ChatMessage | null {
  const event = asRecord(body);
  if (event?.typeWebhook !== 'incomingMessageReceived') return null;

  const sender = asRecord(event.senderData);
  const message = asRecord(event.messageData);
  const text = asRecord(message?.textMessageData);

  if (
    typeof event.idMessage !== 'string' ||
    typeof event.timestamp !== 'number' ||
    typeof sender?.chatId !== 'string' ||
    message?.typeMessage !== 'textMessage' ||
    typeof text?.textMessage !== 'string'
  ) {
    return null;
  }

  return {
    type: 'incoming',
    idMessage: event.idMessage,
    chatId: sender.chatId,
    timestamp: event.timestamp,
    typeMessage: 'textMessage',
    textMessage: text.textMessage,
    senderId: typeof sender.sender === 'string' ? sender.sender : undefined,
    senderName:
      typeof sender.senderName === 'string' ? sender.senderName : undefined,
    senderContactName:
      typeof sender.senderContactName === 'string'
        ? sender.senderContactName
        : undefined,
  };
}

function processNotification(queryClient: QueryClient, body: unknown) {
  const message = incomingTextMessage(body);
  if (!message) return;

  const historyKey = appKeys.chatHistory({ chatId: message.chatId }).queryKey;
  queryClient.setQueryData<GetChatHistoryResponse>(historyKey, (messages) => {
    if (
      !messages ||
      messages.some((item) => item.idMessage === message.idMessage)
    ) {
      return messages;
    }

    return [message, ...messages];
  });

  const chats = queryClient.getQueryData<Chat[]>(appKeys.chats().queryKey);
  if (chats && !chats.some((chat) => chat.id === message.chatId)) {
    void queryClient.invalidateQueries({ queryKey: appKeys.chats().queryKey });
  }
}

function waitForDelay(signal: AbortSignal, milliseconds: number) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();

    const timer = setTimeout(finish, milliseconds);
    signal.addEventListener('abort', finish, { once: true });

    function finish() {
      clearTimeout(timer);
      signal.removeEventListener('abort', finish);
      resolve();
    }
  });
}

async function pollNotifications(
  queryClient: QueryClient,
  signal: AbortSignal,
) {
  let failures = 0;

  while (!signal.aborted) {
    try {
      const startedAt = performance.now();
      const notification = await receiveNotification(signal);
      if (signal.aborted) break;
      if (!notification) {
        failures = 0;
        await waitForDelay(
          signal,
          Math.max(
            0,
            RECEIVE_TIMEOUT_SECONDS * 1000 - (performance.now() - startedAt),
          ),
        );
        continue;
      }

      processNotification(queryClient, notification.body);
      if (signal.aborted) break;
      await deleteNotification(notification.receiptId, signal);
      failures = 0;
    } catch (error) {
      if (signal.aborted) break;
      console.error(
        'GREEN-API notification polling failed:',
        error instanceof Error ? error.message : error,
      );
      failures += 1;
      await waitForDelay(signal, Math.min(1000 * 2 ** (failures - 1), 30_000));
    }
  }
}

export function startNotificationPolling(queryClient: QueryClient) {
  let controller: AbortController | null = null;

  const syncWithCredentials = () => {
    controller?.abort();
    controller = null;

    if (getInstanceCredentials()) {
      controller = new AbortController();
      pollNotifications(queryClient, controller.signal);
    }
  };

  const unsubscribe = subscribeToCredentialsChange(syncWithCredentials);
  syncWithCredentials();

  return () => {
    unsubscribe();
    controller?.abort();
  };
}
