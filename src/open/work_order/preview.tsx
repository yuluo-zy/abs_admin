import React, { useEffect, useMemo, useState } from "react";
import { Image } from "@arco-design/web-react";
import { getSalesInfo } from "@/api/file";

export default function DynamicPreviewImg(props) {

  const {
    data,
    ...self_props
  } = props;
  const [img, setImg] = useState("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
  useEffect(() => {
    if (data?.id) {
      getSalesInfo(data).then(res => {
        if (res.status === 200) {
          setImg(URL.createObjectURL(new Blob([res.data])));
        }
      });
    }
  }, [data?.id]);

  return useMemo(() => {
    return <Image src={img} {...self_props} />;
  }, [img]);
}
