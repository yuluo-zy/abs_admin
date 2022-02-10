import React, { useContext, useMemo } from 'react';
import { Result } from '@arco-design/web-react';
import { RoleContext } from '@/store/context-manager';
import styles from '@/pages/user/role/style/index.module.less';
import DynamicCard from '@/components/Dynamic/Card';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/role/locale';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import { FormItemProps } from '@/components/type';
import DynamicForm from '@/components/Dynamic/Form';
import DynamicTree from '@/components/Dynamic/Form/tree';

export default function RoleInfo() {

  const { state } = useContext(RoleContext);
  const t = useLocale(locale);

  const roleProps: Array<FormItemProps> = [
    {
      label: t['role.content.role.id'],
      type: 'input',
      field: 'name',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['role.content.role.name'],
      type: 'input',
      field: 'name',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['role.content.status'],
      type: 'select',
      field: 'type',
      required: true,
      options: [
        { label: t['permission.list.type.menu'], value: 1 },
        { label: t['permission.list.type.button'], value: 2 }
      ],
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['role.content.remark.info'],
      type: 'input',
      field: 'permission',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['role.content.remark.describe'],
      type: 'input',
      field: 'icon',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    }
  ];


  return useMemo(() => {
    if (state.roleId === '') {
      return <Result status='404' className={styles['layout-content-result']} />;
    }
    return (
      <div>
        <DynamicCard title={t['role.content.title']}>
          <DynamicSkeleton key={state.roleId} text={{ rows: 10 }} animation>
            <DynamicForm title={state.roleInfo?.name}
                         formItem={roleProps}
                         onSubmit={async (value) => {
                         }}>
              <DynamicTree />
            </DynamicForm>
          </DynamicSkeleton>

        </DynamicCard>
      </div>);
  }, [state.roleId, state.roleInfo]);

}
