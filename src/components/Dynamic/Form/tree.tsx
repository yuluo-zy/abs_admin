import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Tree } from "@arco-design/web-react";

function DynamicTree(props, ref) {
  const [checked, setChecked] = useState(props.checkedKeys);

  useImperativeHandle(ref, () => ({
    getTreeChecked: () => {
      return checked;
    }
  }));

  return (
    <div>
      <div>
        <b>{props.title}</b>
      </div>
      <Tree
        treeData={props.data}
        checkable
        checkedKeys={checked}
        onCheck={(keys) => {
          setChecked(keys);
        }}
        showLine={true}
        size={"large"}
        virtualListProps={{
          height: "50rem"
        }}
      >
        {props.children}
      </Tree>
    </div>
  );
}

export default forwardRef(DynamicTree);
