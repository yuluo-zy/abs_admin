import { ManageMenuProps } from "@/components/type";
import { Button, Message, Modal, Space } from "@arco-design/web-react";
import React from "react";
import useLocale from "@/pages/product/locale/useLocale";
import { ProductStore } from "@/store/product";
import { postProductionDemand } from "@/api/demand";
import shallow from "zustand/shallow";
import { useHistory } from "react-router";

export default function DemandManageMenu() {
  const t = useLocale();
  const history = useHistory();
  const [setDemandId, reset] = ProductStore(state => [state.setDemandId, state.reset], shallow);

  function addDemandConfirm() {
    Modal.confirm({
      title: "Tips",
      content: t["product.manage.tools.add.message"],
      okButtonProps: { status: "danger" },
      onOk: () => {
        // 清空
        reset();
        ProductStore.persist.clearStorage();
        postProductionDemand().then(res => {
            Message.success(t["product.manage.tools.add.message.ok"]);
            setDemandId(res.data.result);
            history.push(`/product/demand`);
          }
        ).catch(err =>
          Message.error(err)
        );
      }
    });
  }

  const menu: Array<ManageMenuProps> = [
    {
      name: t["product.manage.operate.select"], onChange: item => {
      }
    },
    {
      name: t["product.manage.operate.not.select"], onChange: item => {
      }
    },
    {
      name: t["product.manage.tools.add"], onChange: () => {
        addDemandConfirm();
      }
    }
  ];
  return <Space>
    {menu.map((item, index) =>
      <Button key={index} type="primary" onClick={item.onChange}>{item.name}</Button>
    )}
  </Space>;
}
