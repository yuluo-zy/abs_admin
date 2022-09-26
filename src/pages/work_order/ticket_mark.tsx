import React, { useEffect, useState } from "react";
import { Button, Input, Message, Space } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { addTicketMark, getTicketMark } from "@/api/cqapms";
import styles from "./style/mark.module.less";

export default function TicketMark(props: {
  orderId: string
}) {
  // todo 针对工厂 和种类的定位
  const t = useLocale(locale);
  const { orderId } = props;
  const [data, setData] = useState<Record<string, string>>({});
  useEffect(() => {
    getTicketMark({ id: orderId }).then((res) => {
      if (res.data.success) {
        setData(res.data.result);
      }
    });
  }, []);
  const update = () => {
    addTicketMark(data).then(res => {
      if (res.data.success) {
        Message.success("update completed");
      }
    });
  };
  return <div>
    <Button onClick={update} type={"primary"}
            className={styles["update-button"]}>{t["work.ticket.info.button.update"]}</Button>
    <div></div>
    <div>
      <Space wrap size={[12, 18]}>
        <Space>
          {t["work.ticket.info.chip"]}
          <Input defaultValue={data?.chip} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.model"]}
          <Input defaultValue={data?.model} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.location"]}
          <Input defaultValue={data?.failureLocation} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.materials"]}
          <Input defaultValue={data?.materialNumber} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.customer"]}
          <Input defaultValue={data?.customer} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.type"]}
          <Input defaultValue={data?.failureType} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.soft"]}
          <Input defaultValue={data?.software} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.idf"]}
          <Input defaultValue={data?.version} style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.factory"]}
          <Input defaultValue={data?.factory} style={{ width: 200 }} />
        </Space>
      </Space>
      <Space>
        <Space wrap size={[12, 18]}>
          <Space direction={"vertical"}>
            {t["work.ticket.info.follow.up.measures"]}
            <Input.TextArea defaultValue={data?.measure} style={{ width: 400 }} />
          </Space>
          <Space direction={"vertical"}>
            {t["work.ticket.info.improve"]}
            <Input.TextArea defaultValue={data?.improvement} style={{ width: 400 }} />
          </Space>

        </Space>
      </Space>
    </div>
  </div>;
}
