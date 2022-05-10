import React, { useEffect } from "react";
import { useUpdateEffect } from "react-use";

export default function DynamicMark(props) {
  const {value, verify} = props
  useUpdateEffect(()=> {}, [props.value])
  useUpdateEffect(()=> {}, [props.verify])
  return <div></div>;
}
