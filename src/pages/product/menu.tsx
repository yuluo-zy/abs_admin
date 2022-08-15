import { ManageMenuProps } from "@/components/type";
import { Button, Space } from "@arco-design/web-react";
import React from "react";

export default function DemandManageMenu(props: { menu: Array<ManageMenuProps> }) {
  const { menu } = props;
  return <Space>
    {menu.map((item, index) =>
      <Button key={index} type="primary" onClick={item.onChange}>{item.name}</Button>
    )}
  </Space>;
}
