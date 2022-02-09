import React, { useReducer } from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/role/locale';
import styles from '@/pages/user/role/style/index.module.less';
import RolePanel from '@/pages/user/role/role-panel';
import RoleStore, { initialRole, RoleContext } from '@/store/context-manager';

function UserRole() {
  const [state, dispatch] = useReducer(RoleStore, initialRole);
  const t = useLocale(locale);
  return (
    <RoleContext.Provider value={{ state, dispatch }}>
      <div>
        <div className={styles.layout}>
          <div className={styles['layout-left-side']}>
            <RolePanel t={t} />
          </div>
        </div>
      </div>
    </RoleContext.Provider>
  );
}

export default UserRole;
