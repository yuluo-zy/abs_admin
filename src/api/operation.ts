import { httpGet, httpPost } from "@/utils/httpRequest";

/**
 * 针对需求订单进行相关设定
 */

// 商务进行需求接收
export const bsReceive = (data) => {
  return httpPost("/demand/operation/bs/receive", data);
};

// 客户取消
export const customWithdraw = (id) => {
  return httpPost(`/demand/operation/customer/withdraw/${id}`);
};

// 客户复制
export const customCopy = (id) => {
  return httpPost(`/demand/operation/customer/copy/${id}`);
};
// 客户正式发起
export const customCommit = (demandId) => {

  return httpPost(`/demand/operation/customer/commit`, {
    demandId
  });
};
// 客户撤回
export const customCancel = (id) => {
  return httpPost(`/demand/operation/customer/cancel/${id}`);
};

// 增加项目相关人员
export const demandAddable = () => {
  return httpGet(`/demand/addable`);
};

// 查询项目相关人员列表
export const demandRelatable = (data) => {
  return httpGet(`/demand/addable`, data);
};
