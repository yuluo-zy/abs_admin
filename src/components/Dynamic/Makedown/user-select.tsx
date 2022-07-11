import React, { useState } from "react";
import { AutoComplete, Button, Input, Modal } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import { MentionElement } from "@wangeditor/plugin-mention";

const { OptGroup, Option } = AutoComplete;

export function UserSelect(props) {
  const {insertMention} = props
  const [data, setData] = useState([]);

  const [value, setValue] = useState('');

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

  const setUser= () => {
    Modal.destroyAll();
    insertMention({
      value: value
    });
  }


  return <div className={styles['auto-complete']}>
    <AutoComplete
      data={data}
      allowClear
      defaultActiveFirstOption
      onSelect={(value) => {
        setValue(value);
      }}
      placeholder="query what you want @"
      triggerElement={<Input.Search />}
      onSearch={handleSearch}
    /><Button type={"primary"} onClick={setUser}>@</Button>
  </div>;
}

UserSelect.showInstance = function(editor) {
  const rect = editor.getEditableContainer().getBoundingClientRect();
  function insertMention(data) {
    const mentionNode: MentionElement = {
      type: "mention", // 必须是 'mention'
      value: data.value, // 文本
      info: { ...data }, // 其他信息，自定义
      children: [{ text: "" }] // 必须有一个空 text 作为 children
    };

    editor.restoreSelection(); // 恢复选区
    editor.deleteBackward("character"); // 删除 '@'
    editor.insertNode(mentionNode); // 插入 mention
    editor.move(1); // 移动光标
  }
  Modal.confirm({
    simple: true,
    title: false,
    className: styles['modal-head'],
    alignCenter: false,
    style: { top: `${rect.top + 30}px`, left: `${rect.left + 30}px`},
    icon: null,
    footer: null,
    content: <UserSelect insertMention={insertMention} />
  });
};
UserSelect.removeInstance = function() {
  Modal.destroyAll();
};
