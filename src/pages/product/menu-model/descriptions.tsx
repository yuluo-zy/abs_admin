import React from "react";
import { Descriptions } from "@arco-design/web-react";
import { ProductDemandDescriptions } from "@/store/product";
import useLocale from "@/pages/product/locale/useLocale";

export const DemandDescriptions: React.FC = () => {
  const t = useLocale();
  const data = ProductDemandDescriptions(state => state.data);
  const getInfo = (data) => {
    return [
      {
        label: "fwPn",
        value: data?.fwPn
      },
      {
        label: t["product.manage.table.client.model"],
        value: data?.adaptModuleType
      }
    ];
  };
  return (
    <Descriptions
      column={1}
      colon={":"}
      border
      size={"large"}
      data={getInfo(data)}
      valueStyle={{ margin: 3 }}
    />
  );
};

export default DemandDescriptions;
