import useLocale from "@/pages/product/locale/useLocale";
import SearchList from "@/components/Dynamic/List";
import React, { useState } from "react";
import styles from "@/pages/user/manage/style/index.module.less";
import { Badge, Button, Message, Popconfirm, Space, Typography } from "@arco-design/web-react";
import { IconDelete, IconEdit, IconLock, IconUser } from "@arco-design/web-react/icon";
import { putUserLock, removeUser } from "@/api/user";
import { getProductionDemand } from "@/api/demand";
import DynamicTag from "@/components/Dynamic/tag";
import { ManageMenuProps } from "@/components/type";
import DemandManageMenu from "@/pages/product/menu";

const { Text } = Typography;

export default function DemandManage() {
  const t = useLocale();
  const getColumns = (callback: () => void) => {
    return [
      {
        title: t["product.manage.table.fwpn"],
        dataIndex: "fwPn",
        width: 150,
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.name"],
        dataIndex: "customerName",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["roduct.manage.table.client.code"],
        dataIndex: "customerCode",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.project"],
        dataIndex: "customerProject",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.model"],
        dataIndex: "adaptModuleType",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.firmware"],
        dataIndex: "customFirmware",
        render: (value) => <DynamicTag value={value}/>
      },
      {
        title: t["product.manage.table.client.firmware.type"],
        dataIndex: "firmwareType",
        render: (value) =><DynamicTag value={value}/>
      },
      {
        title: t["product.manage.table.client.mac"],
        dataIndex: "customMac",
        render: (value) => <DynamicTag value={value}/>
      },
      {
        title: t["product.manage.table.client.firmware.context"],
        dataIndex: "customContentBurn",
        render: (value) => <DynamicTag value={value}/>
      },
      {
        title: t["product.manage.table.client.efuse"],
        dataIndex: "customEfuse",
        render: (value) => <DynamicTag value={value}/>
      },
      {
        title: t["product.manage.table.client.label"],
        dataIndex: "customLabel",
        render: (value) => <DynamicTag value={value}/>
      },
      {
        title: t["product.manage.table.client.history.fwpn"],
        dataIndex: "historyFwPn",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.change.project"],
        dataIndex: "changeProject",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.principal"],
        dataIndex: "bsHead",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.status"],
        dataIndex: "status",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.status.principal"],
        dataIndex: "handler",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.node"],
        dataIndex: "",
        render: (value) => <Text>{value}</Text>
      },
      {
        title: t["product.manage.table.client.status.history"],
        dataIndex: "",
        render: (value) => <Text>{value}</Text>
      }
    ];
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const menu: Array<ManageMenuProps> = [
    { name: t['product.manage.operate.select'] , onChange: item => {}},
    { name: t['product.manage.operate.not.select'] , onChange: item => {}}
  ]

  return (<div>
    <Space><DemandManageMenu  menu={menu}/></Space>
    <SearchList
      name={t["product.manage.title"]}
      download={false}
      upload={false}
      fetchRemoteData={getProductionDemand}
      getColumns={getColumns}
      select={false}
      size={'mini'}
      rowSelection={{
        type: 'checkbox',
        checkAll: true,
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('onChange:', selectedRowKeys, selectedRows);
          setSelectedRowKeys(selectedRowKeys);
        },
        onSelect: (selected, record, selectedRows) => {
          console.log('onSelect:', selected, record, selectedRows)
        }
      }}
    />
  </div>);
}
