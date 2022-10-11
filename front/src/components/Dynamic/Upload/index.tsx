import React, { useEffect, useState } from "react";
import { Button, Message, Trigger, Upload } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import axios from "axios";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { IconDownload } from "@arco-design/web-react/icon";
import {download, getFileInfo, postFile} from "@/api/file";
import {code_success} from "@/utils/httpRequest";

function DownLoad({ src, customDownload }) {
  const downFile = (event) => {
    event.stopPropagation();
    if (src) {
      customDownload({id: src[0]?.response || src[0]?.uid}).then(res => {
        if (res.status === 200) {
          const url = URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          console.log( res.headers)
          let name = res.headers["content-disposition"]?.match(/filename="(.*)"/)[1]; // 获取filename的值
          name = decodeURIComponent(name);
          console.log(name)
          link.setAttribute("download", name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        }
      );
    }
  };
  return <Button type="primary" icon={<IconDownload />} onClick={downFile}>
    Download
  </Button>;
}

const FileType = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "text/plain",
  "application/json",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-7z-compressed",
  "application/octet-stream"
];

const FileSize = 1024 * 1024 * 20; // 20M 默认值

function DynamicUpload(props) {
  const t = useLocale(locale);

  const {
    limit,
    onChange,
    listType,
    onPreview,
    fileList,
    title,
    customRequest,
    customBeforeUpload,
    fileType,
    customDownload,
    customInitImg,
    customInitFile,
    initDateFc
  } = props;
  const [defaultList, setDefaultList] = useState([]);
  const file_type = fileType || FileType;
  const initDate = initDateFc || ((value, setList) => {
    if (value)  {
      getFileInfo({id: value}).then(res => {
          if (res.data.code === code_success) {
            const data = res.data.data;
            setList([{
              uid: data?.id,
              name: data?.old_name
            }]);
          }
        });
    }
  });

  useEffect(() => {
    initDate(fileList, setDefaultList);
  }, []);

  const uploadData = (option) => {
    const { onProgress, file, onSuccess, onError } = option;
    const formData = new FormData();
    formData.append("file", file);
    const source = axios.CancelToken.source();
    const onprogress = progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
      onProgress(parseInt(String(complete), 10), progressEvent);
    };
    postFile(formData, onprogress, source.token).then(r => {
      const { code, data } = r.data;
      if (code === code_success) {
        Message.success("文件上传成功");
        onSuccess(data);
      }
    }).catch(() => {
      Message.error("文件上传失败");
      onError("message.error");
    });
    return {
      abort() {
        source.cancel("cancel");
      }
    };
  };

  const beforeUpload = (file) => {
    if (file?.size && file?.size > FileSize) {
      Message.error(t["message.size.error"]);
      return false;
    }
    if (file?.type && !file_type.includes(file?.type)) {
      Message.error(t["message.type.error"]);
      return false;
    }
    return true;
  };


  return <div style={{ marginTop: title ? "1rem" : "" }}>
    <Trigger
      popup={() => {
        if (defaultList && defaultList.length > 0 && limit === 1) {
          return <DownLoad src={defaultList} customDownload={download} />;
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
        beforeUpload={customBeforeUpload || beforeUpload}
        customRequest={customRequest || uploadData}
        limit={limit}
      />
      {title && <p style={{ position: "absolute", top: "-1.8rem" }}>{title}</p>}
    </Trigger>
  </div>
}

export default DynamicUpload;
