import React, { useState } from "react";
import { Message, Upload } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from './locale';
import { postFile } from "@/api/file";
import axios from "axios";

function DynamicUpload(props: {limit, onChange, listType?, onPreview?}) {
  const t = useLocale(locale)
  const {limit,onChange, listType, onPreview } = props

  return (
    <Upload
      autoUpload
      multiple
      name='files'
      listType={listType}
      onChange={onChange}
      onPreview={onPreview}
      customRequest={(option) => {
        const { onProgress, file,onSuccess, onError } = option
        let formData = new FormData();
        formData.append('file', file);
        const source = axios.CancelToken.source();
        const onprogress = progressEvent => {
          const complete = progressEvent.loaded / progressEvent.total * 100 | 0
          onProgress(parseInt(String(complete), 10), progressEvent);
        }
        postFile(formData,onprogress,source.token).then(r =>{
          const {success, result} = r.data
          if(success){
            Message.success(t["message.ok"])
            onSuccess(result)
          }
        } ).catch(error => {
          Message.error(t["message.error"])
          onError(t['message.error'])
        })
        return {
          abort () {
            source.cancel("cancel")
          }
        }
      }}
      limit={limit}
    />
  );
}

export default DynamicUpload;
