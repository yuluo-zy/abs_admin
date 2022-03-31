import useLocale from "@/pages/product/locale/useLocale";
import SearchList from "@/components/Dynamic/List";
import React, { useState } from "react";
import { Typography } from "@arco-design/web-react";
import { getProductionDemand } from "@/api/demand";
import DynamicTag from "@/components/Dynamic/tag";
import { ManageMenuProps, SearchItem } from "@/components/type";
import DemandManageMenu from "@/pages/product/menu";
import Login from "@/pages/login";
import PageLayout from "@/layout";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import lazyload from "@/utils/lazyload";

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
    { name: t['product.manage.operate.not.select'] , onChange: item => {}},
    {name: t['product.manage.tools.add'], onChange: item => {
        history.push(`${path}/demand`)
      }}
  ]
  const selectItem: Array<SearchItem> = [
    {
      name:  t["product.manage.table.fwpn"],
      field: 'fwPn',
      type: 'input',
    },
    {
      name: t["product.manage.table.client.name"],
      field: 'customerName',
      type: 'input',
    },
    {
      name: t["product.manage.table.client.code"],
      field: 'customerCode',
      type: 'input',
    },
  ];

  const mod = import.meta.glob('./demand/index.tsx');
  const productDemand = lazyload(
    mod[`./demand/index.tsx`]
  )

  const history = useHistory();
  const { path } = useRouteMatch();

  return (<div>
    <Switch>
      <Route path={`${path}/demand`} component={productDemand} />
      <Route exact path={path}>
        <SearchList
          name={t["product.manage.title"]}
          download={false}
          upload={false}
          tools={<DemandManageMenu  menu={menu}/>}
          fetchRemoteData={getProductionDemand}
          getColumns={getColumns}
          select={true}
          size={'mini'}
          selectItem={selectItem}
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
      </Route>
    </Switch>
  </div>);
}
