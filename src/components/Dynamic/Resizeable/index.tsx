import { Resizable } from "react-resizable";
import React, { forwardRef } from "react";
import cs from "classnames";
import styles from "./style/index.module.less";
import { Props, Ref } from "@/components/type";

const CustomResizeHandle = forwardRef<Ref,Props>((props, ref) => {
  // @ts-ignore
  const { handleAxis, ...restProps } = props;
  return (
    <span
      ref={ref}
      className={cs(styles['react-resizable-handle'],styles[`react-resizable-handle-${handleAxis}`] )}
      {...restProps}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
})
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      axis={'x'}
      maxConstraints={[350, 350]}
      handle={<CustomResizeHandle/>}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps}  style={{position: 'relative', ...restProps?.style, userSelect: 'none',  backgroundClip: 'padding-box'}}/>
    </Resizable>
  );
};

export default ResizableTitle;
