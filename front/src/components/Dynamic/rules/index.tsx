import React from "react";
import { useUpdateEffect } from "react-use";

export default function DynamicRules(props) {
  const { value, verify } = props;

  useUpdateEffect(() => {
  }, [props.value]);
  useUpdateEffect(() => {
  }, [props.verify]);
  const node = React.cloneElement(props.children, {} /* 传递数据 */);
  return <div>{node}</div>;
}
