import { httpGet } from "@/utils/httpRequest";
import { encodeSearchParams } from "@/utils/getUrlParams";

export const getProductionInfo = () => {
  return httpGet('/production');
};

export const getProductionServe = (data) => {
  return httpGet('/production/custom/serve?' + encodeSearchParams(data))
}

