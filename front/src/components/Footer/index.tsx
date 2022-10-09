import React from "react";
import { Layout } from "@arco-design/web-react";
import cs from "classnames";
import styles from "./style/index.module.less";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";

function Footer(props) {
  const { isLink, className, ...restProps } = props;
  const t = useLocale(locale);
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      <div>{t["footer.info"]}</div>
      {/*{isLink && <div>*/}
      {/*  <Space>*/}
      {/*    Related Links:*/}
      {/*    <Divider type="vertical" />*/}
      {/*    <Link to={TicketPath}>{t["product.quality.qervice.work.order"]}</Link>*/}
      {/*    <Divider type="vertical" />*/}
      {/*    /!*<Link to={ProductQualityService}>{t['']}</Link>*!/*/}
      {/*  </Space>*/}
      {/*</div>}*/}


    </Layout.Footer>
  );
}

export default Footer;
