import { httpGet } from "@/utils/httpRequest";
import { getAxios } from "@/utils/axios";

export const postFile = (data, onUploadProgress, source) => {
  return getAxios().post(
    "/file/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=UTF-8"
      },
      onUploadProgress: onUploadProgress,
      cancelToken: source
    }
  );
};

export const getFile = (id) => {
  return getAxios().get(
    "/file/download/" + id,
    { responseType: "blob" });
};
export const getFileByPath = (path) => {
  return getAxios().get(
    path,
    { responseType: "blob" });
};

export const getFileInfo = (id) => {
  return httpGet(`/file/${id}`);
};

export const postEfuseCheckFile = (data, onUploadProgress?, source?) => {
  return getAxios().post(
    "/file/efuseCheck/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=UTF-8"
      },
      onUploadProgress: onUploadProgress,
      cancelToken: source
    }
  );
};

export const postSerialCheckFile = (data, onUploadProgress?, source?) => {
  return getAxios().post(
    "/file/serialCheck/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=UTF-8"
      },
      onUploadProgress: onUploadProgress,
      cancelToken: source
    }
  );
};
// 售后文件内容上传
export const postSalesFile = (data, onUploadProgress?, source?) => {
  return getAxios().post(
    "/file/sales/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=UTF-8"
      },
      onUploadProgress: onUploadProgress,
      cancelToken: source
    }
  );
};
// 售后文件下载
export const getSalesInfo = (data) => {
  const { id } = data;
  return getAxios().get(
    "/file/sales/download/" + id,
    {
      responseType: "blob",
      params: data
    });
};
