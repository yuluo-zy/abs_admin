import React, { useContext, useMemo } from 'react';
import { Button, Typography } from '@arco-design/web-react';
import styles from './style/index.module.less';
import MessageList from '@/pages/user/role/message-list';
import { IconPlus } from '@arco-design/web-react/icon';
import { RoleContext } from '@/store/context-manager';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';

export default function RolePanel(props) {
  const { t } = props;
  const { state, dispatch } = useContext(RoleContext);

  const addRole = () => {
    const roleList = [];
    let is_add = true;
    for (let i = 0; i < state.roleList?.length; i++) {
      roleList.push(state.roleList[i]);
      if (state.roleList[i]?.id === 0) {
        is_add = false;
      }
    }
    if (is_add) {
      roleList.unshift({
        id: 0,
        role: '',
        name: t['role.content.role.add'],
      });
    }

    dispatch({
      type: 'RoleList',
      payload: roleList,
    });
    dispatch({
      type: 'RoleId',
      payload: 0,
    });
    dispatch({
      type: 'RoleInfo',
      payload: roleList[0],
    });
  };

  return useMemo(() => {
    return (
      <div className={styles['role-panel']}>
        <DynamicSkeleton text={{ rows: 5 }} animation>
          <div className={styles['role-panel-header']}>
            <Typography.Title
              style={{ marginTop: 0, marginBottom: 16 }}
              heading={6}
            >
              {t['role.panel.title']}
            </Typography.Title>
            <div>
              <Button
                type="secondary"
                icon={<IconPlus />}
                onClick={() => {
                  addRole();
                }}
              >
                {t['role.panel.add']}
              </Button>
            </div>
          </div>
          <div className={styles['role-panel-content']}>
            <MessageList data={state.roleList} />
          </div>
        </DynamicSkeleton>
      </div>
    );
  }, [state.roleList]);
}
