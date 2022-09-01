import React from "react";
import { Grid, Layout, Table, TableColumnProps } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import Navbar from "@/components/NavBar";
import { Welcome } from "@/open/work_order/welcome";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { Route } from "react-router";
import WorkOrderAdd from "@/open/work_order/add";
import Announcement from "./announcement";

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const { Row, Col } = Grid;

const columns: TableColumnProps[] = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Salary",
    dataIndex: "salary"
  },
  {
    title: "Address",
    dataIndex: "address"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];
const data = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com"
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com"
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com"
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com"
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com"
  }
];

function WorkOrder() {

  const t = useLocale(locale);
  return <Layout className={styles["layout"]}>
    <Header>
      <div
        className={styles["layout-navbar"]}
      >
        <Navbar isLogIn={false} />
      </div>
    </Header>
    <Content className={styles["layout-content"]}>
      <Route
        path={`/open/work_order/add`}
        component={WorkOrderAdd}
      />
      <Route exact path={"/open/work_order"}>
        <Welcome />
        <Row gutter={24} className={styles["home"]}>
          <Col span={18}>
            <Table columns={columns} data={data} />
          </Col>
          <Col span={6}>
            <Announcement />
          </Col>
        </Row>
      </Route>
    </Content>
    <Footer>Footer</Footer>
  </Layout>;
}

export default WorkOrder;
