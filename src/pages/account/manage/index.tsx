import React, { useRef, useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import SearchList from "@/components/Dynamic/List";
import { getUserList, putUserLock, putUserPassword, removeUser } from "@/api/user";
import styles from "./style/index.module.less";
import { Badge, Button, Drawer, Dropdown, Menu, Message, Tooltip, Typography } from "@arco-design/web-react";
import { FormItemProps, SearchItem } from "@/components/type";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicModal from "@/components/Dynamic/Modal";
import RoleTag from "@/pages/account/manage/tag";
import PermissionWrapper from "@/components/PermissionWrapper";
import CreateUserHOC from "./addableUser";
import Customer from "@/pages/account/manage/customer";
import useDeleteRelations from "@/pages/account/manage/deletec-ustomer-relations";
import { IconCloseCircle, IconEdit, IconStamp } from "@arco-design/web-react/icon";

const BS_USER_ROLE = 7;
const CUSTOM_USER_ROLE = 15;
const { Text } = Typography;

function UserManage() {
  const t = useLocale(locale);

  const [visible, setVisible] = useState(false);
  const [customer, setCustomer] = useState(false);
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
        width: 190,
        render: (col, record, index) => {
          // 判断是否是 bs, 如果是bs, 则允许查看对应的客户
          if (record?.roleIds && record?.roleIds.includes(BS_USER_ROLE)) {
            return <Button onClick={() => {
              setUserInfo({
                ...record
              });
              setCustomer(!customer);
            }
            }>{record?.username}</Button>;
          }
          return <Text>{record?.username}</Text>;
        }
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
              <Tooltip content={"Edit"}>
                <IconEdit />
              </Tooltip>
            </Dropdown.Button>
            {record?.approvalStatus === 0 && <PermissionWrapper
              requiredPermissions={[{ resource: "user:approval" }]}
            >
              <div className={styles["group-button"]}>
                <Tooltip content={t["userTable.columns.approval"]}>
                  <Button size={"small"} icon={<IconStamp />}></Button>
                </Tooltip>
              </div>
            </PermissionWrapper>}
            {record?.roleIds.includes(CUSTOM_USER_ROLE) && <PermissionWrapper
              requiredPermissions={[{ resource: "relBusinessCustomer:delete" }]}
            >
              <div className={styles["group-button"]}>
                <Tooltip content={t["userTable.columns.custom.approval.delete"]}>
                  <Button size={"small"}
                          icon={<IconCloseCircle />}
                          onClick={() => {
                            useDeleteRelations({ customerIds: [record.id], t });
                          }}></Button>
                </Tooltip>
              </div>
            </PermissionWrapper>}
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

  const searchListRef = useRef();

  return (
    <>
      <SearchList
        name={t["manage.list.name"]}
        add={CreateUserHOC}
        addName={t["userTable.columns.operations.add"]}
        download={false}
        upload={false}
        ref={searchListRef}
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
            // @ts-ignore
            searchListRef.current.callBack();
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

      <Drawer
        title={t["custom.list.name"]}
        visible={customer}
        confirmLoading={confirmLoading}
        footer={null}
        mask
        maskClosable
        mountOnEnter
        unmountOnExit
        placement={"bottom"}
        height={650}
        onOk={() => {
          setCustomer(false);
          setConfirmLoading(false);
        }}
        onCancel={() => {
          setCustomer(false);
          setConfirmLoading(false);
        }}
      >
        {Customer({
          businessId: userInfo?.id
        })}
      </Drawer>
    </>
  );
}

export default UserManage;
