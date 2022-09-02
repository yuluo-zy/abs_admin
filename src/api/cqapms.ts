import { httpGet, httpPost } from "@/utils/httpRequest";

// 请求查询售后订单
export const getAfterSale = (data) => {

  return httpGet("/afterSale/" + data.trim());
};
// 保存售后工单
export const saveAfterSale = (data) => {
  return httpPost("/afterSale/save", data);
};
