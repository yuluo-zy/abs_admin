import React from "react";
import { Card, Carousel, Divider, Grid, Tag, Typography } from "@arco-design/web-react";
import { useSelector } from "react-redux";
import locale from "./locale";
import useLocale from "@/utils/useHook/useLocale";
import styles from "./style/overview.module.less";
import IconTag from "./assets/Tag.svg";
import IconMac from "./assets/mac.svg";
import IconInfo from "./assets/info.svg";
import IconFirmWare from "./assets/firmware.svg";
import IconConfigure from "./assets/configure.svg";

const imageSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp"
];
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
      <Tag color="blue" size={"large"} className={styles["title"]}>
        {t["workplace.step.title"]}
      </Tag>
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
      <Carousel
        autoPlay
        animation="card"
        showArrow="never"
        indicatorType={"line"}
        indicatorPosition={"top"}
        className={styles["carousel"]}
      >
        {imageSrc.map((text, index) => (
          <div
            key={index}
            className={styles["context"]}
          >
            <p>{text}</p>
          </div>
        ))}
      </Carousel>
    </Card>
  );
}

export default Overview;
