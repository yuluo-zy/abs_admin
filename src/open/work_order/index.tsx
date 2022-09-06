import React, { useState } from "react";
import { Button, Grid, Layout, Spin, Table, TableColumnProps, Tag } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import { Welcome } from "@/open/work_order/welcome";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { Route } from "react-router";
import WorkOrderAdd from "@/open/work_order/add";
import { useUpdateEffect } from "react-use";
import { getAfterSale } from "@/api/cqapms";
import Footer from "@/components/Footer";
import { OrderDrawer } from "@/open/work_order/order-drawer";
import Navbar from "@/components/NavBar";
import { IconDoubleRight } from "@arco-design/web-react/icon";

const Content = Layout.Content;

const { Row, Col } = Grid;


function WorkOrder() {

  const t = useLocale(locale);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(null);
  const [visible, setVisible] = useState(null);
  useUpdateEffect(() => {
    if (select) {
      setData([]);
      setLoading(true);
      getAfterSale(select).then(res => {
        if (res.data.success && res.data.result) {
          setData([res.data.result]);
        }
      })
        .finally(() => {
          setLoading(false);
        });
    }

  }, [select]);
  const orderStatus = [{
    label: t["work.order.operate.order.a"],
    value: 0
  }, {
    label: t["work.order.operate.order.b"],
    value: 10
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
      case 20:
        return <Tag color={"gray"}>{orderStatus[2].label}</Tag>;
    }
  };
  const columns: TableColumnProps[] = [
    {
      title: t["workplace.table.number"],
      dataIndex: "afterSaleOrderNo",
      render: (col) => {
        return <Button icon={<IconDoubleRight />} type={"outline"} onClick={() => {
          setVisible(true);
        }
        }>{col}</Button>;
      }

    },
    {
      title: t["workplace.add.custom.module"],
      dataIndex: "productType"
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
    }
  ];

  return <Layout className={styles["layout"]}>
    <div
      className={styles["layout-navbar"]}
    >
      <Navbar isLogIn={false} title={"ESPRESSIF"} />
    </div>
    <Content className={styles["layout-content"]}>
      <Route
        path={`/open/work_order/add`}
        component={WorkOrderAdd}
      />
      <Route exact path={"/open/work_order"}>
        <Welcome setSelect={setSelect} />
        {/*<Row gutter={24} className={styles["home"]}>*/}
        {/*  <Col span={18}>*/}
        <div className={styles["table"]}>
          <Spin loading={loading} style={{ width: "100%" }}>
            <Table columns={columns} data={data} />
          </Spin>
        </div>
        {/*</Col>*/}
        {/*<Col span={6}>*/}
        {/*  <Announcement />*/}
        {/*</Col>*/}
        {/*</Row>*/}
      </Route>
      <Footer /><OrderDrawer visible={visible} setVisible={setVisible} data={data} />
    </Content>


  </Layout>;
}

export default WorkOrder;
