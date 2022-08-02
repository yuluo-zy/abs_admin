import React from "react";
import { Grid, Space } from "@arco-design/web-react";
import Overview from "./overview";
import Shortcuts from "./shortcuts";
import Announcement from "./announcement";
import Upcoming from "@/pages/dashboard/workplace/upcoming";
import styles from "./style/index.module.less";

const { Row, Col } = Grid;

const gutter = 16;

function Workplace() {
  return (
    <Row gutter={24} className={styles["home"]}>
      <Col flex={"auto"}>
        <Overview />
      </Col>
      <Col flex={"380px"}>
        <Space size={"large"} direction={"vertical"} className={styles["right"]}>
          {/*// 公告*/}
          <Announcement />
          {/*待办中心*/}
          <Upcoming />
          <Shortcuts />
        </Space>
      </Col>
    </Row>
  );
}

export default Workplace;
