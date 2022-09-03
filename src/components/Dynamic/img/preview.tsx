import React, { useEffect, useState } from "react";
import { Image } from "@arco-design/web-react";
import { getSalesInfo } from "@/api/file";

export default function DynamicPreviewImg(props) {
  // 根据默认的语言设置 对应的图片展示

  const {
    data,
    ...self_props
  } = props;
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (data?.id) {
      getSalesInfo(data?.id).then(res => {
        if (res.status === 200) {
          setImg(URL.createObjectURL(new Blob([res.data])));
        }
      });
    }
  }, [data]);

  return <Image src={img} {...self_props} />;
}
