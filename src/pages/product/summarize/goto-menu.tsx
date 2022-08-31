import React from "react";
import { useHistory } from "react-router";
import { Button, List, Tag } from "@arco-design/web-react";
import useLocale from "@/pages/product/summarize/locale/useLocale";
import styles from "./style/goto.menu.module.less";

interface GotoMenuProps {
  className?: string
  style?: React.CSSProperties,
  dataSource: Array<Record<string, any>>
}

export const GotoMenu: React.FC<GotoMenuProps> = (props: GotoMenuProps) => {
  const history = useHistory();
  const { dataSource } = props;
  const t = useLocale();

  const goto = (path: string) => {
    history.push(path);
  };

  const render = (actions, item, index) => (
    <List.Item key={index} actions={actions}>
      <div className={styles["list"]}>
        <List.Item.Meta
          title={<Tag color="blue" size={"medium"} className={styles["tag"]}>{item.title}</Tag>}
          description={<p>{item.description}</p>}
        />
        <Button className="list-demo-actions-button" onClick={() => goto(item.url)}>Goto</Button>
      </div>
    </List.Item>
  );

  const renderMenu = (dataSource) => {
    const menu = [];
    if (dataSource) {
      menu.push({
        title: t["goto.service.title"],
        description: t["goto.service.description"],
        url: "/product/demand/service/preselection"
      });
      if (dataSource.includes(0)) {
        menu.push({
          title: t["goto.firmware.title"],
          description: t["goto.firmware.description"],
          url: "/product/demand/service/firmware"
        });
      }
      if (dataSource.includes(1)) {
        menu.push({
          title: t["goto.mac.title"],
          description: t["goto.mac.description"],
          url: "/product/demand/service/mac"
        });
      }
      if (dataSource.includes(2)) {
        menu.push({
          title: t["goto.content.title"],
          description: t["goto.content.description"],
          url: "/product/demand/service/burn"
        });
      }
      if (dataSource.includes(3)) {
        menu.push({
          title: t["goto.pre-fit.title"],
          description: t["goto.pre-fit.description"],
          url: "/product/demand/service/pre-fit"
        });
      }
      if (dataSource.includes(4)) {
        menu.push({
          title: t["goto.label.title"],
          description: t["goto.label.description"],
          url: "/product/demand/service/label"
        });
      }
    }
    return menu;
  };
  return <List
    hoverable={true}
    dataSource={renderMenu(dataSource)}
    render={render.bind(null, [])}
  />;
};


