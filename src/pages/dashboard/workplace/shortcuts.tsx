import React from "react";
import { Card, Typography } from "@arco-design/web-react";
import { IconSettings, IconStorage } from "@arco-design/web-react/icon";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import styles from "./style/shortcuts.module.less";
import { useHistory } from "react-router";

function Shortcuts() {
  const t = useLocale(locale);
  const history = useHistory();

  const shortcuts = [
    {
      title: t["workplace.contentStatistic"],
      key: "Content Statistic",
      icon: <IconStorage />,
      path: "/product"
    },
    {
      title: t["workplace.advancedMgmt"],
      key: "Advanced Management",
      icon: <IconSettings />,
      path: "/"
    }
  ];

  function onClickShortcut(path) {
    history.push(path);
  }

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title heading={6}>
          {t["workplace.shortcuts"]}
        </Typography.Title>
      </div>
      <div className={styles.shortcuts}>
        {shortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.path)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Shortcuts;
