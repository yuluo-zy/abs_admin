import React from "react";
import { Grid } from "@arco-design/web-react";
import Overview from "./overview";
import Shortcuts from "./shortcuts";
import Announcement from "./announcement";
import Upcoming from "@/pages/dashboard/workplace/upcoming";
import EspTable from "@/pages/dashboard/workplace/esp-table";
import styles from "./style/index.module.less";

const { Row, Col } = Grid;

const gutter = 16;

function Workplace() {
  return (
    <>
      <Row gutter={24} className={styles["home"]}>
        <Col span={16}>
          <Overview />
        </Col>
        <Col span={8} className={styles["right"]}>
          <Announcement />
          <br />
          <Upcoming />
          <br />
          <Shortcuts />
        </Col>
      </Row>
      <EspTable />
    </>
  );
}

export default Workplace;
