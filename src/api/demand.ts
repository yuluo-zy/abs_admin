import { httpGet } from "@/utils/httpRequest";

export const getProductionDemand = () => {
  return httpGet('/demand');
};
