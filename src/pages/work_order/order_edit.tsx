import React, { useEffect, useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { useParams } from "react-router";
import { getAfterSale } from "@/api/cqapms";
import DynamicCard from "@/components/Dynamic/Card";
import { OrderStep } from "@/open/work_order/order-step";
import DynamicDivider from "@/components/Dynamic/Divider";
import { OrderDescriptions } from "@/open/work_order/order-descriptions";
import { Spin } from "@arco-design/web-react";


export const OrderEdit: React.FC = () => {
  const t = useLocale(locale);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);
  return <div>
    <Spin style={{ width: "100%" }}>
      <DynamicCard title={t["workplace.drawer.details.schedule"]}>
        <OrderStep stepNumber={1} style={{ maxWidth: 800, margin: "0 auto" }} />
      </DynamicCard>
      <DynamicDivider />
      <DynamicCard title={t["workplace.drawer.details"]}>
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <OrderDescriptions descriptionData={data} encryption={false} download={true} />
        </div>
      </DynamicCard>
    </Spin>
  </div>;
};
