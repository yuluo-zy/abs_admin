import React, { useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/permission/locale';
import { getPermission } from '@/api/permission';
import SearchList from '@/components/Dynamic/List';
import { Badge, Dropdown, Menu } from '@arco-design/web-react';
import { FormItemProps } from '@/components/type';
import DynamicModal from '@/components/Dynamic/Modal';
import DynamicForm from '@/components/Dynamic/Form';


function UserPermission() {
  const t = useLocale(locale);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formProps, setFormProps] = useState(null);
  const [permission, setPermission] = useState(null);

  const permissionProps: Array<FormItemProps> = [
    {
      label: t['permission.list.name'],
      type: 'input',
      field: 'name',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['permission.list.type'],
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
      label: t['permission.list.mark'],
      type: 'input',
      field: 'permission',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['permission.list.icon'],
      type: 'input',
      field: 'icon',
      required: true,
      rules: [{ required: true, message: t['permission.list.operate.error'], minLength: 2 }]
    },
    {
      label: t['permission.list.sort'],
      type: 'number',
      field: 'sort',
      required: true,
      rules: [{ required: true, type: 'number', message: t['permission.list.operate.error'], min: 0 }]
    }
  ];

  const update = (type: 'UpdateSelf' | 'SameLevel' | 'LowerLevel') => {
    switch (type) {
      case 'UpdateSelf'  :
        setFormProps({
          title: t['permission.list.title.update'],
          formItem: permissionProps,
          onSubmit: async () => {
          }
        });
        break;
      case 'SameLevel'  :
        setFormProps({
          title: t['permission.list.operate.same.level'],
          formItem: permissionProps,
          onSubmit: async () => {
          }
        });
        break;
      case 'LowerLevel'  :
        setFormProps({
          title: t['permission.list.operate.next.level'],
          formItem: permissionProps,
          onSubmit: async () => {
          }
        });
        break;


    }
    setVisible(true);
  }

    const dropList = (
      <Menu>
        <Menu.Item key='1' onClick={() =>update('SameLevel')}>{t['permission.list.operate.same.level']}</Menu.Item>
        <Menu.Item key='2' onClick={() =>update('LowerLevel')}>{t['permission.list.operate.next.level']}</Menu.Item>
      </Menu>
    );

    const columns = () => {
      return [
        {
          title: t['permission.list.name'],
          dataIndex: 'name',
          render: (value) => <div>{value}</div>,
          width: 70
        },
        {
          title: t['permission.list.type'],
          dataIndex: 'typeName',
          render: (value, record) => <div>
            {record.type == 1 ?
              <Badge color='arcoblue' style={{ marginRight: 10 }} text={value} />
              : <Badge color='lime' style={{ marginRight: 10 }} text={value} />
            }
          </div>,
          width: 70
        },
        {
          title: t['permission.list.mark'],
          dataIndex: 'permission',
          render: (value) => <div>{value}</div>,
          width: 70
        },
        {
          title: t['permission.list.icon'],
          dataIndex: 'icon',
          render: (value) => <div>{value}</div>,
          width: 70
        },
        {
          title: t['permission.list.sort'],
          dataIndex: 'sort',
          render: (value) => <div>{value}</div>,
          width: 70
        },
        {
          title: t['permission.list.operate'],
          dataIndex: 'id',
          render: (_, record) => (
            <div>
              <Dropdown.Button
                type='primary'
                droplist={dropList}
                onClick={() =>update('UpdateSelf')}>
                {t['permission.list.operate.edit']}
              </Dropdown.Button>
            </div>
          ),
          width: 70
        }
      ];
    };

    return (<div>
      <SearchList name={t['permission.list.title']}
                  download={false}
                  upload={false}
                  fetchRemoteData={getPermission}
                  getColumns={columns}
                  select={false}
      />
      {formProps && <DynamicModal
        title={formProps.title}
        visible={visible}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
          setConfirmLoading(false);
        }}
      >
         <DynamicForm
          title={formProps.title}
          formItem={formProps.formItem}
          onSubmit={
            formProps.onSubmit
          }
        />
      </DynamicModal>}
    </div>);
  };

  export default UserPermission;
