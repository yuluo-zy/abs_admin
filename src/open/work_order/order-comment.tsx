import React, { useRef, useState } from "react";
import WorkOrderHistory from "@/pages/work_order/order_history";
import { Button, Message, Popconfirm } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import RiceText from "@/rice_text";
import axios from "axios";
import { getSalesInfo, postSalesFile } from "@/api/file";
import DynamicDivider from "@/components/Dynamic/Divider";
import { getFileID } from "@/utils/parseJson";
import { addAfterSaleComment } from "@/api/cqapms";
import { IconPlus } from "@arco-design/web-react/icon";
import styles from "./style/comment.module.less";

interface Comment {
  orderId: string;
}

export const OrderComment: React.FC<Comment> = (props) => {
  const { orderId } = props;
  const [open, setOpen] = useState(false);
  const orderHistory = useRef<any>();
  const t = useLocale(locale);
  const [riceText, setRiceText] = useState<Record<string, any>>();

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

  const postData = () => {
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
      sendEmail: true
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
        {open &&
          <Popconfirm
            title={t["work.order.operate.order.add.help"]}
            onOk={() => {
              postData();
            }}
          >
            <Button type={"primary"} icon={<IconPlus />}>{t["work.order.operate.order.add"]}</Button>
          </Popconfirm>}
      </div>
      {open && <>
        <RiceText onChange={setRiceText} readOnly={false}
                  fileUpload={uploadData}
                  fileDownload={getSalesInfoById}
                  imgUpload={uploadData}
                  onRef={riceTextRef}
                  imgDownload={getSalesImgById} />
        <DynamicDivider />
      </>}
    </div>
    <WorkOrderHistory order={orderId} onRef={orderHistory} />
  </div>;
};
