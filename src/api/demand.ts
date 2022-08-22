import { httpGet, httpPost } from "@/utils/httpRequest";

export const getProductionDemand = (data) => {
  return httpGet("/demand", data);
};

export const postProductionDemand = () => {
  return httpPost("/demand");
};

export const postProduction = (data) => {
  return httpPost("/demand/production/save", data);
};


export const getProductionCustomDemand = () => {
  return httpGet("/demand/custom/serve");
};

export const postProductionCustomDemand = (data) => {
  return httpPost("/demand/custom/serve/save", data);
};

export const postFirmwareCustomDemand = (data) => {
  return httpPost("/demand/custom/firmware/save", data);
};

export const postMacCustomDemand = (data) => {
  return httpPost("/demand/custom/mac/save", data);
};

export const postLabelCustomDemand = (data) => {
  return httpPost("/demand/custom/label/save", data);
};


export const postBurnCustomDemand = (data) => {
  return httpPost("/demand/custom/content/save", data);
};
export const postAdaptCustomDemand = (data) => {
  return httpPost("/demand/custom/adapt/save", data);
};

export const postCheckCustomDemand = (data) => {
  return httpPost("/demand/custom/check", data);
};

export const getDemandDetails = (demandId) => {
  return httpGet("/demand/custom/" + demandId);
};
export const getMpnList = () => {
  return httpGet("/demand/MPN");
};

// 添加对应的需求相关人员
export const postDemandRelPerson = (data) => {
  return httpPost("/demand/relPerson", data);
};
