import React, { useEffect, useState } from "react";
import { Editor } from "@wangeditor/editor-for-react";
import { IEditorConfig } from "@wangeditor/editor";
import styles from "./style/index.module.less";
import cs from "classnames";
import DOMPurify from "dompurify";

export function Read(props: { theme: boolean, html }) {
  // 如果是 true 则设置为 深夜模式
  const [theme, setTheme] = useState(false);
  const [data, setData] = useState("")
  useEffect(() => {
    setData(DOMPurify.sanitize(props.html))
  }, [props.html])
  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);
  // 编辑器内容
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "...",
    readOnly: true,
  }
    return (
    <div className={cs([theme ? styles["makedown"] : "none",])}>
      <Editor
        defaultConfig={editorConfig}
        value={data}
        mode="simple"
        style={{ overflowY: "hidden" }}
      />
    </div>
  );
}
