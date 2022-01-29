import React from 'react';
import useLocale from '@/utils/useLocale';
import locale from '@/pages/user/permission/locale';
import { getPermission } from '@/api/permission';
import SearchList from '@/components/List';
import { Badge, Dropdown, Menu } from '@arco-design/web-react';


function UserPermission() {


  const t = useLocale(locale);

  const dropList = (
    <Menu>
      <Menu.Item key='1'>{t['permission.list.operate.same.level']}</Menu.Item>
      <Menu.Item key='2'>{t['permission.list.operate.next.level']}</Menu.Item>
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
              droplist={dropList}>
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
  </div>);
}

export default UserPermission;
