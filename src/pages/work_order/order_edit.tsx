import React, { useEffect, useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { useParams } from "react-router";
import { addAfterSaleComment, getAfterSale, postAfterSaleReceive } from "@/api/cqapms";
import DynamicCard from "@/components/Dynamic/Card";
import { OrderStep } from "@/open/work_order/order-step";
import DynamicDivider from "@/components/Dynamic/Divider";
import { OrderDescriptions } from "@/open/work_order/order-descriptions";
import { Button, Divider, Message, Popconfirm, Select, Space, Spin, Switch } from "@arco-design/web-react";
import styles from "./style/edit.module.less";
import { IconCheck, IconCheckCircle } from "@arco-design/web-react/icon";
import RiceText from "@/rice_text";
import { getSalesInfo, postSalesFile } from "@/api/file";
import axios from "axios";
import WorkOrderHistory from "@/pages/work_order/order_history";
import { getFileID } from "@/utils/parseJson";

export const OrderEdit: React.FC = () => {
  const t = useLocale(locale);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [riceText, setRiceText] = useState<Record<string, any>>();

  useEffect(() => {
    let isUnmount = false;
    // if(!isUnmount){
    setLoading(true);
    getAfterSale(id)
      .then(res => {
        if (res.data.success && res.data.result && !isUnmount) {
          setData([res.data.result]);
        }
      }).finally(() => {
      if (!isUnmount) {
        setLoading(false);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, [change]);

  const uploadData = (option) => {
    const { onProgress, file, onSuccess, onError } = option;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", id);
    const source = axios.CancelToken.source();
    const onprogress = progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
      onProgress(parseInt(String(complete), 10), progressEvent);
    };
    postSalesFile(formData, onprogress, source.token).then(r => {
      const { success, result } = r.data;
      if (success) {
        Message.success("Uploaded successfully");
        onSuccess(result);
      }
    }).catch(() => {
      Message.error("Uploaded Error");
      onError("Uploaded Error");
    });
    return {
      abort() {
        source.cancel("cancel");
      }
    };
  };

  const getSalesInfoById = (data) => {
    return getSalesInfo({
      ...data,
      orderId: id
    });
  };

  const getSalesImgById = (data) => {
    return getSalesInfo({
      id: data,
      orderId: id
    });
  };
  const options = ["Beijing", "Shanghai", "Guangzhou", "Disabled"];
  const [customerVisibility, setCustomervisibility] = useState(false);
  const [email, setEmail] = useState(false);

  function handleOnClick() {
    let data = "";
    if (riceText) {
      data = JSON.stringify(riceText.toJSON());
    }
    let fileList = "";
    if (customerVisibility) {
      fileList = getFileID(riceText.toJSON());
    }
    addAfterSaleComment({
      afterSaleOrderId: id,
      commentText: data,
      fileUuids: fileList
    }).then(res => {
      if (res.data.success) {
        setChange(value => !value);
        Message.success("Successful operation");
      }
    });
  }

  return <div className={styles["content"]}>
    {/*<DynamicCard title={t['workplace.drawer.details']}>*/}
    <Spin style={{ width: "100%" }} loading={loading}>
      <DynamicCard title={t["workplace.drawer.details.schedule"]}>
        <OrderStep stepNumber={data} style={{ maxWidth: 800, margin: "0 auto" }} />
      </DynamicCard>
      <DynamicDivider />
      {/*<DynamicCard title={t["workplace.drawer.ticket.mark"]}>*/}
      {/*  <TicketMark />*/}
      {/*</DynamicCard>*/}
      {/*<DynamicDivider />*/}
      <DynamicCard title={t["workplace.drawer.details"]}>
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <Button className={styles["edit-button"]}
                  type={"primary"}
                  loading={buttonLoading}
                  icon={<IconCheckCircle />}
                  onClick={() => {
                    setButtonLoading(true);
                    postAfterSaleReceive({
                      id: id
                    }).then(res => {
                      if (res.data.success) {
                        setChange(value => !value);
                        Message.success("Successful operation");
                      }
                    }).finally(() => {
                      setButtonLoading(false);
                    });
                  }
                  }
          >{t["work.order.operate.accept"]}</Button>
          <OrderDescriptions descriptionData={data} encryption={false} feedback={false} download={true} copy={true} />
        </div>
      </DynamicCard>
      <DynamicDivider />
      {/*富文本回复内容*/}
      <DynamicCard title={t["work.order.operate.process.result"]} bodyStyle={{ paddingTop: 0 }}>
        <Popconfirm
          title="确定您已经完成编辑并设置好相关设置了吗?"
          onOk={() => {
            handleOnClick();
          }}
          onCancel={() => {
            Message.error({
              content: "cancel"
            });
          }}
        >
          <Button className={styles["edit-button"]}
                  type={"primary"}
                  icon={<IconCheck />}
                  onClick={() => {
                  }}>{t["work.order.operate.process.result.operate"]}</Button>
        </Popconfirm>
        <Space>
          <p style={{ width: 100 }}>{t["work.order.operate.common.customer.visibility"]}</p>
          <Switch checked={customerVisibility} onChange={(value) => {
            setCustomervisibility(value);
          }
          } />
          <Divider type={"vertical"} />
          <p style={{ width: 100 }}>{t["work.order.operate.common.customer.email"]}</p>
          <Switch checked={email} onChange={(value) => {
            setEmail(value);
          }
          } />
          <Divider type={"vertical"} />
          <p style={{ width: 50 }}>{t["work.order.operate.common.step"]}</p>
          <Select placeholder="Select Step" style={{ width: 150 }} allowClear>
            {options.map((option, index) => (
              <Select.Option key={index} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          <Divider type={"vertical"} />
        </Space>
        <RiceText onChange={setRiceText} readOnly={false}
                  fileUpload={uploadData}
                  fileDownload={getSalesInfoById}
                  imgUpload={uploadData}
                  imgDownload={getSalesImgById} />
      </DynamicCard>
      <DynamicDivider />
      <DynamicCard title={t["workplace.drawer.details.schedule.history"]}>
        <WorkOrderHistory order={id} />
      </DynamicCard>
    </Spin>
  </div>;
};
