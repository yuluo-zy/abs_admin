import React, { useContext, useMemo } from "react";
import { Divider, Message, Popconfirm, Space, Typography } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";
import cs from "classnames";
import styles from "./style/index.module.less";
import useLocale from "@/utils/useHook/useLocale";
import locale from "../locale";
import { RoleContext } from "@/store/context-manager";
import { deleteRole } from "@/api/role";
import useDebounce from "@/utils/useHook/useDebounce";

export interface RoleItem {
  id?: string;
  role?: string;
  name?: string;
  description?: string;
  status?: number;
  permissionIds?: Array<number>;
}

export interface MessageItemProps {
  data: RoleItem;
}

function MessageItem(props: MessageItemProps) {
  const { data } = props;
  const t = useLocale(locale);
  const classNames = cs(styles["message-item"], {
    [styles["message-item-collected"]]: data.status
  });
  const { state, dispatch } = useContext(RoleContext);

  const getStyle = (id, roleId) => {
    if (id === roleId) {
      return {
        backgroundColor: "rgb(var(--gray-3))"
      };
    }
    return {};
  };

  const clickDiv = useDebounce(() => {
    if (state.roleId === data.id) {
      dispatch({
        type: "RoleId",
        payload: ""
      });
    } else {
      dispatch({
        type: "RoleId",
        payload: data.id
      });
    }
    dispatch({
      type: "RoleInfo",
      payload: data
    });
  }, 300);

  const deleteRoleItem = useDebounce(async (id) => {
    await deleteRole(id).then((res) => {
      if (res.data.success === true) {
        Message.success(t["role.content.operate.success"]);
        dispatch({
          type: "RoleId",
          payload: ""
        });
        dispatch({
          type: "Update",
          payload: !state.update
        });
      }
    });
  }, 200);

  return useMemo(() => {
    return (
      <div
        className={classNames}
        style={getStyle(state.roleId, data.id)}
        onClick={clickDiv}
      >
        <Space size={4} direction="vertical" style={{ width: "100%" }}>
          <div className={styles["message-item-title"]}>
            {data.status != 2 ? (
              <Typography.Text type="warning">{data.role}</Typography.Text>
            ) : (
              <Typography.Text type="secondary">
                <del> {data.role}</del>
                <Typography.Text type="error">
                  {" "}
                  {t["role.panel.item.disable"]}
                </Typography.Text>
              </Typography.Text>
            )}
            <div className={styles["message-item-footer"]}>
              <div className={styles["message-item-actions"]}>
                <div className={styles["message-item-actions-item"]}>
                  <Popconfirm
                    title={t["role.panel.item.delete.title"]}
                    position="rt"
                    onOk={() => {
                      deleteRoleItem(data.id);
                    }}
                    onCancel={() => {
                      Message.error({ content: "cancel" });
                    }}
                  >
                    <IconDelete
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
          <Typography.Text className={styles["message-item-text"]}>
            {data.name}
          </Typography.Text>
          <Typography.Text className={styles["message-item-text"]}>
            {data.description}
          </Typography.Text>
        </Space>
        <Divider className={styles["divider"]} />
      </div>
    );
  }, [state.roleId, dispatch]);
}

export default MessageItem;
