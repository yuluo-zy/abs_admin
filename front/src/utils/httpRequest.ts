import Axios from "@/utils/axios";
import { AxiosResponse } from "axios";

export interface Data {
  code: number;
  message: string;
  result: any;
  success: boolean;
}

export const httpGet = (url: string, data?): Promise<AxiosResponse<Data>> => {
  return Axios({
    url: url,
    method: "get",
    data
  });
};
export const httpPost = (url, data?): Promise<AxiosResponse<Data>> => {
  return Axios({
    url: url,
    method: "post",
    data
  });
};
export const httpDelete = (url, data?): Promise<AxiosResponse<Data>> => {
  return Axios({
    url: url,
    method: "delete",
    data
  });
};

export const httpPut = (url, data?): Promise<AxiosResponse<Data>> => {
  return Axios({
    url: url,
    method: "put",
    data
  });
};
