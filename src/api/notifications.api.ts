import type {
  DeleteNotificationResponse,
  NotificationEnvelope,
} from '@/shared/types/notifications';
import http, { instanceRequestPath } from './http';

export const RECEIVE_TIMEOUT_SECONDS = 5;

export async function receiveNotification(signal: AbortSignal) {
  const { data } = await http.get<unknown>(
    instanceRequestPath('receiveNotification'),
    {
      params: { receiveTimeout: RECEIVE_TIMEOUT_SECONDS },
      timeout: 10_000,
      signal,
    },
  );

  if (data === null || data === '') return null;

  if (
    typeof data !== 'object' ||
    !data ||
    !('receiptId' in data) ||
    typeof data.receiptId !== 'number' ||
    !('body' in data)
  ) {
    throw new Error('GREEN-API returned an invalid notification');
  }

  return data as NotificationEnvelope;
}

export async function deleteNotification(
  receiptId: number,
  signal: AbortSignal,
) {
  const { data } = await http.delete<DeleteNotificationResponse>(
    `${instanceRequestPath('deleteNotification')}/${receiptId}`,
    { signal },
  );

  if (!data.result) {
    throw new Error(data.reason || 'GREEN-API could not delete notification');
  }
}
