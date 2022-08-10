import React, { useRef } from "react";
import SearchList from "@/components/Dynamic/List";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/account/manage/locale";
import { getCustomer } from "@/api/user";
import { Badge } from "@arco-design/web-react";

const Customer = (props: { businessId }) => {
  const searchRef = useRef(null);
  const t = useLocale(locale);

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
          </>
        )
      }
    ];
  };
  return <SearchList
    // name={t["manage.list.name"]}
    download={false}
    upload={false}
    ref={searchRef}
    fetchRemoteData={getCustomerData}
    getColumns={getColumns}
    select={false}
  />;
};


export default Customer;
