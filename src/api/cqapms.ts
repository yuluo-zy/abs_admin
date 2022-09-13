import { httpGet, httpPost } from "@/utils/httpRequest";

// 请求查询售后订单
export const getAfterSale = (data) => {

  return httpGet("/afterSale/" + data.trim());
};
// 保存售后工单
export const saveAfterSale = (data) => {
  return httpPost("/afterSale/save", data);
};
// 工单管理查询
export const getAfterSaleManage = (data) => {
  return httpGet("/afterSale", data);
};
// 接受工单
export const postAfterSaleReceive = (data) => {
  return httpPost("/afterSale/receive", data);
};
// 接受工单
export const postAfterSaleComplete = (data) => {
  return httpPost("/afterSale/complete", data);
};

// 查询内部追加记录
export const getOrderCommonHistory = (data) => {
  return httpPost("/", data);
};
