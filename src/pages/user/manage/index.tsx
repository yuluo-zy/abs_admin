import React, { useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import SearchList from '@/components/List';
import { addUser, getUserList, putUserLock, removeUser } from '@/api/user';
import styles from '@/components/List/style/index.module.less';
import { Badge, Button, Form, Input, Message, Modal, Popconfirm, Select, Typography } from '@arco-design/web-react';
import { CallBackHandle, SearchItem } from '@/components/type';
import { IconDelete, IconEdit, IconLock } from '@arco-design/web-react/icon';


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

  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 17
    }
  };
  const noLabelLayout = {
    wrapperCol: {
      span: 17,
      offset: 7
    }
  };
  const createUser = (props: CallBackHandle) => {
    return (
      <div style={{
        paddingRight: '2rem'
      }}
      >
        <Form
          {...formItemLayout}
          scrollToFirstError
          form={form}
        >

          <FormItem
            label={t['userTable.columns.user.name']}
            field='username'
            rules={[{ required: true, message: t['userTable.columns.user.name.error'], minLength: 2 }]}
          >
            <Input placeholder='please enter...' />
          </FormItem>
          <FormItem
            label={t['userTable.columns.user.password']}
            field='password'
            rules={[{ required: true, message: t['userTable.columns.user.password.error'], minLength: 8 }]}
          >
            <Input type='password' placeholder='please enter...' />
          </FormItem>

          <FormItem
            label={t['userTable.columns.user.role']}
            required
            field='roleIdList'
            rules={[
              {
                type: 'array',
                minLength: 1,
                message: t['userTable.columns.user.role.error']
              }
            ]}
          >
            <Select mode='multiple' allowCreate placeholder='please select' options={['1', '2', '3', '4', '5']} />
          </FormItem>

          <FormItem {...noLabelLayout}>
            <Button
              onClick={async () => {
                await form.validate();
                await addUser(form.getFieldsValue()).then(res => {
                    if (res.data.success === true) {
                      Message.success(t['userTable.columns.user.operation.success']);
                      form.resetFields();
                      props.confirmCallback();
                    }
                  }
                );
              }}
              type='primary'
              style={{ marginRight: 24 }}
            >
              {t['userTable.columns.user.operation.submit']}
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              {t['userTable.columns.user.operation.reset']}
            </Button>
          </FormItem>
        </Form>
      </div>
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
                  addCancel={() => {
                    form.resetFields();
                  }}
                  download={false}
                  upload={false}
                  fetchRemoteData={getUserList}
                  getColumns={getColumns}
                  select={true}
                  selectItem={selectItem}
      />
      <Modal
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
      </Modal>
    </div>
  );
}

export default UserManage;
