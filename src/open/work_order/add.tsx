import useLocale from "@/utils/useHook/useLocale";
import locale from "@/open/work_order/locale";
import React from "react";
import { useHistory } from "react-router";
import styles from "./style/add.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import {
  Button,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Message,
  Select,
  Tooltip,
  Typography
} from "@arco-design/web-react";
import DynamicDivider from "@/components/Dynamic/Divider";
import { IconArrowRise, IconExclamationCircle } from "@arco-design/web-react/icon";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import DynamicUpload from "@/components/Dynamic/Upload";
import axios from "axios";
import { postSalesFile } from "@/api/file";
import { DynamicImgUpload } from "@/components/Dynamic/Upload/img-upload";

const ImgType = [
  "image/png",
  "image/jpeg",
  "image/svg+xml"
];
const FileType = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "text/plain",
  "application/json",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-7z-compressed",
  "application/octet-stream"
];
const FormItem = Form.Item;
export default function WorkOrderAdd() {
  const t = useLocale(locale);
  const history = useHistory();
  const to_return = () => {
    history.push("/open/work_order");
  };
  const uploadData = (option) => {
    const { onProgress, file, onSuccess, onError } = option;
    const formData = new FormData();
    formData.append("file", file);
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
  const [form] = Form.useForm();
  const options = [
    {
      label: t["workplace.add.custom.product.stage.a"],
      key: 1
    },
    {
      label: t["workplace.add.custom.product.stage.b"],
      key: 2
    },
    {
      label: t["workplace.add.custom.product.stage.c"],
      key: 3
    },
    {
      label: t["workplace.add.custom.product.stage.d"],
      key: 4
    }
  ];
  return <div className={styles["main"]}>
    <div>
      <Button onClick={to_return}>{t["workplace.add.return"]}</Button>
    </div>
    <div className={styles["content"]}>
      <DynamicCard title={t["workplace.content.work_order.quality"]}>
        <Typography.Title heading={2}
                          className={styles["content-title"]}>{t["workplace.content.work_order.add"]}</Typography.Title>
        <Form autoComplete="off"
              colon={true}
              size={"large"}
              labelAlign={"right"}
              scrollToFirstError
        >
          <DynamicCard title={t["workplace.add.custom"]}>
            <FormItem label={t["workplace.add.custom.quality"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="customerQcPhone" label={t["workplace.add.custom.phone"]}
                             rules={[{ required: true }]}>
                    <Input placeholder="please enter you phone" maxLength={30} style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="customerQcEmail" rules={[{ required: true }]}
                             label={t["workplace.add.custom.email"]}>
                    <Input placeholder="please enter your email" maxLength={30} style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
            <FormItem label={t["workplace.add.custom.purchase"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="customerBuyerPhone" label={t["workplace.add.custom.phone"]}
                             rules={[{ required: true }]}>
                    <Input placeholder="please enter you phone" maxLength={30} style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="customerBuyerEmail" rules={[{ required: true }]}
                             label={t["workplace.add.custom.email"]}>
                    <Input placeholder="please enter your email" maxLength={30} style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
            <FormItem label={t["workplace.add.custom.espressif"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="espBusinessName" label={t["workplace.add.custom.name"]}
                             rules={[{ required: true }]}>
                    <Input placeholder="please enter espressif name" maxLength={30} style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="espBusinessEmail" rules={[{ required: true }]}
                             label={t["workplace.add.custom.email"]}>
                    <Input placeholder="please enter espressif email" maxLength={30} style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
          </DynamicCard>
          <DynamicDivider />


          <DynamicCard title={t["workplace.add.custom.product"]}>
            <FormItem label={t["workplace.add.custom.module"]} required>
              <Grid.Row align="center">
                <FormItem field="productType" noStyle={{ showErrorTip: true }} rules={[{ required: true }]}>
                  <Input placeholder="please enter Product number" maxLength={30} style={{ maxWidth: 400 }} />
                </FormItem>
                <Tooltip content={t["workplace.add.custom.module.help"]}>
                  <IconExclamationCircle style={{ margin: "0 8px", color: "rgb(var(--arcoblue-6))" }} />
                </Tooltip>
              </Grid.Row>
            </FormItem>
            <FormItem label={t["workplace.add.custom.product.number"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="productionNum" label={t["workplace.add.custom.product.number.actual"]}
                             rules={[{ required: true }]}>
                    <InputNumber placeholder="please enter espressif name" max={1000000} min={1}
                                 style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="failNum" rules={[{ required: true }]}
                             label={t["workplace.add.custom.product.number.defective"]}>
                    <InputNumber placeholder="please enter espressif email" max={100000} min={1}
                                 style={{ maxWidth: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
            <Form.Item field="occurDate" label={t["workplace.add.custom.product.date"]} rules={[{ required: true }]}>
              <DatePicker showTime style={{ maxWidth: 400 }} />
            </Form.Item>
            <Form.Item field="problemStage" label={t["workplace.add.custom.product.stage"]}
                       rules={[{ required: true }]}>
              <Select
                style={{ maxWidth: 400 }}
                placeholder="Please select">
                {options.map((option, index) => (
                  <Select.Option key={index} value={option.key}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item field="productionUsedNote" label={t["workplace.add.custom.product.description"]}>
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.description.help"]}
                              minLength={30} maxLength={200} style={{ minHeight: 128, maxWidth: 600 }} />
            </Form.Item>
          </DynamicCard>
          <DynamicDivider />
          <DynamicCard title={t["workplace.add.custom.product.issue"]}>
            <Form.Item field="productionFailState" label={t["workplace.add.custom.product.issue.description"]} required>
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.description.help"]}
                              minLength={50} maxLength={500} style={{ minHeight: 128, maxWidth: 600 }} />
            </Form.Item>
            <Form.Item field="imgIds" triggerPropName="fileList"
                       label={t["workplace.add.custom.product.issue.picture"]}>
              <DynamicImgUpload limit={5}
                                customRequest={uploadData}
                                onChange={(fileList: UploadItem[], file: UploadItem) => {
                                  form.setFieldValue("imgIds", file.response);
                                }} />
            </Form.Item>
            <Form.Item field="fileIds" label={t["workplace.add.custom.product.issue.appendix"]}>
              <DynamicUpload limit={5}
                             customRequest={uploadData}
                             tyepList={FileType}
                             listType={"text"}
                             onChange={(fileList: UploadItem[], file: UploadItem) => {
                               form.setFieldValue("fileIds", file.response);
                             }} />
            </Form.Item>
          </DynamicCard>
          <DynamicDivider />
          <Button type="primary"
                  size={"large"}
                  htmlType="submit"
                  icon={<IconArrowRise />}
          >
            {t["workplace.add.custom.upload"]}
          </Button>
        </Form>
      </DynamicCard>

    </div>
  </div>;
}
