import React from "react";
import { Drawer } from "@arco-design/web-react";

interface DrawerProps {
  visible: boolean,
  setVisible: any,
  data: Record<string, any>
}

export const OrderDrawer: React.FC<DrawerProps> = (props: React.PropsWithChildren<DrawerProps>) => {
  const { visible, setVisible } = props;
  return <Drawer
    width={332}
    title={<span>Basic Information </span>}
    visible={visible}
    onOk={() => {
      setVisible(false);
    }}
    onCancel={() => {
      setVisible(false);
    }}
  >
    <div>Here is an example text.</div>

    <div>Here is an example text.</div>
  </Drawer>;
};
