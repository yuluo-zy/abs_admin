import React, { useRef, useState } from "react";
import WorkOrderHistory from "@/pages/work_order/order_history";
import { Button, Form, Input, Message, Popconfirm, Tooltip } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import RiceText from "@/rice_text";
import axios from "axios";
import { getSalesInfo, postSalesFile } from "@/api/file";
import DynamicDivider from "@/components/Dynamic/Divider";
import { getFileID } from "@/utils/parseJson";
import { addAfterSaleComment } from "@/api/cqapms";
import { IconExclamationCircle, IconPlus } from "@arco-design/web-react/icon";
import styles from "./style/comment.module.less";
import useForm from "@arco-design/web-react/es/Form/useForm";

interface Comment {
  orderId: string;
}

const FormItem = Form.Item;

export const OrderComment: React.FC<Comment> = (props) => {
  const { orderId } = props;
  const [open, setOpen] = useState(false);
  const orderHistory = useRef<any>();
  const t = useLocale(locale);
  const [riceText, setRiceText] = useState<Record<string, any>>();
  const [form] = useForm();

  const uploadData = (option) => {
    const { onProgress, file, onSuccess, onError } = option;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", orderId);
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
      orderId: orderId
    });
  };

  const getSalesImgById = (data) => {
    return getSalesInfo({
      id: data,
      orderId: orderId
    });
  };

  const riceTextRef = useRef<any>();

  const postData = async () => {
    try {
      await form.validate();
    } catch (e) {
      Message.error(t["work.order.operate.order.add.error"]);
      return;
    }
    let data = "";
    if (riceText === null) {
      Message.error(t["work.order.operate.order.add.error"]);
      return;
    }
    if (riceText) {
      data = JSON.stringify(riceText.toJSON());
    }
    const fileList = getFileID(riceText.toJSON());
    addAfterSaleComment({
      afterSaleOrderId: orderId,
      commentText: data,
      fileUuids: fileList,
      internal: false,
      sendEmail: true,
      ...form.getFields()
    }).then(res => {
      if (res.data.success) {
        Message.success("Successful operation");
        setRiceText(null);
        riceTextRef.current?.clear();
        orderHistory.current?.update();
        setOpen(value => !value);
      }
    });
  };

  return <div>
    <div>
      <div className={styles["tool-button"]}>
        {!open && <Button status="success" onClick={() => setOpen(value => !value)}>
          {t["work.order.operate.order.add"]}
        </Button>}
      </div>
      {open && <div>
        <b className={styles["title"]}>{t["work.order.operate.order.add.info"]}
          <Tooltip content={t["work.order.operate.order.add.info.help"]}>
            <IconExclamationCircle style={{ margin: "0 8px", color: "rgb(var(--arcoblue-6))" }} />
          </Tooltip>
        </b>
        <Form form={form} autoComplete="off" layout="inline" className={styles["form-table"]}>
          <FormItem label={t["work.order.operate.order.add.info.name"]} field="username" rules={[{ required: true }]}>
            <Input style={{ width: 200 }} placeholder="please enter your name" />
          </FormItem>
          <FormItem label={t["work.order.operate.order.add.info.phone"]} field="userPhone">
            <Input style={{ width: 200 }} placeholder="please enter your phone" />
          </FormItem>
          <FormItem label={t["work.order.operate.order.add.info.email"]} field="userEmail">
            <Input style={{ width: 200 }} placeholder="please enter your email" />
          </FormItem>
        </Form>
        <b className={styles["title"]}>{t["work.order.operate.order.add.info.context"]}</b>
        <RiceText onChange={setRiceText} readOnly={false}
                  fileUpload={uploadData}
                  fileDownload={getSalesInfoById}
                  imgUpload={uploadData}
                  onRef={riceTextRef}
                  imgDownload={getSalesImgById} />
        <div className={styles["tool-update"]}>
          <Popconfirm
            title={t["work.order.operate.order.add.help"]}
            onOk={() => {
              postData();
            }}
          >
            <Button type={"primary"} icon={<IconPlus />}>{t["work.order.operate.order.add"]}</Button>
          </Popconfirm>
        </div>

        <DynamicDivider />
      </div>
      }
    </div>
    <WorkOrderHistory order={orderId} onRef={orderHistory} />
  </div>;
};
