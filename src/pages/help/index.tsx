import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { EN, ZH } from "./doc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Modal } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import MarkdownNavbar from "markdown-navbar";
import "./style/markdown.navigation.less";

function HelpInfo() {
  const { lang } = useContext(GlobalContext);
  const [state, setState] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (lang === "zh-CN") {
      setState(ZH);
    }
    if (lang === "en-US") {
      setState(EN);
    }
  }, [lang]);
  return (
    <Modal
      title={
        <div className={styles["title"]}>
          Help Manual
        </div>
      }
      visible={open}
      alignCenter
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      className={styles["modal"]}
      autoFocus={true}
      escToExit
      focusLock={true}
      maskClosable
      mountOnEnter
      simple={true}
    >
      <div className={styles["context"]}>
        <div className={styles["article"]}>
          <ReactMarkdown children={state} remarkPlugins={[remarkGfm]} />
        </div>

        <div className={styles["navigation"]}>
          <MarkdownNavbar source={state} ordered={false} declarative={false} />
        </div>
      </div>
    </Modal>
  );

}

export default HelpInfo;
