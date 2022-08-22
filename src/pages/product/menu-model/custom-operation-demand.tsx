import { Button, Message } from "@arco-design/web-react";
import React, { useCallback, useState } from "react";
import useLocale from "@/pages/product/locale/useLocale";
import DynamicFootModal from "@/components/Dynamic/Modal/foot";
import DemandDescriptions from "@/pages/product/menu-model/descriptions";
import { ProductDemandDescriptions, setDemandDescriptions } from "@/store/product";

interface CustomProps {
  context: string,
  custom: any
}

export const CustomOperationDemand: React.FC<CustomProps> = (
  props: CustomProps
) => {
  const t = useLocale();
  const { context, custom } = props;
  const [open, setOpen] = useState<boolean>(false);
  const demandId = ProductDemandDescriptions(state => state.demandId);
  const [loading, setLoading] = useState(false);
  // 设置 按钮回调
  const call_back = useCallback(() => {
    setLoading(value => !value);
    custom(demandId).then(res => {
      if (res.data.success) {
        Message.success(t[context + ".success"]);
        setDemandDescriptions(-1, {});
        setOpen(open => !open);
      }
    }).finally(() =>
      setLoading(value => !value)
    );

  }, [demandId]);
  // 模态框 设置
  const open_back = useCallback(() => {
    setOpen(open => !open);
  }, []);
  // 按钮是否显示
  const is_disabled = () => {
    return demandId.includes(-1);
  };

  return <>
    <Button onClick={open_back} disabled={is_disabled()}>{t[context]}</Button>
    <DynamicFootModal
      title={t[context]}
      visible={open}
      onCancel={open_back}
      onOk={call_back}
      confirmLoading={loading}
    >
      <DemandDescriptions />
      <p>{t[context + ".info"]}</p>
    </DynamicFootModal>
  </>;
};
