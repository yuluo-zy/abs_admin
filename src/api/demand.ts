import { httpGet, httpPost } from '@/utils/httpRequest';

export const getProductionDemand = () => {
  return httpGet('/demand');
};

export const postProductionDemand = () => {
  return httpPost('/demand');
};

export const postProduction = (data) => {
  return httpPost('/demand/production/save', data);
};


export const getProductionCustomDemand = () => {
  return httpGet('/demand/custom/serve');
};

export const postProductionCustomDemand = (data) => {
  return httpPost('/demand/custom/serve/save', data);
};

export const postFirmwareCustomDemand = (data) => {
  return httpPost('/demand/custom/firmware/save', data);
};

export const postMacCustomDemand = (data) => {
  return httpPost('/demand/custom/mac/save', data);
};

export const postLabelCustomDemand = (data) => {
  return httpPost('/demand/custom/label/save', data);
};


export const postBurnCustomDemand = (data) => {
  return httpPost('/demand/custom/content/save', data);
};
export const postAdaptCustomDemand = (data) => {
  return httpPost('/demand/custom/adapt/save', data);
};
