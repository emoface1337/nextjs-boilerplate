import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authUser, getUser, refreshUserToken } from '@/features/auth/api/auth';
import { AuthRequest, AuthResponse } from '@/features/auth/models/auth';

export const USER_QUERY_KEY = ['user'];

export const useAuthUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthRequest) => authUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    }
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: AuthResponse['refreshToken']) => refreshUserToken(refreshToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    }
  });
};
