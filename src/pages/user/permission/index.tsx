import React, { useRef, useState } from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/permission/locale';
import {
  deletePermission,
  getPermission,
  postPermission,
  putPermission,
} from '@/api/permission';
import SearchList from '@/components/Dynamic/List';
import {
  Badge,
  Button,
  Dropdown,
  Menu,
  Message,
  Popconfirm,
} from '@arco-design/web-react';
import { FormItemProps } from '@/components/type';
import DynamicModal from '@/components/Dynamic/Modal';
import DynamicForm from '@/components/Dynamic/Form';
import { IconDelete } from '@arco-design/web-react/icon';

function UserPermission() {
  const t = useLocale(locale);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formProps, setFormProps] = useState(null);
  const permission = useRef(null);
  const [updateInfo, setUpdateInfo] = useState(null);

  const permissionProps: Array<FormItemProps> = [
    {
      label: t['permission.list.name'],
      type: 'input',
      field: 'name',
      required: true,
      rules: [
        {
          required: true,
          message: t['permission.list.operate.error'],
          minLength: 2,
        },
      ],
    },
    {
      label: t['permission.list.type'],
      type: 'select',
      field: 'type',
      required: true,
      options: [
        { label: t['permission.list.type.menu'], value: 1 },
        { label: t['permission.list.type.button'], value: 2 },
      ],
      rules: [
        {
          required: true,
          message: t['permission.list.operate.error'],
          minLength: 2,
        },
      ],
    },
    {
      label: t['permission.list.mark'],
      type: 'input',
      field: 'permission',
      required: true,
      rules: [
        {
          required: true,
          message: t['permission.list.operate.error'],
          minLength: 2,
        },
      ],
    },
    {
      label: t['permission.list.icon'],
      type: 'input',
      field: 'icon',
      required: true,
      rules: [
        {
          required: true,
          message: t['permission.list.operate.error'],
          minLength: 2,
        },
      ],
    },
    {
      label: t['permission.list.sort'],
      type: 'number',
      field: 'sort',
      required: true,
      rules: [
        {
          required: true,
          type: 'number',
          message: t['permission.list.operate.error'],
          min: 0,
        },
      ],
    },
  ];

  const colseMode = (update) => {
    setVisible(false);
    setConfirmLoading(false);
    if (update) {
      setUpdateInfo(update);
    }
  };

  const update = (type: 'UpdateSelf' | 'SameLevel' | 'LowerLevel', record) => {
    permission.current = { ...record };
    let newNode = null;
    switch (type) {
      case 'UpdateSelf':
        newNode = {
          title: t['permission.list.title.update'],
          formItem: permissionProps,
          data: permission.current,
          onSubmit: async (value) => {
            value['id'] = permission.current.id;
            await putPermission(value).then((res) => {
              if (res.data.success === true) {
                Message.success(t['permission.list.operate.success']);
              }
            });
            colseMode(value);
          },
        };
        break;
      case 'SameLevel':
        newNode = {
          title: t['permission.list.operate.same.level'],
          formItem: permissionProps,
          onSubmit: async (value) => {
            value['parentId'] = permission.current.parentId;
            await postPermission(value).then((res) => {
              if (res.data.success === true) {
                Message.success(t['permission.list.operate.success']);
              }
            });
            colseMode(value);
          },
        };
        break;
      case 'LowerLevel':
        newNode = {
          title: t['permission.list.operate.next.level'],
          formItem: permissionProps,
          onSubmit: async (value) => {
            value['parentId'] = permission.current.id;
            await postPermission(value).then((res) => {
              if (res.data.success === true) {
                Message.success(t['permission.list.operate.success']);
              }
            });
            colseMode(value);
          },
        };
        break;
    }
    setFormProps(newNode);
    setVisible(true);
  };

  const columns = () => {
    return [
      {
        title: t['permission.list.name'],
        dataIndex: 'name',
        render: (value) => <div>{value}</div>,
        width: 70,
      },
      {
        title: t['permission.list.type'],
        dataIndex: 'typeName',
        render: (value, record) => (
          <div>
            {record.type == 1 ? (
              <Badge
                color="arcoblue"
                style={{ marginRight: 10 }}
                text={value}
              />
            ) : (
              <Badge color="lime" style={{ marginRight: 10 }} text={value} />
            )}
          </div>
        ),
        width: 70,
      },
      {
        title: t['permission.list.mark'],
        dataIndex: 'permission',
        render: (value) => <div>{value}</div>,
        width: 70,
      },
      {
        title: t['permission.list.icon'],
        dataIndex: 'icon',
        render: (value) => <div>{value}</div>,
        width: 70,
      },
      {
        title: t['permission.list.sort'],
        dataIndex: 'sort',
        render: (value) => <div>{value}</div>,
        width: 70,
      },
      {
        title: t['permission.list.operate'],
        dataIndex: 'id',
        render: (_, record) => (
          <div>
            <Dropdown.Button
              type="primary"
              droplist={
                <Menu>
                  <Menu.Item
                    key="1"
                    onClick={() => update('SameLevel', record)}
                  >
                    {t['permission.list.operate.same.level']}
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    onClick={() => update('LowerLevel', record)}
                  >
                    {t['permission.list.operate.next.level']}
                  </Menu.Item>
                </Menu>
              }
              onClick={() => update('UpdateSelf', record)}
            >
              {t['permission.list.operate.edit']}
            </Dropdown.Button>
            <Popconfirm
              title={t['permission.list.operate.delete']}
              onOk={() => {
                deletePermission(record.id).then((res) => {
                  if (res.data.success === true) {
                    Message.info({ content: 'ok' });
                  }
                });
              }}
            >
              <Button icon={<IconDelete />} style={{ marginLeft: 14 }} />
            </Popconfirm>
          </div>
        ),
        width: 70,
      },
    ];
  };

  return (
    <div>
      <SearchList
        name={t['permission.list.title']}
        download={false}
        upload={false}
        fetchRemoteData={getPermission}
        getColumns={columns}
        select={false}
        onChange={updateInfo}
      />
      {
        <DynamicModal
          title={formProps?.title}
          visible={visible}
          footer={null}
          confirmLoading={confirmLoading}
          onCancel={() => {
            setVisible(false);
            setConfirmLoading(false);
          }}
        >
          {formProps && <DynamicForm key={formProps.title} {...formProps} />}
        </DynamicModal>
      }
    </div>
  );
}

export default UserPermission;
