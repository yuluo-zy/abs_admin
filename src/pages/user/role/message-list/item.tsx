import React from 'react';
import { Divider, Message, Popconfirm, Space, Typography } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import cs from 'classnames';
import styles from './style/index.module.less';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/role/locale';

export interface DataItem {
  id?: string;
  role?: string;
  name?: string;
  description?: string;
  status?: number;
  permissionIds?: Array<number>
}

export interface MessageItemProps {
  data: DataItem;
}

function MessageItem(props: MessageItemProps) {
  const { data = {} } = props;
  const t = useLocale(locale);
  const classNames = cs(styles['message-item'], {
    [styles['message-item-collected']]: data.status,
  });
  return (
    <div className={classNames}>
      <Space size={4} direction="vertical" style={{ width: '100%' }}>
        <div className={styles['message-item-title']}>
          {
            data.status != 2 ?
              <Typography.Text type="warning">{data.role}</Typography.Text>
              : <Typography.Text type="secondary"><del> {data.role}</del>
                <Typography.Text type="error">  {t['role.panel.item.disable']}</Typography.Text></Typography.Text>
          }
          <div className={styles['message-item-footer']}>
            <div className={styles['message-item-actions']}>
              <div className={styles['message-item-actions-item']}>
                <Popconfirm
                  title={t['role.panel.item.delete.title']}
                  position='rt'
                  onOk={() => {
                    Message.info({ content: 'ok' });
                  }}
                  onCancel={() => {
                    Message.error({ content: 'cancel' });
                  }}
                >
                <IconDelete  />
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
        <Typography.Text className={styles['message-item-text']}>{data.name}</Typography.Text>
        <Typography.Text className={styles['message-item-text']}>{data.description}</Typography.Text>
      </Space>
      <Divider className={styles['divider']} />
    </div>
  );
}

export default MessageItem;
