import { httpDelete, httpGet, httpPost, httpPut } from "@/utils/httpRequest";

export const userInfo = () => {
  return httpGet("/user/info");
};

export const userMenu = () => {
  return httpGet("/user/nav");
};

export const getUserList = (data) => {
  return httpGet("/user", data);
};

export const addUser = (data) => {
  if (data?.roleIds && data?.roleIds.length > 0) {
    data.roleIds = data.roleIds?.toString();
  }
  if (data?.groupId && data?.groupId.length > 0) {
    data.groupId = data.groupId[data?.groupId.length - 1];
  }
  return httpPost("/user", data);
};

export const putUser = (data) => {
  if (data?.roleIds && data?.roleIds.length > 0) {
    data.roleIds = data.roleIds?.toString();
  }
  if (data?.groupId && data?.groupId.length > 0) {
    data.groupId = data.groupId[data?.groupId.length - 1];
  }
  return httpPut("/user", data);
};

export const removeUser = (data) => {
  return httpDelete("/user", data);
};

export const putUserPassword = (id: number, data) => {
  return httpPost("/user/" + id + "/change/password", data);
};

export const putUserLock = (id: number, data) => {
  return httpPut("/user/" + id + "/lock", data);
};


// 请求用户可以创建的 组织类型 类型

