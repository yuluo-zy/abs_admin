import React, { useEffect, useState } from "react";
import useLocale from "@/pages/product/summarize/locale/useLocale";
import { Button, Message, Radio, Spin, Typography } from "@arco-design/web-react";
import styles from "./style/product.module.less";
import DynamicDivider from "@/components/Dynamic/Divider";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { getProductionTest, postProductionTest } from "@/api/demand";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";

const RadioGroup = Radio.Group;

interface ProductProps {
  data?: Record<string, any>;
}

interface CardTitle {
  title: string;
}

const headerSelfStyle = {
  border: "none",
  height: "auto",
  padding: "0.5rem",
  paddingTop: "10px",
  paddingLeft: "10px",
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
  const [demandId] = ProductStore(state =>
    [state.demandId], shallow);
  const [data, setData] = useState(null);
  const setDataSelf = (value) => {
    setData({
      ...data,
      ...value
    });
  };
  useEffect(() => {
    setLoading(true);
    getProductionTest(demandId).then(res => {
      if (res.data.success) {
        setData(res.data.result);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const postData = () => {
    postProductionTest(data).then(res => {
      if (res.data.success) {
        Message.success(t["summarize.history.comment.success"]);
      }
    });
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
          <Typography.Text className={styles["title"]}
          >{t["product.remark"]}</Typography.Text>
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
      <DynamicOuterCardSlef title={t["product.performance.monitoring.title"]}>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.plan"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  performance: value
                });
              }
            }}>{data?.performance || t["product.default.title"]}</Typography.Text>
          </div>
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}
          >{t["product.remark"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  performanceRemark: value
                });
              }
            }}>{data?.performanceRemark}</Typography.Text>
          </div>
        </div>
      </DynamicOuterCardSlef>
      <DynamicDivider />
      <DynamicOuterCardSlef title={t["product.mac.title"]}>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.plan"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  mac: value
                });
              }
            }}>{data?.mac || t["product.default.title"]}</Typography.Text>
          </div>
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}
          >{t["product.remark"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  macRemark: value
                });
              }
            }}>{data?.macRemark}</Typography.Text>
          </div>
        </div>
      </DynamicOuterCardSlef>
      <DynamicDivider />
      <DynamicOuterCardSlef title={t["product.firmware.title"]}>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.options"]}</Typography.Text>
          <div className={styles["context"]}>
            <RadioGroup defaultValue={data?.firmwareWay || "1"} onChange={(value) => {
              setDataSelf({
                firmwareWay: value
              });
            }
            }>
              <Radio value="0">{t["product.firmware.offline"]}</Radio>
              <Radio value="1">{t["product.firmware.online"]}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.plan"]}</Typography.Text>
          {data?.firmwareWay === "0" && <div className={styles["contexts"]}>
            <Typography.Text className={styles["title"]}>{t["product.firmware.offline.address"]}</Typography.Text>
            <div className={styles["context"]}>
              <Typography.Text copyable={true} editable={{
                onChange: (value) => {
                  setDataSelf({
                    firmwareAddress: value
                  });
                }
              }}>{data?.firmwareAddress}</Typography.Text>
            </div>
          </div>}
          {data?.firmwareWay === "1" && <div className={styles["contexts"]}>
            <Typography.Text className={styles["title"]}>{t["product.firmware.online.tools"]}</Typography.Text>
            <div className={styles["context"]}>
              <Typography.Text copyable={true} editable={{
                onChange: (value) => {
                  setDataSelf({
                    firmwareTools: value
                  });
                }
              }}>{data?.firmwareTools}</Typography.Text>
            </div>
          </div>}
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}
          >{t["product.remark"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  firmwareRemark: value
                });
              }
            }}>{data?.firmwareRemark}</Typography.Text>
          </div>
        </div>
      </DynamicOuterCardSlef>
      <DynamicDivider />
      <DynamicOuterCardSlef title={t["product.context.title"]}>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.firmware.online.tools"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text copyable={true} editable={{
              onChange: (value) => {
                setDataSelf({
                  context: value
                });
              }
            }}>{data?.context}</Typography.Text>
          </div>
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}
          >{t["product.remark"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  contextRemark: value
                });
              }
            }}>{data?.contextRemark}</Typography.Text>
          </div>
        </div>
      </DynamicOuterCardSlef>
      <DynamicDivider />
      <DynamicOuterCardSlef title={t["product.efuse.title"]}>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}>{t["product.firmware.online.tools"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text copyable={true} editable={{
              onChange: (value) => {
                setDataSelf({
                  efuse: value
                });
              }
            }}>{data?.efuse}</Typography.Text>
          </div>
        </div>
        <div className={styles["contexts"]}>
          <Typography.Text className={styles["title"]}
          >{t["product.remark"]}</Typography.Text>
          <div className={styles["context"]}>
            <Typography.Text editable={{
              onChange: (value) => {
                setDataSelf({
                  efuseRemark: value
                });
              }
            }}>{data?.efuseRemark}</Typography.Text>
          </div>
        </div>
      </DynamicOuterCardSlef>
      <Button type={"primary"} className={styles["button"]} size={"large"} onClick={postData}>更新</Button>
    </Spin>
  </div>;
};
