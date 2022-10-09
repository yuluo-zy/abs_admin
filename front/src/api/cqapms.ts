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
  return httpGet("/afterSale/comment", data);
};

// 登录之后 添加售后工单信息
export const addAfterSaleComment = (data) => {
  return httpPost("/afterSale/comment", data);
};

// 删除订单
export const deleteSaleComment = (data) => {
  return httpPost("/afterSale/delete", data);
};

// 获取本工单进行的标记内容
export const getTicketMark = (data) => {
  return httpGet("/afterSale/tag", data);
};

// 获取本工单进行的标记内容
export const addTicketMark = (data) => {
  return httpPost("/afterSale/tag", data);
};

// 添加工单指派记录
export const addTickOwner = (data) => {
  return httpPost("/afterSale/owner", data);
};

// 获取工单指派记录
export const getTickOwner = (data) => {
  return httpGet("/afterSale/owner", data);
};

// 获取样品信息内容
export const getTickSample = (data) => {
  return httpGet("/afterSale/sample", data);
};
// 提交样品信息内容
export const addTickSample = (data) => {
  return httpPost("/afterSale/sample", data);
};


