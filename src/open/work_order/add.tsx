import useLocale from "@/utils/useHook/useLocale";
import locale from "@/open/work_order/locale";
import React from "react";
import { useHistory } from "react-router";
import styles from "./style/add.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import {
  Alert,
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Message,
  Modal,
  Select,
  Space,
  Tooltip,
  Typography
} from "@arco-design/web-react";
import DynamicDivider from "@/components/Dynamic/Divider";
import { IconArrowRise, IconExclamationCircle, IconHome } from "@arco-design/web-react/icon";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import DynamicUpload from "@/components/Dynamic/Upload";
import axios from "axios";
import { postSalesFile } from "@/api/file";
import { DynamicImgUpload } from "@/components/Dynamic/Upload/img-upload";
import { saveAfterSale } from "@/api/cqapms";
import { Link } from "react-router-dom";

const BreadcrumbItem = Breadcrumb.Item;
const FileType = [
  "image/png",
  "image/jpeg",
  // "image/svg+xml",
  // "text/plain",
  // "application/json",
  // "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/x-rar-compressed",
  "application/x-tar",
  // "application/vnd.ms-excel",
  // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-7z-compressed"
  // "application/octet-stream"
];
const bodyStyle = {
  padding: "1rem",
  paddingBottom: 0,
  paddingTop: 20,
  overflow: "auto"
};
const FormItem = Form.Item;
export default function WorkOrderAdd() {
  const t = useLocale(locale);
  const history = useHistory();
  const to_return = () => {
    history.push("/open/cqms");
  };
  const success = (value) => {
    Modal.success({
      title: t["workplace.content.work_order.success"],
      content: (<div>
        <Typography.Paragraph>{t["workplace.content.work_order.success.content"]}</Typography.Paragraph>
        <DynamicDivider />
        <Typography.Paragraph>{t["workplace.content.work_order.success.key"]}</Typography.Paragraph>
        <DynamicDivider />
        <div className={styles["copy"]}>
          <Typography.Paragraph copyable>{value}</Typography.Paragraph>
        </div>

      </div>),
      onOk: to_return,
      maskClosable: false,
      escToExit: false,
      focusLock: true,
      unmountOnExit: false,
      style: {
        width: 600
      }
    });
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
  const roleOptions = [

    {
      label: t["workplace.add.custom.role.a"],
      key: "1"
    },
    {
      label: t["workplace.add.custom.role.b"],
      key: "2"
    },

    {
      label: t["workplace.add.custom.role.c"],
      key: "3"
    },
    {
      label: t["workplace.add.custom.role.d"],
      key: "4"
    },
    {
      label: t["workplace.add.custom.role.e"],
      key: "5"
    }

  ];
  const postData = async () => {
    try {
      await form.validate();
    } catch (error) {
      Message.error(t["message.post.error"]);
      return;
    }
    const temp = {
      ...form.getFieldsValue()
    };
    if (temp?.fileIds) {
      const fileTemp = [];
      for (const i of temp?.fileIds) {
        fileTemp.push(i?.response?.id);
      }
      temp.fileIds = fileTemp.toString();
    }
    if (temp?.imgIds) {
      const fileTemp = [];
      for (const i of temp?.imgIds) {
        fileTemp.push(i?.response?.id);
      }
      temp.imgIds = fileTemp.toString();
    }
    saveAfterSale({
      ...temp
    }).then(res => {
      if (res.data.success) {
        form.setFieldValue("id", res.data.result?.id);
        Message.success(t["message.ok"]);
        success(res.data.result?.id);
      }
    });
  };
  return <div className={styles["main"]}>
    <div className={styles["breadcrumb"]}>
      <Space size={40}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={"/open/cqms"}> <IconHome /></Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{t["workplace.content.work_order.add"]}</BreadcrumbItem>
          <BreadcrumbItem>{t["workplace.content.work_order.cq"]}</BreadcrumbItem>
        </Breadcrumb>
      </Space>
      <Button onClick={to_return} type={"primary"} size={"large"} shape={"round"}>{t["workplace.add.return"]}</Button>
    </div>
    <div className={styles["content"]} id={"custom_back_top"}>
      <DynamicCard title={t["workplace.content.work_order.quality"]}>
        <Form autoComplete="off"
              colon={true}
              form={form}
              size={"large"}
              onSubmit={postData}
              labelAlign={"right"}
              scrollToFirstError
        >
          <DynamicCard bodyStyle={bodyStyle} title={t["workplace.add.custom.product"]}>
            <div className={styles["alertFrist"]}>
              <Alert closable content={t["workplace.add.custom.type.help"]} />
            </div>
            <FormItem label={t["workplace.add.custom.module"]} required>
              <Grid.Row align="center">
                <FormItem field="productType" noStyle={{ showErrorTip: true }}
                          rules={[{ required: true, message: t["workplace.add.custom.module.error"] }]}>
                  <Input placeholder="e.g. ESP32-WROOM-32E" maxLength={30} style={{ maxWidth: 350 }} />
                </FormItem>
                <Tooltip content={t["workplace.add.custom.module.help"]}>
                  <IconExclamationCircle style={{ margin: "0 8px", color: "rgb(var(--arcoblue-6))" }} />
                </Tooltip>
              </Grid.Row>
            </FormItem>

            <Form.Item field="productionUsedNote" label={t["workplace.add.custom.product.description"]}>
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.description.help"]}
                              minLength={10} maxLength={200} style={{ minHeight: 128, maxWidth: 650 }} />
            </Form.Item>
          </DynamicCard>
          <DynamicDivider style={{ margin: "5px 0", borderBottomStyle: "dashed" }} />
          <DynamicCard title={t["workplace.add.custom"]} bodyStyle={bodyStyle}>
            <Form.Item field="customerCompanyName"
                       label={t["workplace.add.custom.custom.company"]}
                       rules={[{
                         required: true,
                         message: t["workplace.add.custom.custom.company.error"]
                       }]}>
              <Input placeholder="Please enter your company name" maxLength={30} style={{ maxWidth: 350 }} />
            </Form.Item>
            <Form.Item field="customerRole" label={t["workplace.add.custom.role"]}
                       rules={[{ required: true, message: t["workplace.add.custom.role.error"] }]}>
              <Select
                style={{ maxWidth: 350 }}
                placeholder="Please select">
                {roleOptions.map((option, index) => (
                  <Select.Option key={index} value={option.key}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <FormItem label={t["workplace.add.custom.custom.order.title"]} required>
              <Space size={"large"}>
                <Form.Item field="customerName"
                           rules={[{ required: true, message: t["workplace.add.custom.custom.name.error"] }]}>
                  <Input placeholder="Your name" maxLength={30} />
                </Form.Item>
                <Form.Item field="customerEmail"
                           rules={[{ required: true, message: t["workplace.add.custom.email.error"] }]}
                >
                  <Input placeholder="Your email" maxLength={30} style={{ width: 300 }} />
                </Form.Item>
                <Form.Item field="customerPhone"
                           rules={[{
                             required: true,
                             message: t["workplace.add.custom.custom.order.error"]
                           }]}>
                  <Input placeholder="Your phone number" maxLength={30} />
                </Form.Item>
              </Space>
            </FormItem>


            <div className={styles["alert"]}>
              <Alert closable content={t["workplace.add.custom.info.help"]} />
            </div>


            <FormItem label={t["workplace.add.custom.quality"]}>
              <Space size={"large"}>
                <Form.Item field="customerQcName">
                  <Input placeholder="QC name" maxLength={30} style={{ maxWidth: 200 }} />
                </Form.Item>
                <Form.Item field="customerQcEmail">
                  <Input placeholder="QC email" maxLength={30} style={{ width: 300 }} />
                </Form.Item>
                <Form.Item field="customerQcPhone">
                  <Input placeholder="QC phone" maxLength={30} style={{ maxWidth: 270 }} />
                </Form.Item>
              </Space>
            </FormItem>

            <FormItem label={t["workplace.add.custom.purchase"]}>
              <Space size={"large"}>
                <Form.Item field="customerBuyerName">
                  <Input placeholder="Buyer name" maxLength={30} />
                </Form.Item>
                <Form.Item field="customerBuyerEmail">
                  <Input placeholder="Buyer email" maxLength={30} style={{ width: 300 }} />
                </Form.Item>
                <Form.Item field="customerBuyerPhone">
                  <Input placeholder="Buyer phone" maxLength={30} />
                </Form.Item>
              </Space>
            </FormItem>


            <FormItem label={t["workplace.add.custom.espressif"]} required>
              <Space size={"large"}>
                <Form.Item field="espBusinessName"
                           rules={[{ required: true, message: t["workplace.add.custom.espressif.error"] }]}>
                  <Input placeholder="Espressif business name" maxLength={30} style={{ maxWidth: 200 }} />
                </Form.Item>
                <Form.Item field="espBusinessEmail"
                           layout={"vertical"}
                           rules={[{ required: true, message: t["workplace.add.custom.espressif.email.error"] }]}
                >
                  <Input placeholder="Espressif business email" maxLength={30} style={{ width: 300 }} />
                </Form.Item>
              </Space>
            </FormItem>
          </DynamicCard>


          <DynamicDivider style={{ margin: "2px 0", borderBottomStyle: "dashed" }} />
          <DynamicCard bodyStyle={bodyStyle} title={t["workplace.add.custom.product.issue"]}>
            <div className={styles["alert"]}>
              <Alert closable content={t["workplace.add.custom.product.help"]} />
            </div>
            <Form.Item field="occurDate" label={t["workplace.add.custom.product.date"]}
                       rules={[{ required: true, message: t["workplace.add.custom.product.date.error"] }]}>
              <DatePicker style={{ width: 350 }} />
            </Form.Item>

            {/*<FormItem label={t["workplace.add.custom.product.number"]} required>*/}
            {/*  <Grid.Row gutter={8}>*/}
            {/*    <Grid.Col span={12}>*/}
            <Form.Item field="productionNum" label={t["workplace.add.custom.product.number.actual"]}
                       rules={[{ required: true, message: t["workplace.add.custom.product.number.actual.error"] }]}>
              <InputNumber
                precision={0}
                step={1}
                suffix="pcs"
                placeholder="Please enter production quantity"
                max={10000000}
                min={1}
                style={{ maxWidth: 350 }} />
            </Form.Item>

            <Form.Item field="failNum"
                       rules={[{ required: true, message: "workplace.add.custom.product.number.defective.error" }]}
                       label={t["workplace.add.custom.product.number.defective"]}>
              <InputNumber
                precision={0}
                step={1}
                suffix="pcs"
                placeholder="Please enter quantity of defective products"
                max={1000000} min={1}
                style={{ maxWidth: 350 }} />
            </Form.Item>

            <Form.Item field="problemStage" label={t["workplace.add.custom.product.stage"]}
                       rules={[{ required: true, message: t["workplace.add.custom.product.stage.error"] }]}>
              <Select
                style={{ maxWidth: 350 }}
                placeholder="Please select">
                {options.map((option, index) => (
                  <Select.Option key={index} value={option.key}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item field="productionFailState"
                       label={t["workplace.add.custom.product.issue.description"]}
                       rules={[{
                         required: true,
                         minLength: 20,
                         message: t["workplace.add.custom.product.issue.description.error"]
                       }]}>
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.issue.description.info"]}
                              minLength={20} maxLength={500} style={{ minHeight: 128, maxWidth: 650 }} />
            </Form.Item>
            <Form.Item field="productionOtherDemands"
                       label={t["workplace.add.custom.product.other.description"]}
            >
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.other.description.info"]}
                              maxLength={500} style={{ minHeight: 128, maxWidth: 650 }} />
            </Form.Item>

            <Form.Item field="imgIds" triggerPropName="fileList"
                       extra="Only allow upload of .png .jpeg"
                       label={t["workplace.add.custom.product.issue.picture"]}>
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
                             fileType={FileType}
                             listType={"text"}
                             onChange={(fileList: UploadItem[], file: UploadItem) => {
                               form.setFieldValue("fileIds", fileList);
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
  ;
}
