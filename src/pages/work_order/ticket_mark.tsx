import React, { useEffect, useState } from "react";
import { Button, Input, Message, Select, Space, Tag } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { addTicketMark, addTickOwner, getTicketMark, getTickOwner } from "@/api/cqapms";
import styles from "./style/mark.module.less";
import DynamicDivider from "@/components/Dynamic/Divider";
import { getEngineerList } from "@/api/user";
import { IconCheck } from "@arco-design/web-react/icon";

export default function TicketMark(props: {
  orderId: string
}) {
  // todo 针对工厂 和种类的定位
  const t = useLocale(locale);
  const { orderId } = props;
  const [data, setData] = useState<Record<any, any>>({});
  useEffect(() => {
    getTicketMark({ id: orderId }).then((res) => {
      if (res.data.success) {
        setData(res.data.result);
      }
    });
  }, []);
  const update = () => {
    addTicketMark({ ...data, orderId: orderId }).then(res => {
      if (res.data.success) {
        Message.success("update completed");
        setData({
          ...res.data.result
        });
      }
    });
  };

  const updateData = (key, value) => {
    setData(_value => {
      const temp = {
        ..._value
      };
      temp[key] = value;
      return temp;
    });
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    getEngineerList().then(res => {
      if (res.data.success) {
        setUser(res.data.result);
      }
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const updateOwner = () => {
    if (!userId) {
      Message.error("请先选择指派人");
      return;
    }
    addTickOwner({
      orderId: orderId,
      ownerName: userId
    }).then(res => {
      if (res.data.success) {
        Message.success("Created successfully");
        setOpen(value => !value);
      }
    });
  };
  const [engineerHistory, setEngineerHistory] = useState([]);
  const [owner, setOwner] = useState("");
  useEffect(() => {
    getTickOwner({
      id: orderId
    }).then(res => {
      if (res.data.success) {
        setEngineerHistory(res.data.result);
        setOwner(res.data.result?.[0]?.ownerName);
      }
    });
  }, [open]);


  return <div className={styles["box"]}>
    <Space>
      <p>{t["work.ticket.info.owner"]}</p>
      {!open &&
        <Tag color={"blue"} onClick={() => setOpen(value => !value)}>{owner}</Tag>}
      {open && <p>{t["work.ticket.info.owner.to"]}</p>}
      {open &&
        <Select
          placeholder="Please select"
          style={{ width: 200 }}
          onChange={(value) => setUserId(value)}
        >
          {user.map((option, index) => (
            <Select.Option key={index} value={option?.username}>
              {option?.username}
            </Select.Option>
          ))}
        </Select>}
      {open && <Button icon={<IconCheck />} type={"primary"} onClick={updateOwner}></Button>}
    </Space>

    <DynamicDivider />
    <div style={{ marginTop: 10 }}>
      <Space wrap size={[18, 22]}>
        <Space>
          {t["work.ticket.info.chip"]}
          <Input value={data?.chip} onChange={(value) => {
            updateData("chip", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.model"]}
          <Input value={data?.model} onChange={(value) => {
            updateData("model", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.location"]}
          <Input value={data?.failureLocation} onChange={(value) => {
            updateData("failureLocation", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.materials"]}
          <Input value={data?.materialNumber} onChange={(value) => {
            updateData("materialNumber", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.customer"]}
          <Input value={data?.customer} onChange={(value) => {
            updateData("customer", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.type"]}
          <Input value={data?.failureType} onChange={(value) => {
            updateData("failureType", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.soft"]}
          <Input value={data?.software} onChange={(value) => {
            updateData("software", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.idf"]}
          <Input value={data?.version} onChange={(value) => {
            updateData("version", value);
          }
          } style={{ width: 200 }} />
        </Space>
        <Space>
          {t["work.ticket.info.factory"]}
          <Input value={data?.factory} onChange={(value) => {
            updateData("factory", value);
          }
          } style={{ width: 200 }} />
        </Space>
      </Space>
      <DynamicDivider />
      <Space>
        <Space wrap size={[18, 22]}>
          <Space direction={"vertical"}>
            {t["work.ticket.info.follow.up.measures"]}
            <Input.TextArea value={data?.measure} onChange={(value) => {
              updateData("measure", value);
            }
            } style={{ width: 400 }} />
          </Space>
          <Space direction={"vertical"}>
            {t["work.ticket.info.improve"]}
            <Input.TextArea value={data?.improvement} onChange={(value) => {
              updateData("improvement", value);
            }
            } style={{ width: 400 }} />
          </Space>

        </Space>
      </Space>
      <DynamicDivider />
      <div className={styles["update-button"]}>
        <Button onClick={update} type={"primary"}
        >{t["work.ticket.info.button.update"]}</Button>
      </div>

    </div>
  </div>;
}
