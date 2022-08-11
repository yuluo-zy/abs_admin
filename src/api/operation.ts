import { httpPost } from "@/utils/httpRequest";

/**
 * 针对需求订单进行相关设定
 */

// 商务进行需求接收
export const bsReceive = (data) => {
  return httpPost("/demand/operation/bs/receive", data);
};
