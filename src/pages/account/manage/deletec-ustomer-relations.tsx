import { Message, Modal } from "@arco-design/web-react";
import React from "react";
import { deleteCustomRelations } from "@/api/user";

const useDeleteRelations = (props: { destBusinessId?: number, customerIds?: Array<number>, t: any }) => {
  const { destBusinessId, customerIds, t } = props;
  const deleteRelation = (destBusinessId?: number, customerIds?: Array<number>) => {
    deleteCustomRelations({
      destBusinessId,
      customerIds
    }).then(res => {
      if (res.data.success) {
        Message.success(t["userTable.columns.user.custom.delete.success"]);
      }
    });
  };
  Modal.confirm({
    title: t["userTable.columns.user.custom.delete"],
    content: t["userTable.columns.user.custom.delete.info"],
    okButtonProps: {
      status: "danger"
    },
    onOk: () => {
      deleteRelation(destBusinessId, customerIds);
    }
  });
};

export default useDeleteRelations;
