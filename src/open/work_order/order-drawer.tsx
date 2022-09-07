import React from "react";
import { Drawer } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import styles from "./style/drawer.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import DynamicDivider from "@/components/Dynamic/Divider";
import { OrderStep } from "@/open/work_order/order-step";
import { OrderDescriptions } from "@/open/work_order/order-descriptions";

interface DrawerProps {
  visible: boolean,
  setVisible: any,
  data: Record<string, any>
}

export const OrderDrawer: React.FC<DrawerProps> = (props: React.PropsWithChildren<DrawerProps>) => {
  const { visible, setVisible, data } = props;
  const t = useLocale(locale);
  return <Drawer
    placement={"bottom"}
    escToExit
    unmountOnExit
    title={null}
    height={"90%"}
    className={styles["contour"]}
    visible={visible}
    footer={null}
    onCancel={() => {
      setVisible(false);
    }}
  >
    <div>
      <DynamicCard title={t["workplace.drawer.details.schedule"]}>
        <OrderStep stepNumber={data} style={{ maxWidth: "70%", margin: "0 auto" }} />
      </DynamicCard>
      <DynamicDivider />
      <DynamicCard title={t["workplace.drawer.details"]}>
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <OrderDescriptions descriptionData={data} encryption={true} download={false} feedback={true}
                             style={{ marginBottom: "2rem" }} />
        </div>
      </DynamicCard>
    </div>
  </Drawer>;
};
