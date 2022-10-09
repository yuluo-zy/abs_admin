import { httpPost } from "@/utils/httpRequest";

export const loginWithUserName = (data) => {
  return httpPost("/admin/sys_login", data);
};

export const loginOut = () => {
  return httpPost("/auth/logout");
};
