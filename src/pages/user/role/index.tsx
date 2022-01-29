import React from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/role/locale';
import styles from '@/pages/user/role/style/index.module.less';
import RolePanel from '@/pages/user/role/role-panel';

function UserRole() {
  const t = useLocale(locale);
  return (<div>
    <div className={styles.layout}>
      <div className={styles['layout-left-side']}>
        <RolePanel t={t} />
      </div>
    </div>
  </div>);
}

export default UserRole;
