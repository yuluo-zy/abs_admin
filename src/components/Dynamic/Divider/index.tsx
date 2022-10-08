import React from "react";
import { Divider } from "@arco-design/web-react";

export default function DynamicDivider(props) {

  return <Divider style={{ borderBottomStyle: "dashed" }} {...props} />;
}
