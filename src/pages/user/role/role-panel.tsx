import React, { useEffect, useState } from 'react';
import { Button, Spin, Typography } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { getRole } from '@/api/role';
import MessageList from '@/pages/user/role/message-list';
import { IconPlus } from '@arco-design/web-react/icon';

export default function RolePanel(props) {
  const [roleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = props;

  function fetchRoleList() {
    setLoading(true);
    getRole()
      .then((res) => {
        setRoleList(res.data.result || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchRoleList();
  }, []);

  return (
    <div className={styles['role-panel']}>
      <Spin loading={loading} style={{ width: '100%' }}>
      <div className={styles['role-panel-header']}>
        <Typography.Title
          style={{ marginTop: 0, marginBottom: 16 }}
          heading={6}
        >
          {t['role.panel.title']}
        </Typography.Title>
        <div>
          <Button type='secondary' icon={<IconPlus />} onClick={() => {
          }}>{t['role.panel.add']}</Button>
        </div>
      </div>
      <div className={styles['role-panel-content']}>
          <MessageList data={roleList} />
      </div>
      </Spin>
    </div>
  );
}
