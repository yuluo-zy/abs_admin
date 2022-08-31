import React, { useEffect, useState } from "react";
import useLocale from "@/pages/product/summarize/locale/useLocale";
import { Button, Spin, Typography } from "@arco-design/web-react";
import styles from "./style/product.module.less";
import DynamicDivider from "@/components/Dynamic/Divider";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";

interface ProductProps {
  data?: Record<string, any>;
}

interface CardTitle {
  title: string;
}

const headerSelfStyle = {
  border: "none",
  height: "auto",
  paddingTop: "10px",
  padding: "0.5rem",
  paddingBottom: 0
};
const bodySelfStyle = {
  padding: "0.6rem"
};
const DynamicOuterCardSlef = (props: React.PropsWithChildren<CardTitle>) => {
  return <DynamicOuterCard headerStyle={headerSelfStyle} bodyStyle={bodySelfStyle} title={props.title}>
    {props.children}
  </DynamicOuterCard>;
};
export const Product: React.FC<ProductProps> = (props: React.PropsWithChildren<ProductProps>) => {
  const t = useLocale();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const setDataSelf = (value) => {
    setData({
      ...data,
      ...value
    });
  };
  useEffect(() => {
    // todo get data
  }, []);

  const postData = () => {
    // todo 上传数据
  };
  return <div className={styles["card"]}>
    <Spin style={{ width: "100%" }} loading={loading}>
      <DynamicOuterCardSlef title={t["product.laser.carving.title"]}>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.plan"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  laser: value
                });
              }
            }}>{data?.laser || t["product.default.title"]}</Typography.Text>
          </div>
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.remark"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  laserRemark: value
                });
              }
            }}>{data?.laserRemark}</Typography.Text>
          </div>
        </div>
      </DynamicOuterCardSlef>
      <DynamicDivider />
      <Button type={"primary"} className={styles["button"]}>更新</Button>
    </Spin>

  </div>;
};
