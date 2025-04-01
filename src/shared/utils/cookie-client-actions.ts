import Cookies from 'js-cookie';

export const getClientAuthCookies = () => {
  return {
    accessToken: Cookies.get('accessToken'),
    refreshToken: Cookies.get('refreshToken')
  };
};

export const setClientAuthCookies = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
};

export const removeClientAuthCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
