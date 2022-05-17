import React from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Alert, Divider, Form, Input } from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import style from "./style/index.module.less";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import ProductStore from "@/store/product";
import shallow from "zustand/shallow";

const FormItem = Form.Item;
const bodyStyle = {
  padding: "3rem"
};

const maxWidth = {
  maxWidth: "20rem"
}

export default function PreFit() {
  const [form] = Form.useForm();
  const t = useLocale();
  const [fitData, setFitData] = ProductStore(state => [state.fitData, state.setFitData], shallow);
  const demandId = ProductStore(state => state.demandId);

  const postFitCustom = () => {

  }
  const setValue = (key, value) => {
    form.setFieldValue(key, value);
    const temp = {};
    temp[key] = value;
    setFitData({
      ...temp
    });
  };


  return (<DynamicOuterCard title={t["firmware.pre.title"]} bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form
        scrollToFirstError
        form={form}
        initialValues={{ ...fitData }}
        onSubmit={postFitCustom}
      >

          <FormItem label={t["firmware.pre.email"]}
                    labelCol={{ span: 4 }}
                    labelAlign={"left"}
                    field="type"

                    rules={[
                      {
                        required: true,
                        message: t["firmware.pre.email.error"]
                      }
                    ]}
          >
            <Input   style={maxWidth}/>
          </FormItem>

        <Divider style={{ borderBottomStyle: "dashed" }} />
        <b>{t['firmware.pre.ca.setting.config.title']}</b>
        <br/>
        <FormItem label={t["firmware.pre.ca.setting.config.type"]}
                  labelAlign={"left"}
                  field={"isAdapt"}
                  rules={[{ required: true, message: t['firmware.pre.ca.setting.config.type.error'] }]}>

          <DynamicRadioGroup direction="vertical"
                             defaultValue={fitData?.isAdapt}
                             options={[{
                               label: t['firmware.pre.ca.setting.config.type.custom'],
                               value: 1
                             }, {
                               label: t['firmware.pre.ca.setting.config.type.no.custom'],
                               value: 0
                             }]}
                             onChange={(value) => {
                               setValue("isAdapt", value);}}
                               />
          {fitData?.isAdapt === 0 && <Alert className={style["context-text"]} closable
                  content={t["firmware.pre.ca.setting.config.type.no.custom.info"]}
                  style={{ maxWidth: "30rem", marginBottom: 20 }} closeElement="Close" />}
        </FormItem>

        {fitData?.isAdapt === 1 && <FormItem label={t["firmware.pre.ca.setting.config.type.transmission.method"]}
                   labelAlign={"left"}
                   field={"transmissionMethod"}
                   rules={[{ required: true, message: t["firmware.pre.ca.setting.config.type.transmission.method.error"] }]}>

          <DynamicRadioGroup direction="vertical"
                             defaultValue={fitData?.transmissionMethod}
                             options={[{
                               label: 'PGP',
                               value: 'PGP'
                             }, {
                               label: 'YUBIKEY',
                               value: 'YUBIKEY'
                             }]}
                             onChange={(value) => {
                               setValue("transmissionMethod", value);
                             }}
          />
        </FormItem>}
        {/*<Divider style={{ borderBottomStyle: "dashed" }} />*/}
        {/*<Space size={20} direction={"vertical"}>*/}
        {/*  <Typography.Title heading={5} type="primary">*/}
        {/*    {t["firmware.mac.partitions.flash.write.area.title"]}*/}
        {/*  </Typography.Title>*/}
        {/*  <FormItem label={t["firmware.mac.partitions.start"]}*/}
        {/*            field={"macStart"}*/}
        {/*            labelCol={{ span: 3 }}*/}
        {/*            labelAlign={"left"}*/}
        {/*            rules={[*/}
        {/*              {*/}
        {/*                required: true,*/}
        {/*                message: t["firmware.mac.partitions.start.error"],*/}
        {/*                length: 17*/}
        {/*              }*/}
        {/*            ]}>*/}
        {/*    <Input value={macData?.macStart} onChange={getMacStartInfo} style={{ maxWidth: "20rem" }} />*/}
        {/*  </FormItem>*/}

        {/*  <FormItem label={t["firmware.mac.partitions.end"]}*/}
        {/*            field={"macEnd"}*/}
        {/*            labelCol={{ span: 3 }}*/}
        {/*            labelAlign={"left"} rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*      message: t["firmware.mac.partitions.end.error"],*/}
        {/*      length: 17*/}
        {/*    }*/}
        {/*  ]}*/}
        {/*  >*/}
        {/*    <Input value={macData?.macEnd} onChange={getMacEndInfo} style={{ maxWidth: "20rem" }} />*/}
        {/*  </FormItem>*/}
        {/*  <br />*/}
        {/*  <Space size={10}>*/}
        {/*    <Typography.Text>{t["firmware.mac.partitions.info1"]}</Typography.Text>*/}
        {/*    <Tag color="arcoblue" checkable={false}>{getMacNumber(macData?.macStart, macData?.macEnd)}</Tag>*/}
        {/*    <Typography.Text>{t["firmware.mac.partitions.info2"]}</Typography.Text>*/}
        {/*    <Tag color="arcoblue"*/}
        {/*         checkable={false}>{getProjectNumber(macData?.macStart, macData?.macEnd, macData?.macNumPerProduction)}</Tag>*/}
        {/*    <Typography.Text>{t["firmware.mac.partitions.info3"]}</Typography.Text>*/}
        {/*  </Space>*/}
        {/*</Space>*/}
        {/*<Alert className={style["context-warn"]} type="warning" closable content={t["firmware.mac.partitions.warn"]}*/}
        {/*       style={{ maxWidth: "30rem", marginBottom: 20 }} closeElement="Close" />*/}
        {/*<Divider style={{ borderBottomStyle: "dashed" }} />*/}
        {/*<div className={style["context-next"]}>*/}
        {/*  <Button type="primary"*/}
        {/*          size={"large"}*/}
        {/*          htmlType="submit"*/}
        {/*          icon={<IconArrowRight />}*/}

        {/*  >*/}
        {/*    {t["hardware.production.info.next"]}*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Form>
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
