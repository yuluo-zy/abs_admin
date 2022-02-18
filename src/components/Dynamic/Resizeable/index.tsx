import { Resizable } from 'react-resizable';
import React from 'react';

import '/node_modules/react-resizable/css/styles.css';

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={(resizeHandle) => (
        <span
          className={`react-resizable-handle react-resizable-handle-${resizeHandle}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizableTitle;
