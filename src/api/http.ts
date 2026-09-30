import type { LoginParams } from '@/shared/types/auth';
import axios, { type AxiosInstance } from 'axios';

const CREDENTIALS_KEY = 'green-api-credentials';
const authLossListeners = new Set<() => void>();

export function subscribeToAuthLoss(listener: () => void) {
  authLossListeners.add(listener);
  return () => authLossListeners.delete(listener);
}

function clearInstanceCredentials() {
  if (!getInstanceCredentials()) {
    return false;
  }

  sessionStorage.removeItem(CREDENTIALS_KEY);
  authLossListeners.forEach((listener) => listener());
  return true;
}

function isInstanceNotAuthorized(data: unknown): boolean {
  if (typeof data === 'string') {
    return data
      .toLowerCase()
      .includes('instance is starting or not authorized');
  }

  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return ['message', 'reason', 'description', 'error'].some((key) => {
    const value = Reflect.get(data, key);
    return (
      typeof value === 'string' &&
      value.toLowerCase().includes('instance is starting or not authorized')
    );
  });
}

export function saveInstanceCredentials(credentials: LoginParams) {
  sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
}

export function getInstanceCredentials(): LoginParams | null {
  const stored = sessionStorage.getItem(CREDENTIALS_KEY);

  if (!stored) return null;

  try {
    const credentials: unknown = JSON.parse(stored);

    if (
      typeof credentials === 'object' &&
      credentials !== null &&
      'idInstance' in credentials &&
      typeof credentials.idInstance === 'string' &&
      'apiTokenInstance' in credentials &&
      typeof credentials.apiTokenInstance === 'string'
    ) {
      return {
        idInstance: credentials.idInstance,
        apiTokenInstance: credentials.apiTokenInstance,
      };
    }
  } catch {
    /* empty */
  }

  sessionStorage.removeItem(CREDENTIALS_KEY);
  return null;
}

export function instanceRequestPath(method: string) {
  const credentials = getInstanceCredentials();

  if (!credentials) {
    throw new Error('Сначала войдите в инстанс GREEN-API');
  }

  return `/waInstance${encodeURIComponent(credentials.idInstance)}/${encodeURIComponent(method)}/${encodeURIComponent(credentials.apiTokenInstance)}`;
}

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes('/getStateInstance/')) {
      return response;
    }

    if (
      typeof response.data === 'object' &&
      response.data !== null &&
      'stateInstance' in response.data &&
      response.data.stateInstance === 'notAuthorized' &&
      clearInstanceCredentials()
    ) {
      return Promise.reject(new Error('Инстанс GREEN-API не авторизован'));
    }

    if (isInstanceNotAuthorized(response.data) && clearInstanceCredentials()) {
      return Promise.reject(new Error('Инстанс GREEN-API не авторизован'));
    }

    return response;
  },
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      !error.config?.url?.includes('/getStateInstance/')
    ) {
      const { status, data } = error.response ?? {};

      if (status === 401 || (status === 400 && isInstanceNotAuthorized(data))) {
        clearInstanceCredentials();
      }
    }

    return Promise.reject(error);
  },
);

export default http;
