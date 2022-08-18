import { Button } from "@arco-design/web-react";
import React, { useCallback, useState } from "react";
import useLocale from "@/pages/product/locale/useLocale";
import DynamicFootModal from "@/components/Dynamic/Modal/foot";
import DemandDescriptions from "@/pages/product/menu-model/descriptions";
import { ProductDemandDescriptions } from "@/store/product";

export const CustomWithdrawDemand: React.FC = () => {
  const t = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const demandId = ProductDemandDescriptions(state => state.demandId);
  const data = ProductDemandDescriptions(state => state.data);
  const call_back = useCallback(() => {
    setOpen(open => !open);
  }, [demandId]);
  const open_back = useCallback(() => {
    setOpen(open => !open);
  }, []);

  return <>
    <Button onClick={open_back}>{t["product.manage.tools.withdraw"]}</Button>
    <DynamicFootModal
      title={t["product.manage.tools.withdraw"]}
      visible={open}
      onCancel={open_back}
      onOk={call_back}
    >
      <p>{t["product.manage.tools.withdraw.info"]}</p>
      <DemandDescriptions data={data} />
    </DynamicFootModal>
  </>;
};
