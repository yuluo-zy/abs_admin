import React, { useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import SearchList from '@/components/Dynamic/List';
import { addUser, getUserList, putUserLock, removeUser } from '@/api/user';
import styles from '@/components/Dynamic/List/style/index.module.less';
import { Badge, Button, Message, Popconfirm, Typography } from '@arco-design/web-react';
import { CallBackHandle, FormItemProps, SearchItem } from '@/components/type';
import { IconDelete, IconEdit, IconLock } from '@arco-design/web-react/icon';
import DynamicModal from '@/components/Dynamic/Modal';
import DynamicForm from '@/components/Dynamic/Form';


function UserManage() {
  const { Text } = Typography;
  const t = useLocale(locale);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getColumns = (callback: () => void) => {
    return [
      {
        title: t['userTable.columns.id'],
        dataIndex: 'id',
        render: (value) => <Text>{value}</Text>,
        width: 70
      },
      {
        title: t['userTable.columns.name'],
        dataIndex: 'username',
        render: (value) => <Text copyable>{value}</Text>,
        width: 200
      },
      {
        title: t['userTable.columns.roleList'],
        dataIndex: 'contentType',
        width: 220,
        render: (value) => (
          <div className={styles['content-type']}>
            <p>{value}</p>
          </div>
        )
      },
      {
        title: t['userTable.columns.lock'],
        dataIndex: 'locked',
        width: 100,
        render: (x) => {
          if (x === 1) {
            return <Badge status='error' text={t['userTable.columns.locked']} />;
          }
          return <Badge status='success' text={t['userTable.columns.unlock']} />;
        }
      },
      {
        title: t['searchTable.columns.operations'],
        dataIndex: 'operations',
        width: 100,
        headerCellStyle: { paddingLeft: '15px' },
        render: (_, record) => (
          <>
            <div className={styles['content-button']}>
              <Button
                icon={<IconEdit />}
                onClick={() => {
                  setVisible(!visible);
                }}>
              </Button>

              <Popconfirm
                title={t['userTable.columns.user.operation.lock']}
                onOk={() => {
                  putUserLock(record.id, { locked: record.locked === 0 ? 1 : 0 }).then(res => {
                    if (res.data.success === true) {
                      callback();
                      Message.info({ content: 'ok' });
                    }
                  });
                }}>
                <Button icon={<IconLock />} />
              </Popconfirm>

              <Popconfirm
                title={t['userTable.columns.user.operation.delete']}
                onOk={() => {
                  removeUser({ ids: [record.id] }).then(res => {
                    if (res.data.success === true) {
                      callback();
                      Message.info({ content: 'ok' });
                    }
                  });
                }}
              >
                <Button icon={<IconDelete />} />
              </Popconfirm>
            </div>
          </>
        )
      }
    ];
  };


  // 用来创建 增加 用户的表单
  const createUserItem: Array<FormItemProps> = [
    {
      label: t['userTable.columns.user.name'],
      type: 'input',
      field: 'username',
      required: true,
      rules: [{ required: true, message: t['userTable.columns.user.name.error'], minLength: 2 }]
    },
    {
      label: t['userTable.columns.user.password'],
      field: 'password',
      type: 'input',
      required: true,
      rules: [{ required: true, message: t['userTable.columns.user.password.error'], minLength: 8 }]
    },
    {
      label: t['userTable.columns.user.role'],
      field: 'roleIdList',
      type: 'multiple',
      rules: [
        {
          type: 'array',
          minLength: 1,
          message: t['userTable.columns.user.role.error']
        }
      ],
      required: true,
      options: ['1', '2', '3', '4', '5']
    }

  ];
  const createUser = (props: CallBackHandle) => {
    return (
      <DynamicForm formItem={createUserItem}
                   onSubmit={
                     (async value => {
                       await addUser(value).then(res => {
                         if (res.data.success === true) {
                           Message.success(t['userTable.columns.user.operation.success']);
                           props.confirmCallback();
                         }
                       });
                     })
                   }
      />
    );
  };

  const selectItem: Array<SearchItem> = [{
    name: t['userTable.columns.id'],
    field: 'id',
    type: 'input'
  },
    {
      name: t['userTable.columns.name'],
      field: 'username',
      type: 'input'
    },
    {
      name: t['userTable.columns.lock'],
      field: 'locked',
      type: 'select',
      options: [t['userTable.columns.unlock'], t['userTable.columns.locked']]
    }
  ];


  return (
    <div>
      <SearchList name={t['manage.list.name']}
                  add={createUser}
                  addName={t['userTable.columns.operations.add']}
                  download={false}
                  upload={false}
                  fetchRemoteData={getUserList}
                  getColumns={getColumns}
                  select={true}
                  selectItem={selectItem}
      />
      <DynamicModal
        title={t['userTable.columns.operations.edit']}
        visible={visible}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
          setConfirmLoading(false);
        }}
      >
        {createUser({
          confirmCallback: () => {
            setVisible(false);
            setConfirmLoading(false);
          }
        })}
      </DynamicModal>
    </div>
  );
}

export default UserManage;
