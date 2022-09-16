import React from "react";
import { Button, Drawer } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import styles from "./style/drawer.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import DynamicDivider from "@/components/Dynamic/Divider";
import { OrderStep } from "@/open/work_order/order-step";
import { OrderDescriptions } from "@/open/work_order/order-descriptions";
import { IconToTop } from "@arco-design/web-react/icon";

interface DrawerProps {
  visible: boolean,
  setVisible: any,
  data: Record<string, any>
}

export const OrderDrawer: React.FC<DrawerProps> = (props: React.PropsWithChildren<DrawerProps>) => {
  const { visible, setVisible, data } = props;
  const t = useLocale(locale);
  const toTop = () => {
    const node = document.getElementById("customer_drawer");
    if (node) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      node.scrollIntoView();
    }
  };
  return <Drawer
    placement={"bottom"}
    escToExit
    unmountOnExit
    title={null}
    height={"95%"}
    className={styles["contour"]}
    visible={visible}
    footer={null}
    onCancel={() => {
      setVisible(false);
    }}
  >
    <div id={"customer_drawer"}>
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
      <Button type={"primary"} shape="circle" size={"large"} icon={<IconToTop />} className={styles["toTop"]}
              onClick={toTop} />
    </div>
  </Drawer>;
};
