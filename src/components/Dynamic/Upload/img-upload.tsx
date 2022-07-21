import React from "react";
import { Modal } from "@arco-design/web-react";
import DynamicUpload from "@/components/Dynamic/Upload/index";

export function DynamicImgUpload(props: {limit, onChange, title?, fileList?}) {
  const {limit, onChange, title, fileList} = props

  return  <DynamicUpload
    limit={limit}
    fileList = {fileList}
    listType='picture-card'
    onPreview={file => {
      Modal.success({
        title: title || 'Picture Preview',
        content: <div style={{ textAlign: 'center' }}>
          <img style={{ maxWidth: '100%' }} src={file.url || URL.createObjectURL(file.originFile)} alt={'Picture Preview'}/>
        </div>
      });
    }}
    onChange={onChange}/>
}
