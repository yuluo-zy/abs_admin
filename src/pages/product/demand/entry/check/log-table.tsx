import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Grid } from "@arco-design/web-react";
import { IconCheckSquare, IconCloseCircle } from "@arco-design/web-react/icon";
import styles from "./style/index.module.less";

const Row = Grid.Row;
const Col = Grid.Col;

export default function LogTable(props: { data }) {
  const t = useLocale();
  const { data } = props;

  const title = (name) => {
    switch (name) {
      case "定制固件":
        return t["self.check.boot.upload.port.hit.firmware"];
      case "定制内容烧录":
        return t["self.check.boot.upload.port.hit.mac"];
      case "定制MAC":
        return t["self.check.boot.upload.port.hit.burn"];
    }
    return "";
  };

  const pass = (value) => {
    if (value && value === "FAIL") {
      return <IconCloseCircle style={{ color: "rgb(var(--red-6))" }} />;
    }
    return <IconCheckSquare style={{ color: "rgb(var(--green-6))" }} />;
  };

  return <div>
    <p>{t["self.check.boot.upload.port.hit"]}</p>
    {
      data && data.map((item, index) => {
        return <Row key={index} style={{ margin: 10 }} className={styles["log-table"]} gutter={12}>
          <Col flex="30px">{index + 1 + "."}</Col>
          <Col flex="130px">
            {title(item?.serCustomPosition)}
          </Col>
          <Col flex="auto" className={styles["expected"]}>
            {item?.expectedValue}
          </Col>
          <Col flex="100px">
            {pass(item?.result)}
          </Col>
        </Row>;
      })
    }
  </div>;
}
