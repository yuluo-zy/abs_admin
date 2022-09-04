import React from "react";
import { Layout } from "@arco-design/web-react";
import { FooterProps } from "@arco-design/web-react/es/Layout/interface";
import cs from "classnames";
import styles from "./style/index.module.less";

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props;
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      ESPRESSIF @2022 乐鑫信息科技（上海）股份有限公司
    </Layout.Footer>
  );
}

export default Footer;
