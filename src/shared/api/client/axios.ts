import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isDev } from '@/shared/utils/misc';
import { getClientAuthCookies, removeClientAuthCookies, setClientAuthCookies } from '@/shared/utils/cookie-client-actions';
import { AuthResponse } from '@/features/auth/models/auth';
import { AUTH_ENDPOINTS } from '@/features/auth/constants/auth';
import { isServer } from '@tanstack/react-query';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

let startTime = 0;
let endTime = 0;

// Типы для токенов
type TokenType = string | undefined | null;

// Очередь запросов, ожидающих обновления токена
let refreshSubscribers: ((token: string) => void)[] = [];
let isRefreshing = false;

// Функция для добавления запроса в очередь
function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// Функция для выполнения всех запросов из очереди с новым токеном
function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// Расширяем конфиг Axios для добавления кастомного поля _retry
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Request interceptor - добавляем access token к каждому запросу
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // логирование запросов
    if (isDev || isServer) {
      startTime = new Date().getTime();
    }

    if (!isServer) {
      const accessToken: TokenType = getClientAuthCookies().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response interceptor - обрабатываем ошибку 401
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // логирование запросов
    if (isDev || isServer) {
      endTime = new Date().getTime();
      console.log(`((( API )))  === ${response.config.url} ===> Ожидание ответа: ${(endTime || 0) - (startTime || 0)}ms`);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Если ошибка 401 и это не запрос на обновление токена
    if (!isServer && error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Если токен уже обновляется, добавляем запрос в очередь
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`
            };
            resolve(axiosClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getClientAuthCookies().refreshToken;
        if (!refreshToken) return Promise.reject(error);

        const { data } = await axios.post<AuthResponse>(AUTH_ENDPOINTS.refresh, { refreshToken });

        setClientAuthCookies(data);

        // Обновляем заголовок оригинального запроса
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.accessToken}`
        };

        // Выполняем все запросы из очереди с новым токеном
        onRefreshed(data.accessToken);

        // Возвращаем оригинальный запрос с новым токеном
        return axiosClient(originalRequest);
      } catch (refreshError) {
        logoutUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// Функция для выхода пользователя
const logoutUser = () => {
  removeClientAuthCookies();
  // Дополнительные действия при выходе (например, редирект на страницу входа)
  // window.location.href = '/login';
};

export default axiosClient;
