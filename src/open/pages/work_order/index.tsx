import React from "react";
import styles from "./style/index.module.less";
import Announcement from "@/pages/dashboard/workplace/announcement";
import { Grid } from "@arco-design/web-react";
import { Welcome } from "@/open/pages/work_order/welcome";

const { Row, Col } = Grid;

function WorkOrder() {
  return <>  <Row gutter={24} className={styles["home"]}>
    <Col span={16}>
      <Welcome />
    </Col>
    <Col span={8} className={styles["right"]}>
      <Announcement />
    </Col>
  </Row></>;
}

export default WorkOrder;
