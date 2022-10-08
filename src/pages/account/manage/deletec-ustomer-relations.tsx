import { Message, Modal } from "@arco-design/web-react";
import React, { useMemo } from "react";
import { deleteCustomRelations } from "@/api/user";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/account/manage/locale";

const useDeleteRelations = () => {
  const t = useLocale(locale);
  const deleteRelation = (destBusinessId?: number, customerIds?: Array<number>, callback?) => {
    deleteCustomRelations({
      destBusinessId,
      customerIds
    }).then(res => {
      if (res.data.success) {
        if (callback) {
          callback();
        }
        Message.success(t["userTable.columns.user.custom.delete.success"]);
      }
    });
  };
  const execute = useMemo(() => {
    const handler = ({ destBusinessId, customerIds, callback }) => {
      Modal.confirm({
        title: t["userTable.columns.user.custom.delete"],
        content: t["userTable.columns.user.custom.delete.info"],
        okButtonProps: {
          status: "danger"
        },
        onOk: () => {
          deleteRelation(destBusinessId, customerIds, callback);
        }
      });
    };
    return [handler];
  }, []);

  return [...execute];
};

export default useDeleteRelations;
