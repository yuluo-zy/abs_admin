import React, { useEffect, useState } from "react";
import { Button, Message, Trigger, Upload } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import axios from "axios";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { IconDownload } from "@arco-design/web-react/icon";

function DownLoad({ src, customDownload }) {
  const downFile = (event) => {
    event.stopPropagation();
    if (src) {
      customDownload(src[0]?.response || src[0]?.uid).then(res => {
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
    if (listType === "picture-card") {
      if (value) {
        const initImg = customInitImg;
        if (limit > 1) {
          // const index = value.split(",")
          for (const i of value) {
            initImg(i?.id).then(res => {
              if (res.status === 200) {
                setList(value => {
                  return [
                    {
                      uid: i?.id,
                        originFile: res.data
                      }, ...value
                    ];
                  });
                }
              }
            );
          }
        } else {
          initImg(value).then(res => {
              if (res.status === 200) {
                setList([{
                  uid: value,
                  originFile: res.data
                }]);
              }
            }
          );
        }

        return;
      }
    }
    if (value) {
      const initFile = customInitFile;
      if (limit > 1) {
        // const index = value.split(",")
        for (const i of value) {
          initFile(i).then(res => {
            if (res.data.success) {
              const data = res.data.result;
              setList(value => {
                return [
                  {
                      uid: data?.id,
                      name: data?.fileName
                    }, ...value
                  ];
                });
              }
            }
          );
        }
      } else {
        initFile(value).then(res => {
          if (res.data.success) {
            const data = res.data.result;
            setList([{
              uid: data?.id,
              name: data?.fileName
            }]);
          }
        });
      }
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
    // postFile(formData, onprogress, source.token).then(r => {
    //   const { success, result } = r.data;
    //   if (success) {
    //     Message.success(t["message.ok"]);
    //     onSuccess(result);
    //   }
    // }).catch(() => {
    //   Message.error(t["message.error"]);
    //   onError(t["message.error"]);
    // });
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
          return <DownLoad src={defaultList} customDownload={customDownload} />;
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
