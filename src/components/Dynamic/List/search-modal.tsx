import { Modal } from '@arco-design/web-react';
import React from 'react';
import { ModeProps } from '@/components/type';


function SearchModal(props: ModeProps) {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      footer={null}
      confirmLoading={props.confirmLoading}
      onCancel={() => {
        props.onCancel()
      }}
    >
      {props.children}
    </Modal>);
}

export default SearchModal;
