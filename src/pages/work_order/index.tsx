import React, { useRef } from "react";
import SearchList from "@/components/Dynamic/List";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { SearchItem } from "@/components/type";
import { getAfterSaleManage } from "@/api/cqapms";
import { Button, Space, Tag, Tooltip } from "@arco-design/web-react";
import { IconEdit } from "@arco-design/web-react/icon";
import { Route, Switch, useHistory } from "react-router";
import { OrderEdit } from "@/pages/work_order/order_edit";
import { ManagePath, WorkOrderPath } from "@/utils/routingTable";
import shallow from "zustand/shallow";
import { TickerStorage } from "@/store/ticker";

export default function WorkOrderManagement() {
  const t = useLocale(locale);
  const searchListRef = useRef<any>();
  const history = useHistory();
  const [current, setCurrent] = TickerStorage(state => [state.current, state.setCurrent], shallow);

  const orderStatus = [{
    label: t["work.order.operate.order.a"],
    value: 0
  }, {
    label: t["work.order.operate.order.b"],
    value: 10
  }, {
    label: t["work.order.operate.order.d"],
    value: 12
  },
    {
      label: t["work.order.operate.order.e"],
      value: 15
    }, {
      label: t["work.order.operate.order.c"],
      value: 20
    }];
  const getOrderStatus = (value) => {
    switch (value) {
      case 0:
        return <Tag color={"red"}>{orderStatus[0].label}</Tag>;
      case 10:
        return <Tag color={"green"}>{orderStatus[1].label}</Tag>;
      case 12:
        return <Tag color={"cyan"}>{orderStatus[2].label}</Tag>;
      case 15:
        return <Tag color={"blue"}>{orderStatus[3].label}</Tag>;
      case 20:
        return <Tag color={"gray"}>{orderStatus[4].label}</Tag>;
    }
  };
  const getColumns = (callback: () => void) => {
    return [
      {
        title: t["workplace.table.number"],
        dataIndex: "afterSaleOrderNo"
      },
      {
        title: t["workplace.add.custom.module"],
        dataIndex: "productType"
      },
      {
        title: t["workplace.add.custom.espressif"],
        dataIndex: "espBusinessName"
      },
      {
        title: t["workplace.ticket.submitter.name"],
        dataIndex: "customerName"
      },
      {
        title: t["workplace.ticket.submitter.company"],
        dataIndex: "customerCompanyName"
      },
      {
        title: t["workplace.table.status"],
        dataIndex: "status",
        render: (col) => {
          return getOrderStatus(col);
        }
      },
      {
        title: t["workplace.table.date"],
        dataIndex: "created"
      },
      {
        title: t["work.order.operate"],
        dataIndex: "operations",
        render: (_, record) => (
          <Space>
            {/*<Popconfirm*/}
            {/*  title={t["work.order.operate.accept"]}*/}
            {/*  onOk={() => {*/}
            {/*    postAfterSaleReceive({*/}
            {/*      id: record.id*/}
            {/*    }).then(res => {*/}
            {/*      if (res.data.success) {*/}
            {/*        callback();*/}
            {/*        Message.success("Successful operation");*/}
            {/*      }*/}
            {/*    });*/}

            {/*  }}*/}
            {/*>*/}
            {/*  <Button icon={<IconCheckCircle />} />*/}
            {/*</Popconfirm>*/}
            {/*<Popconfirm*/}
            {/*  title={t["work.order.operate.complete"]}*/}
            {/*  onOk={() => {*/}
            {/*    postAfterSaleComplete({*/}
            {/*      id: record.id*/}
            {/*    }).then(res => {*/}
            {/*      if (res.data.success) {*/}
            {/*        callback();*/}
            {/*        Message.success("Successful operation");*/}
            {/*      }*/}
            {/*    });*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Button icon={<IconCheck />} />*/}
            {/*</Popconfirm>*/}
            <Tooltip content={t["work.order.operate.edit"]}>
              <Button icon={<IconEdit />} onClick={() => {
                history.push(`${ManagePath}${WorkOrderPath}/${record.id}`);

              }} />
            </Tooltip>
          </Space>
        )
      }
    ];
  };

  const selectItem: Array<SearchItem> = [
    {
      name: "key",
      field: "id",
      type: "input"
    },
    {
      name: t["workplace.table.number"],
      field: "afterSaleOrderNo",
      type: "input"
    },
    {
      name: t["workplace.table.status"],
      field: "status",
      type: "select",
      options: orderStatus
    },
    {
      name: t["workplace.ticket.submitter.name"],
      field: "customerName",
      type: "input"
    },
    {
      name: t["workplace.ticket.submitter.company"],
      field: "customerCompanyName",
      type: "input"
    },
    {
      name: t["workplace.ticket.submitter.date"],
      field: "customerDate",
      type: "date"
    }
  ];
  return <Switch>
    <Route
      path={`${ManagePath}${WorkOrderPath}/:id`}
      component={OrderEdit}
    />

    <Route exact path={`${ManagePath}${WorkOrderPath}`}>
      <SearchList
        name={t["work.order.title"]}
        download={false}
        upload={false}
        ref={searchListRef}
        current={current}
        setCurrent={setCurrent}
        fetchRemoteData={getAfterSaleManage}
        getColumns={getColumns}
        select={true}
        selectItem={selectItem}
      />
    </Route>
  </Switch>;
};
