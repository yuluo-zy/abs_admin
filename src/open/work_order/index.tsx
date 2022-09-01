import React from "react";
import { Layout } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import Navbar from "@/components/NavBar";
import { Welcome } from "@/open/work_order/welcome";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";

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
      <Welcome />
      <p>{t[""]}</p>
    </Content>
    <Footer>Footer</Footer>
  </Layout>;
}

export default WorkOrder;
