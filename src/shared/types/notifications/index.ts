export type NotificationEnvelope = {
  receiptId: number;
  body: unknown;
};

export type DeleteNotificationResponse = {
  result: boolean;
  reason?: string;
};
