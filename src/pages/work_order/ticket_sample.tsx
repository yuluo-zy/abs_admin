import React, { useEffect, useState } from "react";
import { Button, Descriptions, Form, Image, Input, List, Message, Space } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import { DynamicImgUpload } from "@/components/Dynamic/Upload/img-upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import DynamicUpload from "@/components/Dynamic/Upload";
import axios from "axios";
import { postSalesFile } from "@/api/file";
import { IconArrowRise, IconEdit } from "@arco-design/web-react/icon";
import DynamicDivider from "@/components/Dynamic/Divider";
import styles from "./style/sample.module.less";
import DynamicPreviewImg from "@/open/work_order/preview";
import { DownloadButton } from "@/open/work_order/order-descriptions";

export default function Ticket_sample(props: {
  orderId: string
}) {
  const t = useLocale(locale);
  const { orderId } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<Record<string, any>>();
  useEffect(() => {
    // 添加请求内容
  }, []);
  const postData = () => {

  };
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
        Message.success(t["message.ok"]);
        onSuccess(result);
      }
    }).catch(() => {
      Message.error(t["message.error"]);
      onError(t["message.error"]);
    });
    return {
      abort() {
        source.cancel("cancel");
      }
    };
  };

  const [open, setOpen] = useState(false);
  const issueData = [
    {
      label: t["workplace.add.custom.product.other.description"],
      value: data?.productionOtherDemands
    },
    {
      label: t["workplace.add.custom.product.issue.picture.img"],
      value: <Space direction="vertical">
        <Image.PreviewGroup infinite>
          <Space>
            {data?.imgObjs && data?.imgObjs.map((src, index) => (
              <DynamicPreviewImg data={{
                id: src?.id,
                orderId: data?.id
              }} key={index} width={200} height={200} loader={true} />
            ))}
          </Space>
        </Image.PreviewGroup>
      </Space>
    },
    {
      label: t["workplace.add.custom.product.issue.appendix"],
      value:
        <List
          style={{ margin: "1rem" }}
          size="small"
          header={null}
          dataSource={data?.fileObjs}
          render={(item, index) => <List.Item key={index}>
            <Space size={"large"}>
              {item?.fileName}
              <DownloadButton id={item?.id} orderId={data?.id} />
            </Space>
          </List.Item>}
        />
    }
  ];

  return <div style={{ padding: "1rem" }}>
    {!open && <Button type={"primary"} className={styles["edit"]} icon={<IconEdit />} onClick={() => {
      setOpen(value => !value);
    }
    }>edit</Button>}
    {open && <Form autoComplete="off"
                   colon={true}
                   form={form}
                   size={"large"}
                   onSubmit={postData}
                   labelAlign={"left"}
                   scrollToFirstError
    >
      <Form.Item field="other"
                 label={t["workplace.add.custom.product.other.description"]}
      >
        <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.other.description.info"]}
                        maxLength={500} style={{ minHeight: 128, maxWidth: 500 }} />
      </Form.Item>
      <Form.Item field="imgIds" triggerPropName="fileList"
                 extra="Only allow upload of .png .jpeg"
                 label={t["workplace.add.custom.product.issue.picture.img"]}>
        <DynamicImgUpload limit={5}
                          customRequest={uploadData}
                          onChange={(fileList: UploadItem[], file: UploadItem) => {
                            form.setFieldValue("imgIds", fileList);
                          }} />
      </Form.Item>

      <Form.Item field="fileIds" label={t["workplace.add.custom.product.issue.appendix"]}
                 extra="Only allow upload of .rar .zip  .pdf .doc. And the maximum upload file is 20M.">
        <DynamicUpload limit={5}
                       customRequest={uploadData}
                       listType={"text"}
                       onChange={(fileList: UploadItem[], file: UploadItem) => {
                         form.setFieldValue("fileIds", fileList);
                       }} />
      </Form.Item>
      <DynamicDivider />
      <div className={styles["upload-data"]}>
        <Button type="primary"
                size={"large"}
                htmlType="submit"
                className={styles["upload-data"]}
                icon={<IconArrowRise />}
        >{t["workplace.add.custom.upload.info"]}</Button>
      </div>
    </Form>}
    {!open && <div>
      <Descriptions
        column={1}
        colon={" : "}
        labelStyle={{ textAlign: "right", paddingRight: 36 }}
        data={issueData}
      />
    </div>}
  </div>;
}
