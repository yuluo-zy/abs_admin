import React, { useCallback, useEffect, useState } from "react";
import { Button, Message, Select, Space, Spin } from "@arco-design/web-react";
import useLocale from "@/pages/product/locale/useLocale";
import { ProductDemandDescriptions, setDemandUpdate } from "@/store/product";
import DemandDescriptions from "@/pages/product/menu-model/descriptions";
import { demandAddable, demandRelatable } from "@/api/operation";
import DynamicModal from "@/components/Dynamic/Modal";
import Person from "@/pages/product/menu-model/person";
import styles from "./style/person.module.less";
import { IconCheck, IconUserAdd } from "@arco-design/web-react/icon";
import axios from "axios";
import { postDemandRelPerson } from "@/api/demand";

const Option = Select.Option;
export const RelatedPersonnelDemand: React.FC = () => {
  const t = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const demandId = ProductDemandDescriptions(state => state.demandId);
  const [loading, setLoading] = useState(false);
  const [personList, setPersonList] = useState([]);
  const [select, setSelect] = useState(false);
  const [person, setPerson] = useState(null);
  const [selectList, setSelectList] = useState([]);
  const open_back = useCallback(() => {
    setOpen(open => !open);
  }, []);
  // 按钮是否显示
  const is_disabled = () => {
    return demandId.includes(-1);
  };
  // 进行 相关人员查询
  useEffect(() => {
    if (!is_disabled() && open && select === false) {
      setLoading(value => !value);
      axios.all([
        demandRelatable({
          demandId: demandId?.[0]
        }),
        demandAddable({
          demandId: demandId?.[0]
        })
      ]).then(axios.spread((relatable, addable) => {

        if (relatable.data.success) {
          setPersonList(relatable.data.result);
        }
        if (addable.data.success) {
          setSelectList(addable.data.result);
        }

      })).finally(() => {
        setLoading(value => !value);
      });
    }
  }, [demandId, open, select]);

  const postPerson = () => {
    if (person === null) {
      Message.error(t["product.manage.tools.related.personnel.error"]);
      return;
    }
    postDemandRelPerson({
      demandId: demandId?.[0],
      relPersonId: person
    }).then(res => {
      if (res.data.success) {
        Message.success(t["product.manage.tools.related.personnel.success"]);
        setOpen(value => !value);
        setDemandUpdate();
      }
    });
  };


  return <>
    <Button onClick={open_back} disabled={is_disabled()}>{t["product.manage.tools.related.personnel"]}</Button>
    <DynamicModal
      title={t["product.manage.tools.related.personnel"]}
      visible={open}
      onCancel={open_back}
      confirmLoading={loading}
    >
      <Spin loading={loading} style={{ width: "100%" }}>
        <DemandDescriptions />
        <br />
        {select ?
          <div className={styles["button"]}>
            <Space size="large">
              <Select
                placeholder="Please select"
                onChange={(value) => setPerson(value)
                }
              >
                {selectList.map((option, index) => (
                  <Option key={option.id} disabled={index === 3} value={option.id}>
                    {option?.username}
                  </Option>
                ))}
              </Select>
              <Button
                type={"primary"}
                icon={<IconCheck />
                }
                onClick={postPerson}
              >Add</Button>
            </Space>
          </div>
          :
          <Button className={styles["button"]}
                  icon={<IconUserAdd />}
                  onClick={() => {
                    setSelect(value => !value);
                  }}
          >{t["product.manage.tools.related.personnel.button"]}</Button>
        }
        <Person userList={personList} />
      </Spin>
    </DynamicModal>
  </>;
};
