import { httpGet, httpPost } from "@/utils/httpRequest";

export const getDemandComment = (data) => {
  return httpGet("/demand/comment", data);
};

export const postDemandComment = (data) => {
  return httpPost("/demand/comment/save", data);
};

