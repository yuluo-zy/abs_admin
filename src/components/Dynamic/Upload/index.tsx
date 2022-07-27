import React, { useEffect, useState } from "react";
import { Button, Message, Trigger, Upload } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import { getFile, getFileInfo, postFile } from "@/api/file";
import axios from "axios";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { IconDownload } from "@arco-design/web-react/icon";

function DownLoad({ src }) {
  const downFile = (event) => {
    event.stopPropagation();
    if (src) {
      console.log(src);
      getFile(src[0]?.response || src[0]?.uid).then(res => {
        if (res.status === 200) {
          const url = URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          let name = res.headers["content-disposition"]?.match(/fileName=(.*)/)[1]; // 获取filename的值
          name = decodeURIComponent(name);
          link.setAttribute("download", name);
          document.body.appendChild(link);
          link.click();
            document.body.removeChild(link);
          }
        }
      );
    }
  };
  // todo 下载菜单
  return <Button type="primary" icon={<IconDownload />} onClick={downFile}>
    Download
  </Button>;
}

function DynamicUpload(props) {
  const t = useLocale(locale);
  const { limit, onChange, listType, onPreview, fileList, title } = props;
  const [defaultList, setDefaultList] = useState(fileList);

  const initDate = (value) => {
    if (listType === "picture-card") {
      if (value !== undefined) {
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
            name: data?.fileName
            // path: data?.downloadUrl
          }]);
        }
      });
    }
  };

  useEffect(() => {
    initDate(fileList);
  }, []);


  return <div style={{ marginTop: title ? "1rem" : "" }}>
    <Trigger
      popup={() => {
        if (defaultList && defaultList.length > 0) {
          return <DownLoad src={defaultList} />;
        }
        return <div></div>;
      }}
      autoFitPosition
      clickToClose
      autoFixPosition
      blurToHide
      unmountOnExit
      mouseLeaveToClose
      alignPoint
      position="bl"
      popupAlign={{
        bottom: 8,
        left: 8
      }}
      trigger={"contextMenu"}
    >
      <Upload
        autoUpload
        multiple
        name="files"
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
          formData.append("file", file);
          const source = axios.CancelToken.source();
          const onprogress = progressEvent => {
            const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
            onProgress(parseInt(String(complete), 10), progressEvent);
          };
          postFile(formData, onprogress, source.token).then(r => {
            const { success, result } = r.data;
            if (success) {
              Message.success(t["message.ok"]);
              onSuccess(result);
            }
          }).catch(error => {
            Message.error(t["message.error"]);
            onError(t["message.error"]);
          });
          return {
            abort() {
              source.cancel("cancel");
            }
          };
        }}
        limit={limit}
      />
      {title && <p style={{ position: "absolute", top: "-1.8rem" }}>{title}</p>}
    </Trigger>
  </div>;
}

export default DynamicUpload;
