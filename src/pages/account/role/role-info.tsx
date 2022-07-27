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

  return useMemo(() => {
    if (state.roleId === "") {
      return (
        <Result status="404" className={styles["layout-content-result"]} />
      );
    }
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
                  postRoleInfo(value);
                  return;
                }
                putRoleInfo(value);
              }}
              className={styles["role-form"]}
            >
              <DynamicTree
                ref={treeRef}
                title={t["role.content.permission.tree"]}
                data={initialValues}
                checkedKeys={state.roleInfo?.permissionIds}
              />
            </DynamicForm>
          </DynamicSkeleton>
        </DynamicCard>
      </div>
    );
  }, [state.roleId, state.roleInfo, state.permission]);
}
