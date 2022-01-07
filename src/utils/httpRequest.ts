import Axios from '@/utils/axios';
import { AxiosResponse } from 'axios';

interface data {
  code: number;
  message: string;
  result: never;
  success: boolean;
}

export const httpGet = (url: string, data?): Promise<AxiosResponse<data>> => {
  return Axios({
    url: url,
    method: 'get',
    data
  });
};
export const httpPost = (url, data?): Promise<AxiosResponse<data>> => {
  return Axios({
    url: url,
    method: 'post',
    data
  });
};

export const httpDelete = (url, data): Promise<AxiosResponse<data>> => {
  return Axios({
    url: url,
    method: 'delete',
    data
  });
};
