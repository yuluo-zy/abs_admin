import React from "react";
import { Card, Divider, Grid, Typography } from "@arco-design/web-react";
import { useSelector } from "react-redux";
import locale from "./locale";
import useLocale from "@/utils/useHook/useLocale";
import styles from "./style/overview.module.less";
import IconTag from "./assets/Tag.svg";
import IconMac from "./assets/mac.svg";
import IconInfo from "./assets/info.svg";
import IconFirmWare from "./assets/firmware.svg";
import IconConfigure from "./assets/configure.svg";

const { Row, Col } = Grid;


function StatisticItem(props) {
  const { icon } = props;
  return <div className={styles.item}>
    <div className={styles.icon}>
      {icon}
    </div>
  </div>;
}

function Overview() {
  const t = useLocale(locale);
  const userInfo = useSelector((state: any) => state.userInfo || {});

  return (
    <Card>
      <Typography.Title heading={5}>
        {t["workplace.welcomeBack"]}
        {userInfo.name}
      </Typography.Title>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<IconTag />}
          />
        </Col>
        <div className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconMac />}
          />
        </Col>
        <div className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconInfo />}
          />
        </Col>
        <div className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconFirmWare />}
          />
        </Col>
        <div className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconConfigure />}
          />
        </Col>
      </Row>
      <br />
      <div className={styles["context"]}>
        <p>kljlkj</p>
      </div>
    </Card>
  );
}

export default Overview;
