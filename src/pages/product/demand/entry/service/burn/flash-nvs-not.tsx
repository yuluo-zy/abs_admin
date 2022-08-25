import React from "react";
import { Form, Input, Tooltip } from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import DynamicUpload from "@/components/Dynamic/Upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";

const FormItem = Form.Item;
export default function FlashNvsNot(props: { initialValues }) {
  const { initialValues } = props;
  const t = useLocale();
  const [form] = Form.useForm();

  return <Form
    className={style["efuse_data"]}
    scrollToFirstError
    form={form}
    layout={"inline"}
    id={"firmware.burn.flash.title"}
    initialValues={{ ...initialValues }}>
    <div className={style["efuse_data_detailed"]}>
      <b>{t["demand.entry.service.burn.efuse.data.burn.info"]}</b>
      <FormItem
        labelAlign={"left"}
        field="flashDataSize"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.data.error"]
          }
        ]}
      >
        <Input maxLength={20} className={style["efuse_data_input"]} placeholder={t["firmware.burn.flash.plan.data"]} />
      </FormItem>
      <FormItem
        labelAlign={"left"}
        field="burnOffset"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.address.error"],
            minLength: 1
          }
        ]}
      >
        <Input className={style["efuse_data_input"]} allowClear placeholder={t["firmware.burn.flash.plan.address"]} />
      </FormItem>
      <FormItem
        labelAlign={"left"}
        field="flashOkSerialLabel"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.output.error"],
            minLength: 2
          }
        ]}
      >
        <Input maxLength={20} className={style["efuse_data_input"]} allowClear
               placeholder={t["firmware.burn.flash.plan.output"]} />
      </FormItem>
    </div>
    <div className={style["efuse_data_upload"]}>
      <Tooltip color={"#1380ea"} position={"rt"}
               defaultPopupVisible
               content={t["firmware.burn.hint.notice"]}>
        <b>{t["demand.entry.service.burn.efuse.data.burn.upload"]}</b>
      </Tooltip>
      <FormItem
        field="configFile"
        triggerPropName="fileList"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.config.error"]
          }
        ]}>
        <DynamicUpload title={t["firmware.burn.flash.file.bin.data.config"]} limit={1}
                       onChange={(fileList: UploadItem[], file: UploadItem) => {
                         if (fileList.length > 0) {
                           form.setFieldValue("configFile", file.response);
                         } else {
                           form.setFieldValue("configFile", undefined);
                         }
                       }} />
      </FormItem>
      <FormItem
        field="valuesFile"
        triggerPropName="fileList"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.values.error"]
          }
        ]}>
        <DynamicUpload title={t["firmware.burn.flash.file.bin.data.values"]} limit={1}
                       onChange={(fileList: UploadItem[], file: UploadItem) => {
                         if (fileList.length > 0) {
                           form.setFieldValue("valuesFile", file.response);
                         } else {
                           form.setFieldValue("valuesFile", undefined);
                         }
                       }} />
      </FormItem>
      <FormItem
        field="sampleBinFile"
        triggerPropName="fileList"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.bin.error"]
          }
        ]}>
        <DynamicUpload title={t["firmware.burn.flash.plan.bin"]} limit={1}
                       onChange={(fileList: UploadItem[], file: UploadItem) => {
                         if (fileList.length > 0) {
                           form.setFieldValue("sampleBinFile", file.response);
                         } else {
                           form.setFieldValue("sampleBinFile", undefined);
                         }
                       }} />
      </FormItem>
    </div>
  </Form>;
}
