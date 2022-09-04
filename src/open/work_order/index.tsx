import React, { useState } from "react";
import { Button, Grid, Layout, Spin, Table, TableColumnProps } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import { Welcome } from "@/open/work_order/welcome";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { Route } from "react-router";
import WorkOrderAdd from "@/open/work_order/add";
import Announcement from "./announcement";
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
      dataIndex: "status"
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
        <Navbar isLogIn={false} />
      </div>
    <Content className={styles["layout-content"]}>
      <Route
        path={`/open/work_order/add`}
        component={WorkOrderAdd}
      />
      <Route exact path={"/open/work_order"}>
        <Welcome setSelect={setSelect} />
        <Row gutter={24} className={styles["home"]}>
          <Col span={18}>
            <div className={styles["table"]}>
              <Spin loading={loading} style={{ width: "100%" }}>
                <Table columns={columns} data={data} />
              </Spin>
            </div>
          </Col>
          <Col span={6}>
            <Announcement />
          </Col>
        </Row>
      </Route>
      <Footer /><OrderDrawer visible={visible} setVisible={setVisible} data={data} />
    </Content>


  </Layout>;
}

export default WorkOrder;
