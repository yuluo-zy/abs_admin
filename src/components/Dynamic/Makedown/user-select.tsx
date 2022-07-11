import React, { useCallback, useState } from "react";
import { AutoComplete, Input, Modal } from "@arco-design/web-react";

const { OptGroup, Option } = AutoComplete;

export function UserSelect(props) {
  const { x,y } = props;
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
  const callbackRef = useCallback((node) => {
    console.log('callbackRef', node);
    node && node.focus();
  }, []);

  return <AutoComplete
    data={data}
    allowClear
    style={{
      padding: "14px 18px 18px",
      position: "fixed",
      width: "20rem",
      top: `${y + 20}px`,
      left: `${x+ 10}px`
    }}
    placeholder="Please Enter"
    triggerElement={<Input.Search ref={callbackRef}/>}
    onSearch={handleSearch}
  />;
}

UserSelect.showInstance = function(editor) {
  const rect = editor.getEditableContainer().getBoundingClientRect();
  console.log(rect)
  Modal.confirm({
    modalRender: () => (<div>
      <UserSelect x={rect.left} y={rect.top} />
    </div>)
  });
};
UserSelect.removeInstance = function() {
  if (document.getElementById("select-people")) {
    document.getElementById("select-people").remove();
  }
};
