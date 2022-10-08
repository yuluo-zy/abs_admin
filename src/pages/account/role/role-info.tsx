import React, { useContext, useMemo, useRef } from "react";
import { Message, Result } from "@arco-design/web-react";
import { RoleContext } from "@/store/context-manager";
import styles from "./style/index.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { FormItemProps } from "@/components/type";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicTree from "@/components/Dynamic/Form/tree";
import { cloneDeep } from "@arco-design/web-react/es/Form/utils";
import { postRole, putRole } from "@/api/role";

export default function RoleInfo() {
  const { state, dispatch } = useContext(RoleContext);
  const t = useLocale(locale);

  const getInitData = (data, userList) => {
    let temp = [];
    if (data && userList) {
      let treeMap = new Map();
      const addLsit = (data) => {
        data.forEach((ele) => {
          treeMap.set(ele.id, ele);
          if (ele.children && ele.children.length > 0) {
            addLsit(ele.children);
          }
        });
      };
      addLsit(data);
      temp = [...userList];
      for (const item of userList) {
        const value = treeMap.get(item);
        if (value) {
          if (value?.children) {
            for (const node of value?.children) {
              if (!userList.includes(node.id)) {
                temp.splice(temp.findIndex(item => item === value.id), 1);
              }
            }
          }
        }
      }
    }

    return temp;
  };

  const getTreeDate = (treeList) => {
    treeList.forEach((ele) => {
      ele["title"] = ele["name"];
      ele["key"] = ele["id"];
      ele["icon"] = undefined;
      if (ele.children && ele.children.length > 0) {
        getTreeDate(ele.children);
      }
    });
  };

  const roleProps: Array<FormItemProps> = [
    {
      label: t["role.content.role.id"],
      type: "input",
      field: "role",
      required: true,
      rules: [
        {
          required: true,
          message: t["permission.list.operate.error"],
          minLength: 2
        }
      ]
    },
    {
      label: t["role.content.role.name"],
      type: "input",
      field: "name",
      required: true,
      rules: [
        {
          required: true,
          message: t["permission.list.operate.error"],
          minLength: 2
        }
      ]
    },
    {
      label: t["role.content.status"],
      type: "select",
      field: "status",
      required: true,
      options: [
        { label: t["role.content.status.normal"], value: 1 },
        { label: t["role.content.status.disabled"], value: 2 }
      ],
      rules: [
        {
          required: true,
          message: t["permission.list.operate.error"],
          minLength: 2
        }
      ]
    },
    {
      label: t["role.content.remark.describe"],
      type: "input",
      field: "description",
      required: true,
      rules: [
        {
          required: true,
          message: t["permission.list.operate.error"],
          minLength: 2
        }
      ]
    }
  ];
  const treeRef = useRef();
  const getTreeChecked = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return treeRef.current.getTreeChecked();
  };

  const putRoleInfo = async (value) => {
    value["permissionIds"] = getTreeChecked().toString();
    value["id"] = state.roleId;
    putRole(value).then((res) => {
      if (res.data.success === true) {
        Message.success(t["role.content.operate.success"]);
        dispatch({
          type: "Update",
          payload: !state.update
        });
      }
    });
  };

  const postRoleInfo = async (value) => {
    value["permissionIds"] = getTreeChecked().toString();
    postRole(value).then((res) => {
      if (res.data.success === true) {
        Message.success(t["role.content.operate.success"]);
        dispatch({
          type: "Update",
          payload: !state.update
        });
      }
    });
    dispatch({
      type: "RoleId",
      payload: ""
    });
  };

  // 根据叶子节点 去掉半悬状态 的子选项

  return useMemo(() => {
    if (state.roleId === "") {
      return (
        <Result status="404" className={styles["layout-content-result"]} />
      );
    }
    // 初始化 对应的 树结构
    const initialValues = cloneDeep(state.permission);
    getTreeDate(initialValues);
    return (
      <div>
        <DynamicCard title={t["role.content.title"]}>
          <DynamicSkeleton key={state.roleId} text={{ rows: 10 }} animation>
            <DynamicForm
              key={state.roleId}
              title={state.roleInfo?.name}
              formItem={roleProps}
              data={state.roleInfo}
              onSubmit={async (value) => {
                if (state.roleId === 0) {
                  await postRoleInfo(value);
                  return;
                }
                await putRoleInfo(value);
              }}
              className={styles["role-form"]}
            >
              <DynamicTree
                ref={treeRef}
                title={t["role.content.permission.tree"]}
                data={initialValues}
                checkedKeys={getInitData(initialValues, state.roleInfo?.permissionIds)}
              />
            </DynamicForm>
          </DynamicSkeleton>
        </DynamicCard>
      </div>
    );
  }, [state.roleId, state.roleInfo, state.permission]);
}
