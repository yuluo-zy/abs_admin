import { Modal } from "@arco-design/web-react";
import React from "react";
import { ModeProps } from "@/components/type";

function DynamicFootModal(props: React.PropsWithChildren<ModeProps>) {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      unmountOnExit={true}
      escToExit={true}
      focusLock
      mask
      maskClosable
      mountOnEnter
      simple
      confirmLoading={props.confirmLoading}
      onCancel={() => {
        props.onCancel?.();
      }}
      onOk={props.onOk}
    >
      {props.children}
    </Modal>
  );
}

export default DynamicFootModal;
