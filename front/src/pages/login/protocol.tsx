import { Modal } from "@arco-design/web-react";
import React from "react";
import styles from "@/pages/login/style/index.module.less";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";

export default function LoginProtocol() {
  const [visible, setVisible] = React.useState(false);
  const t = useLocale(locale);

  return (
    <div className={styles["protocol"]}>
      <div style={{ position: "absolute", display: "flex" }}>
        <div>{t["protocol.turn.on"]}</div>
        <a
          style={{ display: "inline-block" }}
          onClick={() => {
            setVisible(true);
          }}
        >
          {t["protocol.button"]}
        </a>
      </div>

      <Modal
        title={t["protocol.title"]}
        visible={visible}
        footer={null}
        alignCenter={false}
        style={{ top: "20%" }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>{t["protocol.content"]}</div>
      </Modal>
    </div>
  );
}
