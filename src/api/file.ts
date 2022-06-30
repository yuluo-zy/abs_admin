import { httpGet } from '@/utils/httpRequest';
import { getAxios } from '@/utils/axios';

export const postFile = (data, onUploadProgress, source) => {
  return getAxios().post(
    '/file/upload',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      },
      onUploadProgress: onUploadProgress,
      cancelToken: source
    }
  );
};

export const getFile = (id) => {
  return getAxios().get(
    '/file/download/' + id,
    { responseType: 'blob' });
};

export const getFileInfo = (id) => {
  return httpGet(`/file/${id}`);
};
