import type { LoginParams } from '@/shared/types/auth';
import http from './http';

export async function login(params: LoginParams) {
  const { data } = await http.get<{ stateInstance: string }>(
    `/waInstance${params.idInstance}/getStateInstance/${params.apiTokenInstance}`,
  );

  return data.stateInstance;
}
