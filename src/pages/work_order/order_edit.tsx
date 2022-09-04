import React, { useEffect, useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { useParams } from "react-router";
import { getAfterSale, postAfterSaleComplete, postAfterSaleReceive } from "@/api/cqapms";
import DynamicCard from "@/components/Dynamic/Card";
import { OrderStep } from "@/open/work_order/order-step";
import DynamicDivider from "@/components/Dynamic/Divider";
import { OrderDescriptions } from "@/open/work_order/order-descriptions";
import { Button, Message, Spin } from "@arco-design/web-react";
import styles from "./style/edit.module.less";
import { IconCheck, IconCheckCircle } from "@arco-design/web-react/icon";
import RiceText from "@/rice_text";

const EditText = (props) => {
  const { textSet } = props;
  return <RiceText onChange={textSet} readOnly={false} />;
};
const ViewText = (props) => {
  const { data } = props;
  return <RiceText readOnly={true} initValue={data} />;
};
export const OrderEdit: React.FC = () => {
  const t = useLocale(locale);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [riceText, setRiceText] = useState<Record<string, any>>();

  function handleOnClick() {
    let data = "";
    if (riceText) {
      data = JSON.stringify(riceText.toJSON());
    }
    postAfterSaleComplete({
      id: id,
      remarks: data
    }).then(res => {
      if (res.data.success) {
        setChange(value => !value);
        Message.success("Successful operation");
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    getAfterSale(id).then(res => {
      if (res.data.success && res.data.result) {
        setData([res.data.result]);
      }
    })
      .finally(() => {
        setLoading(false);
      });
  }, [change]);

  return <div className={styles["content"]}>
    {/*<DynamicCard title={t['workplace.drawer.details']}>*/}
    <Spin style={{ width: "100%" }} loading={loading}>
      <DynamicCard title={t["workplace.drawer.details.schedule"]}>
        <OrderStep stepNumber={data} style={{ maxWidth: 800, margin: "0 auto" }} />
      </DynamicCard>
      <DynamicDivider />
      <DynamicCard title={t["workplace.drawer.details"]}>
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <Button className={styles["edit-button"]}
                  type={"primary"}
                  loading={buttonLoading}
                  icon={<IconCheckCircle />}
                  onClick={() => {
                    setButtonLoading(true);
                    postAfterSaleReceive({
                      id: id
                    }).then(res => {
                      if (res.data.success) {
                        setChange(value => !value);
                        Message.success("Successful operation");
                      }
                    }).finally(() => {
                      setButtonLoading(false);
                    });
                  }
                  }
          >{t["work.order.operate.accept"]}</Button>
          <OrderDescriptions descriptionData={data} encryption={false} feedback={false} download={true} />
        </div>
      </DynamicCard>
      <DynamicDivider />
      {/*富文本回复内容*/}
      <DynamicCard title={t["work.order.operate.process.result"]}>
        {!data?.[0]?.remarks && <Button className={styles["edit-button"]}
                                        type={"primary"}
                                        icon={<IconCheck />}
                                        onClick={handleOnClick}>{t["work.order.operate.process.result.operate"]}</Button>}
        {!data?.[0]?.remarks && <EditText textSet={setRiceText} />}
        {data?.[0]?.remarks && <ViewText data={data?.[0]?.remarks} />}
      </DynamicCard>
    </Spin>

  </div>;
};
