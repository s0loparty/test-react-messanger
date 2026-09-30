/** Ответ WhatsApp GREEN-API: GET getWaSettings. */
export type AccountState =
  | 'notAuthorized'
  | 'authorized'
  | 'blocked'
  | 'starting'
  | 'yellowCard'
  | 'suspended';

export type CurrentUser = {
  stateInstance: AccountState;
  avatar?: string;
  base64Avatar?: string;
  chatId?: string;
  phone?: string;
  deviceId?: string;
  historySyncProgress?: number;
  logoutProcess?: boolean;
  suspendedUntil?: number;
};

export type GetWaSettingsResponse = CurrentUser;
