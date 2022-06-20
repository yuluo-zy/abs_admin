import React from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Message,
  Space,
  Tag,
  Typography
} from '@arco-design/web-react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicRadioGroup from '@/components/Dynamic/Radio';
import style from './style/index.module.less';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import { ProductStore } from '@/store/product';
import shallow from 'zustand/shallow';
import { convertToNumber, getMac } from '@/utils/stringTools';
import { IconArrowRight } from '@arco-design/web-react/icon';
import { postMacCustomDemand } from '@/api/demand';
import { getNextRouter } from '@/utils/getNext';
import { useHistory } from 'react-router';

const FormItem = Form.Item;
const bodyStyle = {
  padding: "3rem"
};



export default function CustomMac() {
  const [form] = Form.useForm();
  const t = useLocale();
  const history = useHistory();
  const [macData, setMacData] = ProductStore(state => [state.macData, state.setMacData], shallow);
  const [demandId, serviceType] = ProductStore(state => [state.demandId, state.serviceType], shallow);
  const getMacStartInfo = (value) => {
    const temp = getMac(value, macData?.macStart || "");
    setMacData({
      macStart: temp
    });
    form.setFieldValue("macStart", temp);
  };
  const getMacEndInfo = (value) => {
    const temp = getMac(value, macData?.macEnd || "");
    setMacData({
      macEnd: temp
    });
    form.setFieldValue("macEnd", temp);
  };

  const getMacNumber = (start, end) => {
    return (convertToNumber(end) - convertToNumber(start)).toLocaleString("en-US");
  };
  const getProjectNumber = (start, end, project) => {
    return Math.floor((convertToNumber(end) - convertToNumber(start)) / project * 0.998).toLocaleString("en-US");
  };

  const postMacCustom = () => {
    try {
      form.validate();
    } catch (error) {
      return;
    }
    let temp ={
      ...macData,
      ...form.getFieldsValue()
    }
    
    postMacCustomDemand({
      ...temp,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        setMacData({
          id: res.data.result,
          ...temp
        });
        history.push(getNextRouter(1, serviceType))
        Message.success(t["submit.hardware.success"]);
      }
    });
  };

  return (<DynamicOuterCard title={t["firmware.mac.title"]} bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form
        scrollToFirstError
        form={form}
        initialValues={{ ...macData }}
        onSubmit={postMacCustom}
      >

        <div className={style["context"]}>
          <Alert type="warning" className={style["context-text"]} closable
                 content={t["firmware.mac.partitions.write.area.efuse"]}
                 style={{ maxWidth: "30rem", marginBottom: 20 }} closeElement="Close" />
          <FormItem label={t["firmware.mac.partitions.write.area"]}
                    labelCol={{ span: 4 }}
                    labelAlign={"left"}
                    field="type"
                    rules={[
                      {
                        required: true,
                        message: t["firmware.mac.partitions.write.area.error"]
                      }
                    ]}
          >
            <DynamicRadioGroup direction="vertical"
                               defaultValue={macData?.type}
                               options={[{
                                 label: "Flash",
                                 value: "FLASH"
                               }, {
                                 label: "efuse",
                                 value: "EFUSE"
                               }]}
                               onChange={(value) => {
                                 form.setFieldValue("type", value);
                                 setMacData({
                                   type: value
                                 });
                               }}

            />
          </FormItem>
          {
            macData?.type === "FLASH" &&
            <FormItem label={t["firmware.mac.partitions.flash.write.area"]}
                      field={"offsetAddr"}
                      labelCol={{ span: 4 }}
                      labelAlign={"left"}
                      rules={[
                        {
                          required: true,
                          message: t["firmware.mac.partitions.flash.write.area.error"],
                          validator: (value, callback) => {
                            if ((value === undefined || value === "") && macData?.type === "FLASH") {
                              callback(t["firmware.mac.partitions.flash.write.area.error"]);
                            }
                          }
                        }
                      ]}>
              <Input
                style={{ width: 300 }}
                placeholder="Please Enter Offset Address"
              />
            </FormItem>
          }
        </div>
        <Divider style={{ borderBottomStyle: "dashed" }} />
        <FormItem label={t["firmware.mac.partitions.flash.write.area.mac"]}
                  labelCol={{ span: 5 }}
                  labelAlign={"left"}
                  field={"macNumPerProduction"}
                  rules={[{ required: true, type: "number", min: 1, max: 4 }]}>
          <InputNumber
            mode="button"
            style={{ width: "10rem" }}
            min={1}
            max={4}
            onChange={(value) => {
              form.setFieldValue("macNumPerProduction", value);
              setMacData({
                macNumPerProduction: value
              });
            }}
          />
        </FormItem>
        <Divider style={{ borderBottomStyle: "dashed" }} />
        <Space size={20} direction={"vertical"}>
          <Typography.Title heading={5} type="primary">
            {t["firmware.mac.partitions.flash.write.area.title"]}
          </Typography.Title>
          <FormItem label={t["firmware.mac.partitions.start"]}
                    field={"macStart"}
                    labelCol={{ span: 3 }}
                    labelAlign={"left"}
                    rules={[
                      {
                        required: true,
                        message: t["firmware.mac.partitions.start.error"],
                        length: 17
                      }
                    ]}>
            <Input value={macData?.macStart} onChange={getMacStartInfo} style={{ maxWidth: "20rem" }} />
          </FormItem>

          <FormItem label={t["firmware.mac.partitions.end"]}
                    field={"macEnd"}
                    labelCol={{ span: 3 }}
                    labelAlign={"left"} rules={[
            {
              required: true,
              message: t["firmware.mac.partitions.end.error"],
              length: 17
            }
          ]}
          >
            <Input value={macData?.macEnd} onChange={getMacEndInfo} style={{ maxWidth: "20rem" }} />
          </FormItem>
          <br />
          <Space size={10}>
            <Typography.Text>{t["firmware.mac.partitions.info1"]}</Typography.Text>
            <Tag color="arcoblue" checkable={false}>{getMacNumber(macData?.macStart, macData?.macEnd)}</Tag>
            <Typography.Text>{t["firmware.mac.partitions.info2"]}</Typography.Text>
            <Tag color="arcoblue"
                 checkable={false}>{getProjectNumber(macData?.macStart, macData?.macEnd, macData?.macNumPerProduction)}</Tag>
            <Typography.Text>{t["firmware.mac.partitions.info3"]}</Typography.Text>
          </Space>
        </Space>
        <Alert className={style["context-warn"]} type="warning" closable content={t["firmware.mac.partitions.warn"]}
               style={{ maxWidth: "30rem", marginBottom: 20 }} closeElement="Close" />
        <Divider style={{ borderBottomStyle: "dashed" }} />
        <div className={style["context-next"]}>
          <Button type="primary"
                  size={"large"}
                  htmlType="submit"
                  icon={<IconArrowRight />}

          >
            {t["hardware.production.info.next"]}
          </Button>
        </div>
      </Form>
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
