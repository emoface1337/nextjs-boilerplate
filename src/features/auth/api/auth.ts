import axiosClient from '@/shared/api/client/axios';
import { AUTH_ENDPOINTS } from '@/features/auth/constants/auth';
import { AuthRequest, AuthResponse, RefreshTokenResponse, UserResponse } from '@/features/auth/models/auth';

export const authUser = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axiosClient.post(
    AUTH_ENDPOINTS.login,
    JSON.stringify({
      ...data,
      expiresInMins: 10
    })
  );
  return response.data;
};

export const getUser = async (): Promise<UserResponse> => {
  const response = await axiosClient.get(AUTH_ENDPOINTS.user);

  // Имитируем задержку ответа (например, бекенд обрабатывал запрос 5 секунд)
  await new Promise((resolve) => setTimeout(resolve, 500000));

  return response.data;
};

export const refreshUserToken = async (refreshToken: AuthResponse['refreshToken']): Promise<RefreshTokenResponse> => {
  const response = await axiosClient.post(
    AUTH_ENDPOINTS.refresh,
    JSON.stringify({
      refreshToken,
      expiresInMins: 10
    })
  );
  return response.data;
};
