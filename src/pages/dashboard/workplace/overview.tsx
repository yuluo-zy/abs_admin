import React, { useEffect, useMemo, useState } from "react";
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
import cs from "classnames";

const imageSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp"
];
const { Row, Col } = Grid;

function StatisticItem(props) {
  const { icon, item, title } = props;
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (props.index === item) {
      // 设置 鼠标覆盖样式
      setHover(true);
    } else {
      setHover(false);
    }
  }, [props.index]);
  return useMemo(() => {
    let cssList = [styles.icon];
    if (hover) {
      cssList.push(styles.iconhover);
      console.log(cssList);
    }
    return <>
      <div className={styles.item}>
        <div className={cs(cssList)}>
          {icon}
        </div>
        {hover && < Tag color="blue" className={styles["title"]}>
          {title}
        </Tag>}
      </div>
    </>;
  }, [hover]);
}

const iconList = [
  <IconTag />,
  <IconMac />,
  <IconInfo />,
  <IconFirmWare />,
  <IconConfigure />
];

function Overview() {
  const t = useLocale(locale);
  const userInfo = useSelector((state: any) => state.userInfo || {});
  const [indexNode, setIndexNode] = useState(0);
  const titleList = [
    t["workplace.step.label"],
    t["workplace.step.mac"],
    t["workplace.step.info"],
    t["workplace.step.firmware"],
    t["workplace.step.configure"]
  ];
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
        {
          iconList.map((item, index) => {
            return <>
              <Col flex={1}>
                <StatisticItem
                  index={indexNode}
                  item={index}
                  icon={item}
                  title={titleList[index]}
                />
              </Col>
              {index + 1 !== iconList.length && <div className={styles.divider} />}
            </>;
          })
        }
      </Row>
      <Carousel
        autoPlay
        animation="card"
        showArrow="never"
        indicatorType={"line"}
        indicatorPosition={"top"}
        className={styles["carousel"]}
        onChange={(index, prevIndex, isManual) => {
          setIndexNode(index);
        }}
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
