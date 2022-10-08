import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { EN, ZH } from "./doc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Modal } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import MarkdownNavbar from "@/pages/help/MarckdownNavbar";
import { HelpSetting, setHelpKey } from "@/store/help";


function HelpInfo() {
  const { lang } = useContext(GlobalContext);
  const helpKey = HelpSetting(state => state.helpKey);
  const [state, setState] = useState("");
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
      visible={!!helpKey}
      alignCenter
      footer={null}
      onCancel={() => {
        setHelpKey("");
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
          <MarkdownNavbar source={state} declarative={false} tag={helpKey} />
        </div>
      </div>
    </Modal>
  );

}

export default HelpInfo;
