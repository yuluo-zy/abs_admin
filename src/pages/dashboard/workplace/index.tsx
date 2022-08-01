import React from "react";
import { Grid, Space } from "@arco-design/web-react";
import Overview from "./overview";
import PopularContents from "./popular-contents";
import ContentPercentage from "./content-percentage";
import Shortcuts from "./shortcuts";
import Announcement from "./announcement";
import styles from "./style/index.module.less";
import Upcoming from "@/pages/dashboard/workplace/upcoming";

const { Row, Col } = Grid;

const gutter = 16;

function Workplace() {
  return (
    <Space size={16} align="start">
      <Space size={16} direction="vertical">
        <Overview />
        <Row gutter={gutter}>
          <Col span={12}>
            <PopularContents />
          </Col>
          <Col span={12}>
            <ContentPercentage />
          </Col>
        </Row>
      </Space>
      <Space className={styles.right} size={16} direction="vertical">
        {/*// 公告*/}
        <Announcement />
        {/*待办中心*/}
        <Upcoming />
        <Shortcuts />
      </Space>
    </Space>
  );
}

export default Workplace;
