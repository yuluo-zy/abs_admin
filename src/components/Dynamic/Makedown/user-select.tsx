import React, { useState } from "react";
import { AutoComplete, Input, Modal } from "@arco-design/web-react";
import styles from "./style/index.module.less";

const { OptGroup, Option } = AutoComplete;

export function UserSelect() {
  // const { x,y } = props;
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    if (inputValue) {
      console.log("select");
      setData(
        ["Group-1", "Group-2", "Group-3"].map((groupName, outerIndex) => (
          <OptGroup key={outerIndex} label={groupName}>
            {new Array(3).fill(null).map((_, innerIndex) => {
              const value = `${inputValue}-${outerIndex + 1}-${innerIndex + 1}`;
              return (
                <Option key={`${outerIndex}_${innerIndex}`} value={value}>
                  {value}
                </Option>
              );
            })}
          </OptGroup>
        ))
      );
    } else {
      setData([]);
    }
  };


  return <AutoComplete
    data={data}
    allowClear
    placeholder="Please Enter"
    triggerElement={<Input.Search />}
    onSearch={handleSearch}
  />;
}

UserSelect.showInstance = function(editor) {
  const rect = editor.getEditableContainer().getBoundingClientRect();
  console.log(rect)
  Modal.confirm({
    simple: true,
    title: false,
    className: styles['modal-head'],
    alignCenter: false,
    style: { top: `${rect.top + 30}px`, left: `${rect.left + 30}px`},
    icon: null,
    footer: null,
    content: <UserSelect />
  });
};
UserSelect.removeInstance = function() {
  if (document.getElementById("select-people")) {
    document.getElementById("select-people").remove();
  }
};
