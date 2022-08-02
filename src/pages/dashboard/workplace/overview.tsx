import React, { ReactNode, useState } from "react";
import { Card, Divider, Grid, Typography } from "@arco-design/web-react";
import { useSelector } from "react-redux";
import locale from "./locale";
import useLocale from "@/utils/useHook/useLocale";
import styles from "./style/overview.module.less";
import IconTagBack from "./assets/icon_11.svg";
import IconTagHover from "./assets/icon_12.svg";

const { Row, Col } = Grid;
type StatisticItemType = {
  icon?: ReactNode;
  hoverIcon?: ReactNode;
};


function StatisticItem(props: StatisticItemType) {
  const { icon, hoverIcon } = props;
  const [currentCard, setCurrentCard] = useState(false);
  const img = (hover) => {
    if (hover) {
      return hoverIcon;
    }
    return icon;
  };
  return <div className={styles.item}
              onMouseLeave={() => setCurrentCard(false)}
              onMouseEnter={() => setCurrentCard(true)}
              style={{
                margin: "2rem  0.5rem 0.5rem",
                padding: "5px"
              }}
  >
    <div className={styles.icon}>{img(currentCard)}</div>
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
            icon={<IconTagBack />}
            hoverIcon={<IconTagHover />}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        {/*<Col flex={1}>*/}
        {/*  <StatisticItem*/}
        {/*    // icon={<IconJiSuan />}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Divider type="vertical" className={styles.divider} />*/}
        {/*<Col flex={1}>*/}
        {/*  <StatisticItem*/}
        {/*    // icon={<IconWu />}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Divider type="vertical" className={styles.divider} />*/}
        {/*<Col flex={1}>*/}
        {/*  <StatisticItem*/}
        {/*    // icon={<IconQrcode />}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
    </Card>
  );
}

export default Overview;
