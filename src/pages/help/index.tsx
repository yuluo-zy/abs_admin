import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { EN, ZH } from "./doc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Modal } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import MarkdownNavbar from "@/pages/help/MarckdownNavbar";


function HelpInfo(props: { tag?: string, open: boolean, change: any }) {
  const { lang } = useContext(GlobalContext);
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (lang === "zh-CN") {
      setState(ZH);
    }
    if (lang === "en-US") {
      setState(EN);
    }
  }, [lang]);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
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
        if (props.change) {
          props.change(false);
        }
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
          <MarkdownNavbar source={state} declarative={false} tag={props.tag} />
        </div>
      </div>
    </Modal>
  );

}

export default HelpInfo;
