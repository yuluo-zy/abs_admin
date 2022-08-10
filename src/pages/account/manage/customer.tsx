import React, { useRef } from "react";
import SearchList from "@/components/Dynamic/List";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/account/manage/locale";
import { getCustomer } from "@/api/user";
import { Badge, Button, Tooltip } from "@arco-design/web-react";
import { CUSTOM_USER_ROLE } from "@/utils/staticVariable";
import PermissionWrapper from "@/components/PermissionWrapper";
import styles from "@/pages/account/manage/style/index.module.less";
import { IconCloseCircle, IconUserAdd } from "@arco-design/web-react/icon";
import useAddRelations from "@/pages/account/manage/add-customer-relations";
import useDeleteRelations from "@/pages/account/manage/deletec-ustomer-relations";

const Customer = (props: { businessId }) => {
  const searchRef = useRef(null);
  const t = useLocale(locale);
  const [addExecute] = useAddRelations();
  const [deleteExecute] = useDeleteRelations();

  const getCustomerData = (data) => {
    return getCustomer({
      ...data,
      businessId: props.businessId
    });
  };
  const getColumns = (callback: () => void) => {
    return [
      {
        title: t["userTable.columns.id"],
        dataIndex: "id",
      },
      {
        title: t["userTable.columns.name"],
        dataIndex: "username",
      },
      {
        title: t["userTable.columns.group"],
        dataIndex: "groupNames"
      },
      {
        title: t["userTable.columns.group.type"],
        dataIndex: "groupTypeNames"
      },
      {
        title: t["userTable.columns.lock"],
        dataIndex: "locked",
        render: (x) => {
          if (x === 1) {
            return (
              <Badge status="error" text={t["userTable.columns.locked"]} />
            );
          }
          return (
            <Badge status="success" text={t["userTable.columns.unlock"]} />
          );
        }
      },
      {
        title: t["searchTable.columns.operations"],
        dataIndex: "operations",
        headerCellStyle: { paddingLeft: "15px" },
        render: (_, record) => (
          <>
            {record?.roleIds.includes(CUSTOM_USER_ROLE) && <PermissionWrapper
              requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
            >
              <div className={styles["group-button"]}>
                <Tooltip content={t["userTable.columns.custom.approval.delete"]}>
                  <Button size={"small"}
                          icon={<IconCloseCircle />}
                          onClick={() => {
                            deleteExecute({ destBusinessId: props.businessId, customerIds: [record.id] });
                          }}></Button>
                </Tooltip>
              </div>
            </PermissionWrapper>}
            {record?.roleIds.includes(CUSTOM_USER_ROLE) && <PermissionWrapper
              requiredPermissions={[
                { resource: "relBusinessCustomer:transform" },
                { resource: "relBusinessCustomer:impart" }
              ]}
            >
              <div className={styles["group-button"]}>
                <Tooltip content={t["userTable.columns.user.custom.add"]}>
                  <Button size={"small"}
                          icon={<IconUserAdd />}
                          onClick={() => {
                            addExecute({ originBusiness: props.businessId, customerIds: [record.id] });
                          }}></Button>
                </Tooltip>
              </div>
            </PermissionWrapper>}
          </>
        )
      }
    ];
  };
  return <SearchList
    download={false}
    upload={false}
    ref={searchRef}
    fetchRemoteData={getCustomerData}
    getColumns={getColumns}
    select={false}
  />;
};


export default Customer;
