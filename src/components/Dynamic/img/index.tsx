import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";

export default function DynamicImg(props) {
  // 根据默认的语言设置 对应的图片展示

  const {lang} = useContext(GlobalContext);
  const [state, setState] = useState();
  
  useEffect(() => {
    if(lang === 'zh-CN'){
      setState(props.zh)
    }
    if(lang === 'en-US'){
      setState(props.en)
    }

  }, [lang])

  // @ts-ignore
  return  <img {...props} src={state}/>;
}
