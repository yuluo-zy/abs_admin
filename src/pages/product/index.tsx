import useLocale from "@/pages/product/locale/useLocale";
import SearchList from "@/components/Dynamic/List";
import React, { useState } from "react";
import { Link, Message, Modal, Typography } from "@arco-design/web-react";
import { getProductionDemand, postProductionDemand } from "@/api/demand";
import DynamicTag from "@/components/Dynamic/tag";
import { ManageMenuProps, SearchItem } from "@/components/type";
import DemandManageMenu from "@/pages/product/menu";
import { Route, Switch, useHistory } from "react-router";
import lazyload from "@/utils/lazyload";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import styles from "./style/index.module.less";
import { usePermissionWrapper } from "@/components/PermissionWrapper/tools";
import { CUSTOM_CODE_PERMISSION, CUSTOM_NAME_PERMISSION, CUSTOM_PROJECT_PERMISSION } from "@/utils/staticVariable";

const { Text } = Typography;

export default function DemandManage() {
  const t = useLocale();
  const mod = import.meta.glob("./**/index.tsx");
  const productDemand = lazyload(
    mod[`./demand/index.tsx`]
  );
  const productSummarize = lazyload(mod["./summarize/index.tsx"]);
  const history = useHistory();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [setDemandId, reset] = ProductStore(state => [state.setDemandId, state.reset], shallow);

  const menu: Array<ManageMenuProps> = [
    {
      name: t["product.manage.operate.select"], onChange: item => {
      }
    },
    {
      name: t["product.manage.operate.not.select"], onChange: item => {
      }
    },
    {
      name: t["product.manage.tools.add"], onChange: () => {
        addDemandConfirm();
      }
    }
  ];
  const toRequirementsOverview = (demandId) => {
    reset();
    ProductStore.persist.clearStorage();
    setDemandId(demandId);
    history.push(`/product/summarize`);
  };
  const selectItem: Array<SearchItem> = [
    {
      name: t["product.manage.table.fwpn"],
      field: "fwPn",
      type: "input"
    },
    {
      name: t["product.manage.table.client.name"],
      field: "customerName",
      type: "input"
    },
    {
      name: t["product.manage.table.client.code"],
      field: "customerCode",
      type: "input"
    }
  ];

  // 定义权限判断函数
  const namePermission = usePermissionWrapper({ requiredPermissions: [{ resource: CUSTOM_NAME_PERMISSION }] });
  const codePermission = usePermissionWrapper({ requiredPermissions: [{ resource: CUSTOM_CODE_PERMISSION }] });
  const projectPermission = usePermissionWrapper({ requiredPermissions: [{ resource: CUSTOM_PROJECT_PERMISSION }] });
  const getColumns = () => {
    const temp = [
      {
        title: t["product.manage.table.fwpn"],
        dataIndex: "fwPn",
        width: 150,
        fixed: "left",
        render: (col, record, index) => <div onClick={() => {
          toRequirementsOverview(record?.id);
        }}><Link className={styles["link"]}> {record?.fwPn} </Link></div>
      },

      {
        title: t["product.manage.table.client.model"],
        dataIndex: "adaptModuleType",
        render: (value) => <Text>{value}</Text>,
        width: 200
      },
      {
        title: t["product.manage.table.client.firmware"],
        dataIndex: "customFirmware",
        render: (value) => <DynamicTag value={value} />,
        width: 100
      },
      {
        title: t["product.manage.table.client.firmware.type"],
        dataIndex: "firmwareType",
        render: (value) => <DynamicTag value={value} />,
        width: 100
      },
      {
        title: t["product.manage.table.client.mac"],
        dataIndex: "customMac",
        render: (value) => <DynamicTag value={value} />,
        width: 100
      },
      {
        title: t["product.manage.table.client.firmware.context"],
        dataIndex: "customContentBurn",
        render: (value) => <DynamicTag value={value} />,
        width: 100
      },
      {
        title: t["product.manage.table.client.efuse"],
        dataIndex: "customEfuse",
        render: (value) => <DynamicTag value={value} />,
        width: 100
      },
      {
        title: t["product.manage.table.client.label"],
        dataIndex: "customLabel",
        render: (value) => <DynamicTag value={value} />,
        width: 100
      },
      {
        title: t["product.manage.table.client.history.fwpn"],
        dataIndex: "historyFwPn",
        render: (value) => <Text>{value}</Text>,
        width: 150
      },
      {
        title: t["product.manage.table.client.change.project"],
        dataIndex: "changeProject",
        render: (value) => <Text>{value}</Text>,
        width: 150
      },
      {
        title: t["product.manage.table.client.principal"],
        dataIndex: "bsHead",
        render: (value) => <Text>{value}</Text>,
        width: 100
      },
      {
        title: t["product.manage.table.client.status"],
        dataIndex: "status",
        render: (value) => <Text>{value}</Text>,
        width: 100
      },
      {
        title: t["product.manage.table.client.status.principal"],
        dataIndex: "handler",
        render: (value) => <Text>{value}</Text>,
        width: 100
      }
      // {
      //   title: t["product.manage.table.client.node"],
      //   dataIndex: "",
      //   render: (value) => <Text>{value}</Text>,
      //   width: 200,
      // },
      // {
      //   title: t["product.manage.table.client.status.history"],
      //   dataIndex: "",
      //   render: (value) => <Text>{value}</Text>,
      //   width: 200,
      // }
    ];
    if (projectPermission()) {
      temp.splice(1, 0, {
        title: t["product.manage.table.client.project"],
        dataIndex: "customerProject",
        render: (value) => <Text>{value}</Text>,
        width: 150
      });
    }
    if (codePermission()) {
      temp.splice(1, 0, {
        title: t["product.manage.table.client.code"],
        dataIndex: "customerCode",
        render: (value) => <Text>{value}</Text>,
        width: 100
      });
    }
    if (namePermission()) {
      temp.splice(1, 0, {
        title: t["product.manage.table.client.name"],
        dataIndex: "customerName",
        render: (value) => <Text>{value}</Text>,
        width: 150
      });
    }
    return temp;
  };

  function addDemandConfirm() {
    Modal.confirm({
      title: "Tips",
      content: t["product.manage.tools.add.message"],
      okButtonProps: { status: "danger" },
      onOk: () => {
        // 清空
        reset();
        ProductStore.persist.clearStorage();
        postProductionDemand().then(res => {
            Message.success(t["product.manage.tools.add.message.ok"]);
            setDemandId(res.data.result);
            history.push(`/product/demand`);
          }
        ).catch(err =>
          Message.error(err)
        );
      }
    });
  }

  return (
    <Switch>
      <Route path={`/product/demand`} component={productDemand} />
      <Route path={`/product/summarize`} component={productSummarize} />
      <Route exact path={"/product"}>
        <SearchList
          name={t["product.manage.title"]}
          download={false}
          upload={false}
          tools={<DemandManageMenu menu={menu} />}
          fetchRemoteData={getProductionDemand}
          getColumns={getColumns}
          select={true}
          // size={"mini"}
          // tableClassName={styles['table']}
          selectItem={selectItem}
          rowSelection={{
            type: "checkbox",
            checkAll: true,
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
            }
          }}
        />
      </Route>
    </Switch>);
}
