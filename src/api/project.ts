import { httpGet } from "@/utils/httpRequest";

// 获取项目列表
export const getProjectList = () => {
  return httpGet("/project");
};
