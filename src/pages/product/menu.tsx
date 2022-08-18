import { Button, Message, Modal, Space } from "@arco-design/web-react";
import React from "react";
import useLocale from "@/pages/product/locale/useLocale";
import { ProductStore } from "@/store/product";
import { postProductionDemand } from "@/api/demand";
import shallow from "zustand/shallow";
import { useHistory } from "react-router";
import PermissionWrapper from "@/components/PermissionWrapper";
import { CustomOperationDemand } from "@/pages/product/menu-model/custom-operation-demand";
import { customCancel, customCommit, customCopy, customWithdraw } from "@/api/operation";

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

  return <Space>
    <PermissionWrapper
      requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
    >
      <Button type="primary" onClick={() => {
        addDemandConfirm();
      }}>{t["product.manage.tools.add"]}</Button>
    </PermissionWrapper>
    <PermissionWrapper
      requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
    >
      <CustomOperationDemand context={"product.manage.tools.apply"} custom={customCommit} />
    </PermissionWrapper>
    <PermissionWrapper
      requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
    >
      <CustomOperationDemand context={"product.manage.tools.withdraw"} custom={customWithdraw} />
    </PermissionWrapper>
    <PermissionWrapper
      requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
    >
      <Button type="primary" onClick={() => {
        addDemandConfirm();
      }}>{t["product.manage.tools.update"]}</Button>
    </PermissionWrapper>
    <PermissionWrapper
      requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
    >
      <CustomOperationDemand context={"product.manage.tools.cancel"} custom={customCancel} />
    </PermissionWrapper>
    <PermissionWrapper
      requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
    >
      <CustomOperationDemand context={"product.manage.tools.copy"} custom={customCopy} />
    </PermissionWrapper>
  </Space>;
}
