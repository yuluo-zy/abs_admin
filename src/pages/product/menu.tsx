import { Button, Message, Modal, Space } from "@arco-design/web-react";
import React from "react";
import useLocale from "@/pages/product/locale/useLocale";
import { ProductStore } from "@/store/product";
import { postProductionDemand } from "@/api/demand";
import shallow from "zustand/shallow";
import { useHistory } from "react-router";
import PermissionWrapper from "@/components/PermissionWrapper";
import { CustomOperationDemand } from "@/pages/product/menu-model/custom-operation-demand";
import {
  bsReceive,
  bsReject,
  customCancel,
  customCommit,
  customCopy,
  customEngineerCancel,
  customEngineerCommit,
  customEngineerCopy,
  customEngineerDistribute,
  customEngineerReceive,
  customEngineerReject,
  customEngineerWithdraw,
  customWithdraw,
  factoryComplete,
  factoryReject
} from "@/api/operation";
import { RelatedPersonnelDemand } from "@/pages/product/menu-model/related-personnel-demand";
import { DesignatedPersonDemand } from "@/pages/product/menu-model/designated-person-demand";
import { ManagePath, ProductDemandPath, ProductPath } from "@/utils/routingTable";

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
          history.push(`${ManagePath}${ProductPath}${ProductDemandPath}`);
          }
        ).catch(err =>
          Message.error(err)
        );
      }
    });
  }

  return <>
    <Space direction={"vertical"}>
      <Space>
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
          <CustomOperationDemand context={"product.manage.tools.cancel"} custom={customCancel} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.copy"} custom={customCopy} />
        </PermissionWrapper>
      </Space>
      <Space>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <DesignatedPersonDemand multiple={false} postFunction={bsReceive} title={"product.manage.tools.receive"} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.reject"} custom={bsReject} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <RelatedPersonnelDemand />
        </PermissionWrapper>
      </Space>
      <Space>
        {/*添加工程师功能*/}
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
          <CustomOperationDemand context={"product.manage.tools.apply"} custom={customEngineerCommit} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.withdraw"} custom={customEngineerWithdraw} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.cancel"} custom={customEngineerCancel} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.copy"} custom={customEngineerCopy} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.reject"} custom={customEngineerReject} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.receive"} custom={customEngineerReceive} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <DesignatedPersonDemand multiple={true} postFunction={customEngineerDistribute}
                                  title={"product.manage.tools.receive.factory"} />
        </PermissionWrapper>
      </Space>
      <Space>
        {/*添加工厂功能*/}
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.reject"} custom={factoryReject} />
        </PermissionWrapper>
        <PermissionWrapper
          requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
        >
          <CustomOperationDemand context={"product.manage.tools.complete"} custom={factoryComplete} />
        </PermissionWrapper>
      </Space>
    </Space>
  </>;
}
