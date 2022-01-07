import { Modal } from '@arco-design/web-react';
import React from 'react';
import useLocale from './locale/useLocale';
import styles from '@/pages/login/style/index.module.less';

export default function LoginProtocol() {
  const [visible, setVisible] = React.useState(false);
  const t = useLocale();

  return (
    <div className={styles['protocol']}>
      <div>{t['protocol.turn.on']}</div>
      <a onClick={() => {
        setVisible(true);
      }}>
        {t['protocol.button']}
      </a>
      <Modal
        title={t['protocol.title']}
        visible={visible}
        footer={null}
        alignCenter={false}
        style={{ top: '20%' }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>{t['protocol.content']}</div>
      </Modal></div>
  );
}
