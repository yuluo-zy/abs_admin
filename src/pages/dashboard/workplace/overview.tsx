import React, { useEffect, useMemo, useRef, useState } from "react";
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
    const cssList = [styles.icon];
    if (hover) {
      cssList.push(styles.iconhover);
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
  <IconTag key={"IconTag"} />,
  <IconMac key={"IconMac"} />,
  <IconInfo key={"IconInfo"} />,
  <IconFirmWare key={"IconFirmWare"} />,
  <IconConfigure key={"IconConfigure"} />
];

function Overview() {
  const t = useLocale(locale);
  const userInfo = useSelector((state: any) => state.userInfo || {});
  const [indexNode, setIndexNode] = useState(0);
  const carouselRef = useRef(null);
  const titleList = [
    t["workplace.step.label"],
    t["workplace.step.mac"],
    t["workplace.step.info"],
    t["workplace.step.firmware"],
    t["workplace.step.configure"]
  ];
  const context = [
    t["workplace.step.label.context"],
    t["workplace.step.mac.context"],
    t["workplace.step.info.context"],
    t["workplace.step.firmware.context"],
    t["workplace.step.configure.context"]
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
          React.Children.toArray(iconList.map((item, index) => {
            return <>
              <Col flex={1} onMouseEnter={() => {
                if (carouselRef.current) {
                  carouselRef.current.goto({
                    index: index,
                    resetAutoPlayInterval: true
                  });
                }
              }
              }>
                <StatisticItem
                  index={indexNode}
                  item={index}
                  icon={item}
                  title={titleList[index]}
                />
              </Col>
              {index + 1 !== iconList.length && <div className={styles.divider} />}
            </>;
          }))
        }
      </Row>
      <br />
      <Carousel
        autoPlay
        animation="card"
        showArrow="never"
        carousel={carouselRef}
        indicatorType={"line"}
        indicatorPosition={"top"}
        className={styles["carousel"]}
        onChange={(index, prevIndex, isManual) => {
          setIndexNode(index);
        }}
      >
        {context.map((text, index) => (
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
