import React, { useState } from "react";
import { Button, Message, Upload } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from './locale';
import { postFile } from "@/api/file";
import axios from "axios";
import styles from './style/index.module.less';

function DynamicUpload(props) {
  const [fileList, setFileList] = useState([])
  const t = useLocale(locale)
  const {limit} = props

  return (
    <div className={styles['custom-upload-progress']}>
    <Upload
      autoUpload
      fileList={fileList}
      onChange={setFileList}
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
          const {success} = r.data
          if(success){
            Message.success(t["message.ok"])
            onSuccess(t["message.ok"])
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
    </div>
  );
}

export default DynamicUpload;
