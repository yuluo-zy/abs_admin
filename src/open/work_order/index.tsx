import React from "react";
import { Layout } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import Navbar from "@/components/NavBar";
import { Welcome } from "@/open/work_order/welcome";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { Route } from "react-router";
import WorkOrderAdd from "@/open/work_order/add";

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

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
      </Route>
    </Content>
    <Footer>Footer</Footer>
  </Layout>;
}

export default WorkOrder;
