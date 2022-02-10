import React, { useEffect, useReducer } from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/role/locale';
import styles from '@/pages/user/role/style/index.module.less';
import RolePanel from '@/pages/user/role/role-panel';
import RoleStore, { initialRole, RoleContext } from '@/store/context-manager';
import RoleInfo from '@/pages/user/role/role-info';
import { getRole } from '@/api/role';
import { getPermission } from '@/api/permission';

function UserRole() {
  const [state, dispatch] = useReducer(RoleStore, initialRole);
  const t = useLocale(locale);

  function fetchRoleList() {
    getRole()
      .then((res) => {
        dispatch({
          type: 'RoleList',
          payload: res.data.result || []
        });
      });
  }

  function fetchPermissionList() {
    getPermission()
      .then((res) => {
        dispatch({
          type: 'Permission',
          payload: res.data.result || []
        });
      });
  }


  useEffect(() => {
    fetchPermissionList();
    fetchRoleList();
  }, []);

  return (
    <RoleContext.Provider value={{ state, dispatch }}>
      <div>
        <div className={styles.layout}>
          <div className={styles['layout-left-side']}>
            <RolePanel t={t} />
          </div>
          <div className={styles['layout-content']}>
            <RoleInfo />
          </div>
        </div>
      </div>
    </RoleContext.Provider>
  );
}

export default UserRole;
