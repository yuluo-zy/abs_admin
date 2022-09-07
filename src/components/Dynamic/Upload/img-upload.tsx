import React from "react";
import { Modal } from "@arco-design/web-react";
import DynamicUpload from "@/components/Dynamic/Upload/index";

const FileType = [
  "image/png",
  "image/jpeg",
];

export function DynamicImgUpload(props: { limit, onChange, title?, fileList?, customRequest? }) {
  const { limit, onChange, title, fileList, customRequest } = props;


  return <DynamicUpload
    limit={limit}
    fileList={fileList}
    fileType={FileType}
    customRequest={customRequest}
    listType="picture-card"
    onPreview={file => {
      Modal.success({
        title: title || "Picture Preview",
        content: <div style={{ textAlign: "center" }}>
          <img style={{ maxWidth: "100%" }} src={file.url || URL.createObjectURL(file.originFile)}
               alt={"Picture Preview"} />
        </div>
      });
    }}
    onChange={onChange} />;
}
