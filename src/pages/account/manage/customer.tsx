import React, { useRef } from "react";
import SearchList from "@/components/Dynamic/List";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/account/manage/locale";
import { getCustomer } from "@/api/user";

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
        width: 50
      },
      {
        title: t["userTable.columns.name"],
        dataIndex: "username",
        width: 190
      },
      {
        title: t["userTable.columns.group"],
        dataIndex: "groupNames",
        width: 120
      },
      {
        title: t["userTable.columns.group.type"],
        dataIndex: "groupTypeNames",
        width: 70
      },
      {
        title: t["userTable.columns.lock"],
        dataIndex: "locked",
        width: 100
        // render: (x) => {
        //   if (x === 1) {
        //     return (
        //       <Badge status="error" text={t["userTable.columns.locked"]} />
        //     );
        //   }
        //   return (
        //     <Badge status="success" text={t["userTable.columns.unlock"]} />
        //   );
        // }
      }
      // {
      //   title: t["searchTable.columns.operations"],
      //   dataIndex: "operations",
      //   headerCellStyle: { paddingLeft: "15px" },
      //   // render: (_, record) => (
      //   <>
      //     {record?.approvalStatus === 0 && <PermissionWrapper
      //       requiredPermissions={[{ resource: "user:approval" }]}
      //     >
      //       <div className={styles["group-button"]}>
      //         <Button size={"small"}>{t["userTable.columns.approval"]}</Button>
      //       </div>
      //     </PermissionWrapper>}
      //     <Dropdown.Button size={"small"} droplist={
      //       <Menu>
      //         {/*<Menu.Item key="1" onClick={() => {*/}
      //         {/*  setUserInfo({*/}
      //         {/*    ...record*/}
      //         {/*  });*/}
      //         {/*  setPasswordVisible(!passwordVisible);*/}
      //         {/*}}>Change Password</Menu.Item>*/}
      //         <Menu.Item key="2" onClick={() => {
      //           putUserLock(record.id, {
      //             locked: record.locked === 0 ? 1 : 0
      //           }).then((res) => {
      //             if (res.data.success === true) {
      //               callback();
      //               Message.info({ content: "ok" });
      //             }
      //           });
      //         }
      //         }>Lock</Menu.Item>
      //         <Menu.Item key="3" onClick={() => {
      //           removeUser({ ids: [record.id] }).then((res) => {
      //             if (res.data.success === true) {
      //               callback();
      //               Message.info({ content: "ok" });
      //             }
      //           });
      //         }
      //         }>Delete</Menu.Item>
      //       </Menu>
      //     }>
      //       Edit
      //     </Dropdown.Button>
      //   </>
      // )
      // }
    ];
  };


  return <SearchList
    name={t["manage.list.name"]}
    download={false}
    upload={false}
    ref={searchRef}
    fetchRemoteData={getCustomerData}
    getColumns={getColumns}
    select={false}
  />;
};


export default Customer;
