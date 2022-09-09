import { httpDelete, httpGet, httpPost, httpPut } from "@/utils/httpRequest";
import { encodeSearchParams } from "@/utils/getUrlParams";

export const getUserInfo = () => {
  return httpGet("/user/info");
};

export const getUserMenu = () => {
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
  return httpPut("/user/" + id + "/change/password", data);
};

export const putUserLock = (id: number, data) => {
  return httpPut("/user/" + id + "/lock", data);
};


// 查询客户列表
export const getCustomer = (data) => {
  return httpGet("/user/customer?" + encodeSearchParams(data));
};

// 删除关联客户
export const deleteCustomRelations = (data) => {
  return httpPost("/user/businessCustomer/delete", data);
};

// 查询商务人员列表
export const getBusiness = () => {
  return httpGet("/user/business");
};

// 授权 将一个客户授权给某个bs
export const impartBusiness = (data) => {
  return httpPost("/user/businessCustomer/impart", data);
};
// 转移 将一个客户转移给某个bs
export const transformBusiness = (data) => {
  return httpPost("/user/businessCustomer/transform", data);
};
