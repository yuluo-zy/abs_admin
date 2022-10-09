import { Modal } from "@arco-design/web-react";
import React from "react";
import { ModeProps } from "@/components/type";

function DynamicModal(props: React.PropsWithChildren<ModeProps>) {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      footer={null}
      unmountOnExit={true}
      alignCenter={false}
      style={{ top: "30%", width: "500px" }}
      confirmLoading={props.confirmLoading}
      onCancel={() => {
        props.onCancel?.();
      }}
    >
      {props.children}
    </Modal>
  );
}

export default DynamicModal;
