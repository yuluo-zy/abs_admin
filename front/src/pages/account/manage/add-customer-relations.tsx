import { Message, Modal, Select, Space, Switch, Tag } from "@arco-design/web-react";
import React, { useEffect, useMemo, useRef } from "react";
import { getBusiness, impartBusiness, transformBusiness } from "@/api/user";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/account/manage/locale";

const Option = Select.Option;

const useAddRelations = () => {
  const t = useLocale(locale);
  const userOptions = useRef([]);
  useEffect(() => {
    getBusiness().then(res => {
      if (res.data.success) {
        userOptions.current = res.data.result;
      }
    });
  }, []);
  const originBusinessRef = useRef(null);
  const destBusiness = useRef(null);
  const transform = useRef(false);
  const addCustomerRelations = (customerIds?: Array<number>, callBack?: any) => {
    const postData = transform.current ? transformBusiness : impartBusiness;
    postData({
      originBusinessId: originBusinessRef.current,
      destBusinessId: destBusiness.current,
      customerIds
    }).then(res => {
      if (res.data.success) {
        if (callBack) {
          callBack();
        }
        Message.success(t["userTable.columns.user.custom.add.success"]);
      }
    });
  };
  const execute = useMemo(() => {

    const handler = ({ originBusiness, customerIds, callback }) => {
      // 设置对应的起始账户
      originBusinessRef.current = originBusiness;
      Modal.info({
        title: t["userTable.columns.user.custom.add"],
        content: <>
          <Space size={"large"} direction={"vertical"}>
            <Space>
              <Tag color="arcoblue">{t["userTable.columns.user.custom.add.to"]}</Tag>
              <Select
                placeholder={t["userTable.columns.user.custom.business.user"]}
                style={{ display: "inline-block" }}
                onChange={(value) =>
                  destBusiness.current = value
                }
              >
                {userOptions.current.map((option, index) => (
                  <Option key={index} value={option?.id}>
                    {option?.username}
                  </Option>
                ))}
              </Select>
            </Space>
            <Space size={"large"}>
              <Tag color="arcoblue">{t["userTable.columns.user.custom.business.transform"]}</Tag>
              <Switch type="round" onChange={(value) => {
                transform.current = value;
              }} />
            </Space>
          </Space>
        </>,
        onOk: () => {
          addCustomerRelations(customerIds, callback);
        }
      });
    };
    return [handler];
  }, [userOptions]);
  return [...execute];
};

export default useAddRelations;
