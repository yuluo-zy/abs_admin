import { getSessionStorage } from '@/utils/storage';

export default function checkLogin() {
  return getSessionStorage().getItem('userStatus') === 'login';
}
