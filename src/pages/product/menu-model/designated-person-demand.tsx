import React, { useCallback, useEffect, useState } from "react";
import { Button, Message, Select, Spin } from "@arco-design/web-react";
import useLocale from "@/pages/product/locale/useLocale";
import { ProductDemandDescriptions, setDemandUpdate } from "@/store/product";
import DemandDescriptions from "@/pages/product/menu-model/descriptions";
import { demandAssignable } from "@/api/operation";
import DynamicFootModal from "@/components/Dynamic/Modal/foot";

interface Person {
  postFunction: any;
  multiple: boolean;
  title: string;
}

const Option = Select.Option;
export const DesignatedPersonDemand: React.FC<Person> = (props: React.PropsWithChildren<Person>) => {
  const { postFunction, multiple, title } = props;
  const t = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const demandId = ProductDemandDescriptions(state => state.demandId);
  const [loading, setLoading] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [person, setPerson] = useState(null);

  const open_back = useCallback(() => {
    setOpen(open => !open);
  }, []);

  // 按钮是否显示
  const is_disabled = () => {
    return demandId.includes(-1);
  };

  // 进行 相关人员查询
  useEffect(() => {
    if (!is_disabled() && open) {
      setLoading(value => !value);
      demandAssignable({
        demandId: demandId?.[0]
      }).then(res => {
        if (res.data.success) {
          setSelectList(res.data.result);
        }

      }).finally(() => {
        setLoading(value => !value);
      });
    }
  }, [demandId, open]);

  const call_back = () => {
    if (person === null) {
      Message.error(t["product.manage.tools.related.personnel.error"]);
      return;
    }
    setLoading(value => !value);
    postFunction({
      demandId: demandId?.[0],
      assignPerson: person
    }).then(res => {
      if (res.data.success) {
        Message.success(t[title + "success"]);
        setOpen(value => !value);
      }
    }).finally(() => {
      setLoading(value => !value);
      setDemandUpdate();
      }
    );
  }


  return <>
    <Button onClick={open_back} disabled={is_disabled()}>{t[title]}</Button>
    <DynamicFootModal
      title={t[title + ".info"]}
      visible={open}
      onCancel={open_back}
      onOk={call_back}
      confirmLoading={loading}
    >
      <Spin loading={loading} style={{ width: "100%" }}>
        <DemandDescriptions />
        <br />
        <Select
          placeholder="Please select"
          mode={multiple ? "multiple" : null}
          onChange={(value) => setPerson(value)
          }
        >
          {selectList.map((option, index) => (
            <Option key={option.id} value={option.id}>
              {option?.username}
            </Option>
          ))}
        </Select>
      </Spin>
    </DynamicFootModal>
  </>;
};
