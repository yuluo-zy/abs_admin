import React, { useEffect, useRef, useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { useHistory, useParams } from "react-router";
import {
  addAfterSaleComment,
  deleteSaleComment,
  getAfterSale,
  postAfterSaleComplete,
  postAfterSaleReceive
} from "@/api/cqapms";
import DynamicCard from "@/components/Dynamic/Card";
import { OrderStep } from "@/open/work_order/order-step";
import DynamicDivider from "@/components/Dynamic/Divider";
import { OrderDescriptions } from "@/open/work_order/order-descriptions";
import { Button, Divider, Message, Popconfirm, Select, Space, Spin, Switch } from "@arco-design/web-react";
import styles from "./style/edit.module.less";
import { IconCheck, IconCheckCircle, IconExclamation, IconLeft, IconToTop } from "@arco-design/web-react/icon";
import RiceText from "@/rice_text";
import { getSalesInfo, postSalesFile } from "@/api/file";
import axios from "axios";
import WorkOrderHistory from "@/pages/work_order/order_history";
import { getFileID } from "@/utils/parseJson";
import TicketMark from "@/pages/work_order/ticket_mark";
import { DynamicTooltip } from "@/components/Dynamic/Tooltip";
import { ManagePath, WorkOrderPath } from "@/utils/routingTable";

export const OrderEdit: React.FC = () => {
  const t = useLocale(locale);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [riceText, setRiceText] = useState<Record<string, any>>();
  const orderHistory = useRef<any>();
  const [emailValue, setEmailValue] = useState([]);

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
  const [internal, setInternal] = useState(true);
  const [email, setEmail] = useState(false);

  const riceTextRef = useRef<any>();

  const endOrder = () => {
    postAfterSaleComplete({
      id: id
    }).then(res => {
      if (res.data.success) {
        setChange(value => !value);
        Message.success("Successful operation");
      }
    });
  };

  function handleOnClick() {
    let data = "";
    if (!riceText || riceText.toJSON().length <= 0) {
      Message.error(t["work.order.operate.order.add.error"]);
      return;
    }
    if (riceText) {
      data = JSON.stringify(riceText.toJSON());
    }
    if (data.length <= 0) {
      Message.error(t["work.order.operate.order.add.error"]);
      return;
    }
    let fileList = "";
    if (!internal) {
      fileList = getFileID(riceText.toJSON());
    }

    addAfterSaleComment({
      afterSaleOrderId: id,
      commentText: data,
      fileUuids: fileList,
      internal: internal,
      sendEmail: email,
      externalEmails: emailValue.toString()
    }).then(res => {
      if (res.data.success) {
        setChange(value => !value);
        Message.success("Successful operation");
        riceTextRef.current.clear();
        orderHistory.current?.update();
      }
    });
  }

  const history = useHistory();
  const to_work_order = () => {
    history.push(`${ManagePath}${WorkOrderPath}`);
  };
  const toTop = () => {
    const node = document.getElementById("toTop");
    if (node) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      node.scrollIntoView(false);
    }
  };
  const deleteOrder = () => {
    deleteSaleComment({
      ids: [id]
    }).then(res => {
      if (res.data.success) {
        Message.success("successfully deleted");
        to_work_order();
      }
    });
  };

  const emailOptions = [];

  const getInitValue = () => {
    const temp = [];
    if (data && data.length > 0) {
      if (data[0]?.customerEmail) {
        temp.push(data[0]?.customerEmail);
      }
      if (data[0]?.espBusinessEmail) {
        temp.push(data[0]?.espBusinessEmail);
      }
    }

    emailOptions.push(...temp);
    // setEmailValue([]);
    return temp;
  };
  // useEffect(() => {
  //   const temp = [];
  //   if (data && data.length > 0) {
  //     if (data[0]?.customerEmail) {
  //       temp.push(data[0]?.customerEmail);
  //     }
  //     if (data[0]?.espBusinessEmail) {
  //       temp.push(data[0]?.espBusinessEmail);
  //     }
  //   }
  //   setEmailValue([...temp]);
  // }, [data]);


  return <div className={styles["content"]}>
    <div className={styles["edit-tool"]} id={"toTop"}>

      <Button icon={<IconLeft />} type={"primary"} size={"large"} onClick={to_work_order}>Return</Button>
      <Popconfirm
        title="结束工单则本条内容客户可见,并且将邮件通知客户"
        onOk={() => {
          endOrder();
        }}
      >
        <Button
          type={"primary"}
          status="danger"
          icon={<IconExclamation />}>{t["work.order.operate.process.result.end"]}</Button>
      </Popconfirm>

      {/*<Popconfirm*/}
      {/*  title="确定删除? 删除后不可恢复"*/}
      {/*  onOk={() => {*/}
      {/*    deleteOrder();*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Button type="primary" status="danger" icon={<IconDelete />} size={"large"}>Delete This</Button>*/}
      {/*</Popconfirm>*/}
    </div>
    <Spin style={{ width: "100%" }} loading={loading}>
      <DynamicCard title={t["workplace.drawer.details.schedule"]}>
        <OrderStep stepNumber={data} style={{ maxWidth: 800, margin: "0 auto" }} />
      </DynamicCard>
      <DynamicDivider />
      <DynamicCard title={t["workplace.drawer.ticket.mark"]}>
        <TicketMark />
      </DynamicCard>
      <DynamicDivider />
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
                  }}
          >{t["work.order.operate.accept"]}</Button>
          <OrderDescriptions descriptionData={data} encryption={false} feedback={false} download={true} copy={true} />
        </div>
      </DynamicCard>
      <DynamicDivider />
      {/*富文本回复内容*/}
      <DynamicCard title={t["work.order.operate.process.result"]} bodyStyle={{ paddingTop: 0 }}>
        <Space className={styles["edit-button"]} size={"large"}>
          <Popconfirm
            title="确定您已经完成编辑并设置好相关设置了吗?"
            onOk={() => {
              handleOnClick();
            }}
          >
            <Button
              type={"primary"}
              icon={<IconCheck />}>{t["work.order.operate.process.result.operate"]}</Button>
          </Popconfirm>
        </Space>

        <Space>
          <DynamicTooltip content={t["work.order.operate.common.customer.visibility.help"]}>
            <p style={{ width: 100 }}>{t["work.order.operate.common.customer.visibility"]}</p>
          </DynamicTooltip>
          <Switch checked={internal} onChange={(value) => {
            setInternal(value);
          }
          } />
          <Divider type={"vertical"} />
          <DynamicTooltip content={t["work.order.operate.common.customer.email.help"]}>
            <p style={{ width: 100 }}>{t["work.order.operate.common.customer.email"]}</p>
          </DynamicTooltip>
          <Switch checked={email} onChange={(value) => {
            if (!value) {
              setEmailValue([]);
            } else {
              setEmailValue(value => getInitValue());
            }
            setEmail(value);
          }
          } />
          {
            email && <>
              <Select
                allowCreate
                mode="multiple"
                placeholder="Please select"
                style={{ width: 345 }}
                defaultValue={getInitValue()}
                allowClear
                onChange={(value, _) => {
                  setEmailValue(value);
                }}>
                {[].map((option, index) => (
                  <Select.Option key={index} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>

            </>
          }
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
                  onRef={riceTextRef}
                  imgDownload={getSalesImgById} />
      </DynamicCard>
      <DynamicDivider />
      <DynamicCard title={t["workplace.drawer.details.schedule.history"]}>
        <WorkOrderHistory order={id} onRef={orderHistory} isLogin={true} />
      </DynamicCard>
    </Spin>
    <Button type={"primary"} shape="circle" size={"large"} icon={<IconToTop />} className={styles["toTop"]}
            onClick={toTop} />
  </div>;
};
