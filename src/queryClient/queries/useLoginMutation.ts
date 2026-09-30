import { login } from '@/api/auth.api';
import { saveInstanceCredentials } from '@/api/http';
import type { LoginParams } from '@/shared/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { authKeys } from '../keys';

export function useLoginMutation() {
  const navigate = useNavigate({ from: '/auth/login' });

  return useMutation({
    mutationKey: authKeys.login().queryKey,

    mutationFn: async (credential: LoginParams) => {
      const result = await login(credential);

      if (result !== 'authorized') {
        throw new Error(`Инстанс не готов к работе: ${result}`);
      }

      return result;
    },

    onSuccess(_data, credentials) {
      saveInstanceCredentials(credentials);
      navigate({ to: '/' });
    },
  });
}
