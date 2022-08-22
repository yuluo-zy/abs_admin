import React, { useCallback, useEffect, useState } from "react";
import { Button, Message, Spin } from "@arco-design/web-react";
import useLocale from "@/pages/product/locale/useLocale";
import { ProductDemandDescriptions, setDemandDescriptions } from "@/store/product";
import DemandDescriptions from "@/pages/product/menu-model/descriptions";
import { demandAddable, demandRelatable } from "@/api/operation";
import DynamicModal from "@/components/Dynamic/Modal";
import Person from "@/pages/product/menu-model/person";

export const RelatedPersonnelDemand: React.FC = () => {
  const t = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const demandId = ProductDemandDescriptions(state => state.demandId);
  const [loading, setLoading] = useState(false);
  const [personList, setPersonList] = useState([]);
  // 设置 按钮回调
  const call_back = useCallback(() => {
    setLoading(value => !value);
    demandAddable().then(res => {
      if (res.data.success) {
        Message.success(t["product.manage.tools.related.personnel.ok"]);
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
    return demandId === -1;
  };
  // 进行 相关人员查询
  useEffect(() => {
    if (!is_disabled() && open) {
      setLoading(value => !value);
      demandRelatable({
        demandId: demandId
      }).then(res => {
        if (res.data.success) {
          setPersonList(res.data.result);
        }
      }).finally(() => {
        setLoading(value => !value);
      });
    }
  }, [demandId, open]);

  return <>
    <Button onClick={open_back} disabled={is_disabled()}>{t["product.manage.tools.related.personnel"]}</Button>
    <DynamicModal
      title={t["product.manage.tools.related.personnel"]}
      visible={open}
      onCancel={open_back}
      onOk={call_back}
      confirmLoading={loading}
    >
      <Spin loading={loading} style={{ width: "100%" }}>
        <DemandDescriptions />
        <Person userList={personList} />
        <p>{t["product.manage.tools.related.personnel.context"]}</p>
      </Spin>
    </DynamicModal>
  </>;
};
