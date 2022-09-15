import React from "react";
import { Tooltip } from "@arco-design/web-react";

interface TooltipProps {
  position?: | "top" | "tl" | "tr" | "bottom" | "bl" | "br" | "left" | "lt" | "lb" | "right" | "rt" | "rb",
  color?: string,
  content: string
}

export const DynamicTooltip: React.FC<TooltipProps> = (props: React.PropsWithChildren<TooltipProps>) => {

  return <Tooltip position={"bottom"} color={"#165DFF"} {...props}>
    {props.children}
  </Tooltip>;
};
