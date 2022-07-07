import React, { useEffect, useState } from "react";
import { Message, Upload } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import { getFile, getFileInfo, postFile } from "@/api/file";
import axios from "axios";
import { UploadItem } from "@arco-design/web-react/es/Upload";


function DynamicUpload(props) {
  const t = useLocale(locale);
  const { limit, onChange, listType, onPreview, fileList, title } = props;
  const [defaultList, setDefaultList] = useState(fileList);

  const initDate = (value) => {
    if (listType === 'picture-card') {
      if (value  !== undefined) {
        getFile(value).then(res => {
            if (res.status === 200) {
              setDefaultList([{
                uid: value,
                originFile: res.data
              }]);
            }
          }
        );
        return;
      }
    }
    if (value !== undefined) {
      getFileInfo(value).then(res => {
        if (res.data.success) {
          const data = res.data.result;
          setDefaultList([{
            uid: data?.id,
            name: data?.fileName,
            url: data?.downloadUrl
          }]);
          console.log(defaultList);
        }
      });
    }
  };

  useEffect(() => {
    initDate(fileList);
  }, []);


  return <div style={{marginTop: '1rem'}}>
    <Upload
      autoUpload
      multiple
      name='files'
      listType={listType}
      onChange={(fileList: UploadItem[], file: UploadItem) => {
        setDefaultList(fileList);
        onChange(fileList, file);
      }}
      onPreview={onPreview}
      fileList={defaultList}
      customRequest={(option) => {
        const { onProgress, file, onSuccess, onError } = option;
        let formData = new FormData();
        formData.append('file', file);
        const source = axios.CancelToken.source();
        const onprogress = progressEvent => {
          const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
          onProgress(parseInt(String(complete), 10), progressEvent);
        };
        postFile(formData, onprogress, source.token).then(r => {
          const { success, result } = r.data;
          if (success) {
            Message.success(t['message.ok']);
            onSuccess(result);
          }
        }).catch(error => {
          Message.error(t['message.error']);
          onError(t['message.error']);
        });
        return {
          abort() {
            source.cancel('cancel');
          }
        };
      }}
      limit={limit}
    />
    {title && <p style={{ position: "absolute", top: "-1.8rem" }}>{title}</p>}
  </div>;
}

export default DynamicUpload;
