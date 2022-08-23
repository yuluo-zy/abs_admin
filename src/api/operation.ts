import { httpGet, httpPost } from "@/utils/httpRequest";

/**
 * 针对需求订单进行相关设定
 */

// 商务进行需求接收
export const bsReceive = (data) => {
  return httpPost("/demand/operation/bs/receive", {
    demandId: data
  });
};
// 商务进行需求驳回
export const bsReject = (data) => {
  return httpPost("/demand/operation/bs/reject", {
    demandId: data
  });
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
export const demandAddable = (data) => {
  return httpGet(`/demand/addable`, data);
};

// 查询项目相关人员列表
export const demandRelatable = (data) => {
  return httpGet(`/demand/relatable`, data);
};

// 工程师 发起需求
export const customEngineerCommit = (data) => {
  return httpPost(`/demand/operation/engineer/commit`, data);
};
// 工程师 取消需求
export const customEngineerCancel = (data) => {
  return httpPost(`/demand/operation/engineer/cancel/${data}`, data);
};
// 工程师 复制需求
export const customEngineerCopy = (data) => {
  return httpPost(`/demand/operation/engineer/copy/${data}`, data);
};
// 工程师 派发需求
export const customEngineerDistribute = (data) => {
  return httpPost(`/demand/operation/engineer/distribute`, data);
};
// 工程师 接收验证需求
export const customEngineerReceive = (data) => {
  return httpPost(`/demand/operation/engineer/receive`, data);
};
// 工程师 驳回需求
export const customEngineerReject = (data) => {
  return httpPost(`/demand/operation/engineer/reject`, data);
};
// 工程师 撤回需求
export const customEngineer = (demandId) => {
  return httpPost(`/demand/operation/engineer/withdraw/${demandId}`);
};


// 工厂 完成验证测试
export const factoryComplete = (data) => {
  return httpPost("/demand/operation/factory/complete", {
    demandId: data
  });
};
// 工厂 驳回需求
export const factoryReject = (data) => {
  return httpPost("/demand/operation/factory/reject", {
    demandId: data
  });
};

// 查询可以指派的人员信息
export const demandAssignable = (data) => {
  return httpGet("/demand/assignable", data);
};


