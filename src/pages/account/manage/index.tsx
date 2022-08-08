import React, { useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import SearchList from "@/components/Dynamic/List";
import { getUserList, putUserLock, putUserPassword, removeUser } from "@/api/user";
import styles from "./style/index.module.less";
import { Badge, Button, Dropdown, Menu, Message } from "@arco-design/web-react";
import { FormItemProps, SearchItem } from "@/components/type";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicModal from "@/components/Dynamic/Modal";
import RoleTag from "@/pages/account/manage/tag";
import PermissionWrapper from "@/components/PermissionWrapper";
import CreateUserHOC from "./addableUser";

function UserManage() {
  const t = useLocale(locale);

  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


  const postUserPassword: Array<FormItemProps> = [
    {
      label: t["userTable.columns.user.password.new"],
      field: "password1",
      type: "password",
      required: true,
      rules: [
        {
          required: true,
          message: t["userTable.columns.user.password.error"],
          minLength: 8
        }
      ]
    },
    {
      label: t["userTable.columns.user.password.again"],
      field: "password2",
      type: "password",
      required: true,
      rules: [
        {
          required: true,
          message: t["userTable.columns.user.password.error"],
          minLength: 8
        }
      ]
    }
  ];

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
        title: t["userTable.columns.roleList"],
        dataIndex: "roleNames",
        render: (_, record) => (
          <div className={styles["content-type"]}>
            <RoleTag roleName={record?.roleNames} roleId={record?.roleIds} />
          </div>
        )
      },
      {
        title: t["userTable.columns.lock"],
        dataIndex: "locked",
        width: 100,
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
            {record?.approvalStatus === 0 && <PermissionWrapper
              requiredPermissions={[{ resource: "user:approval" }]}
            >
              <div className={styles["group-button"]}>
                <Button size={"small"}>{t["userTable.columns.approval"]}</Button>
              </div>
            </PermissionWrapper>}
            <Dropdown.Button size={"small"} droplist={
              <Menu>
                <Menu.Item key="1" onClick={() => {
                  setUserInfo({
                    ...record
                  });
                  setPasswordVisible(!passwordVisible);
                }}>Change Password</Menu.Item>
                <Menu.Item key="2" onClick={() => {
                  putUserLock(record.id, {
                    locked: record.locked === 0 ? 1 : 0
                  }).then((res) => {
                    if (res.data.success === true) {
                      callback();
                      Message.info({ content: "ok" });
                    }
                  });
                }
                }>Lock</Menu.Item>
                <Menu.Item key="3" onClick={() => {
                  removeUser({ ids: [record.id] }).then((res) => {
                    if (res.data.success === true) {
                      callback();
                      Message.info({ content: "ok" });
                    }
                  });
                }
                }>Delete</Menu.Item>
              </Menu>
            } onClick={() => {
              setUserInfo({
                ...record
              });
              setVisible(!visible);
            }}>
              Edit
            </Dropdown.Button>
          </>
        )
      }
    ];
  };


  const selectItem: Array<SearchItem> = [
    {
      name: t["userTable.columns.id"],
      field: "id",
      type: "input"
    },
    {
      name: t["userTable.columns.name"],
      field: "username",
      type: "input"
    },
    {
      name: t["userTable.columns.lock"],
      field: "locked",
      type: "select",
      options: [t["userTable.columns.unlock"], t["userTable.columns.locked"]]
    }
  ];

  return (
    <div>
      <SearchList
        name={t["manage.list.name"]}
        add={CreateUserHOC}
        addName={t["userTable.columns.operations.add"]}
        download={false}
        upload={false}
        fetchRemoteData={getUserList}
        getColumns={getColumns}
        select={true}
        selectItem={selectItem}
      />

      {/*用户角色*/}
      <DynamicModal
        title={t["userTable.columns.operations.edit"]}
        visible={visible}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
          setConfirmLoading(false);
        }}
      >
        {CreateUserHOC({
          data: { ...userInfo },
          confirmCallback: () => {
            setVisible(false);
            setConfirmLoading(false);
          }
        })}
      </DynamicModal>

      {/*密码修改*/}
      <DynamicModal
        title={t["userTable.columns.user.password.edit"]}
        visible={passwordVisible}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setPasswordVisible(false);
          setConfirmLoading(false);
        }}
      >
        <DynamicForm
          title={t["userTable.columns.user.password.edit"]}
          formItem={postUserPassword}
          onSubmit={async (value) => {
            const { password1, password2 } = value;
            if (password1 !== password2) {
              Message.error({
                content: t["userTable.columns.user.password.again.error"],
                duration: 10000
              });
              return;
            }
            await putUserPassword(userInfo.id, { password: password1 }).then(
              (res) => {
                if (res.data.success === true) {
                  Message.success(
                    t["userTable.columns.user.operation.success"]
                  );
                  setPasswordVisible(false);
                  setConfirmLoading(false);
                }
              }
            );
          }}
        />
      </DynamicModal>
    </div>
  );
}

export default UserManage;
