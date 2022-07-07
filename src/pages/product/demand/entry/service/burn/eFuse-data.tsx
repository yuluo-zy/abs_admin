import React from "react";
import { Form, Input, InputNumber, Select, Tooltip } from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import DynamicUpload from "@/components/Dynamic/Upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";

const FormItem = Form.Item;
export default function EFuseData(props: { initialValues }) {
  const { initialValues } = props;
  const t = useLocale();
  const [form] = Form.useForm();
  return <Form
    className={style['efuse_data']}
    scrollToFirstError
    form={form}
    layout={'inline'}
    id={"firmware.burn.efuse.title"}
    initialValues={{ ...initialValues }}>
    <div className={style['efuse_data_detailed']}>
      <b>{t['demand.entry.service.burn.efuse.data.burn.info']}</b>
      <FormItem
        labelAlign={"left"}
        field="efuseDataSize"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.data.error"],
          }
        ]}
      >
        <InputNumber className={style['efuse_data_input']} placeholder={t["firmware.burn.flash.plan.data"]}/>
      </FormItem>
      <FormItem
        labelAlign={"left"}
        field="efuseBlk"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.address.error"]
          }
        ]}
      >
        <Select options={[{ label: "EFUSE_BLK 3", value: 3 },
          { label: "EFUSE_BLK 4", value: 4 },
          { label: "EFUSE_BLK 5", value: 5 },
          { label: "EFUSE_BLK 6", value: 6 },
          { label: "EFUSE_BLK 7", value: 7 },
          { label: "EFUSE_BLK 8", value: 8 },
          { label: "EFUSE_BLK 9", value: 9 }]}
                allowClear
                placeholder={"BLK"}
                className={style['efuse_data_select']}/>
      </FormItem>
      <FormItem
        labelAlign={"left"}
        field="efuseOkSerialLabel"
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.plan.output.error"]
          }
        ]}
      >
        <Input className={style['efuse_data_input']} allowClear placeholder={t["firmware.burn.flash.plan.output"]} />
      </FormItem>
    </div>
    <div className={style['efuse_data_upload']}>
      <Tooltip color={"#1380ea"} position={"rt"}
               defaultPopupVisible
               content={t["firmware.burn.hint.notice"]}>
      <b>{t['demand.entry.service.burn.efuse.data.burn.upload']}</b>
      </Tooltip>
      <FormItem
        field="efuseListCsvFile"
        triggerPropName='fileList'
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.list.error"]
          }
        ]}
      >
        <DynamicUpload title={t["firmware.burn.flash.file.bin.data.list"]} limit={1} onChange={(fileList: UploadItem[], file: UploadItem) => {
          if(fileList.length > 0){
            form.setFieldValue("efuseListCsvFile", file.response)
          }else {
            form.setFieldValue("efuseListCsvFile", undefined)
          }
        }}  />
      </FormItem>

      <FormItem
        field="efuseResultCsvFile"
        triggerPropName='fileList'
        rules={[
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.result.error"]
          },
        ]}
      >
        <DynamicUpload title={t["firmware.burn.flash.file.bin.data.result"]} limit={1} onChange={(fileList: UploadItem[], file: UploadItem) => {
          if(fileList.length > 0){
            form.setFieldValue("efuseResultCsvFile", file.response)
          }else {
            form.setFieldValue("efuseResultCsvFile", undefined)
          }
        }}  />
      </FormItem>
    </div>
  </Form>
}
