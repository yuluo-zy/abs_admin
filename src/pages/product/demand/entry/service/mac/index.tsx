import React from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
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
} from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import style from "./style/index.module.less";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { convertToNumber, getMac } from "@/utils/stringTools";
import { IconArrowRight } from "@arco-design/web-react/icon";
import { postMacCustomDemand } from "@/api/demand";
import { getNextRouter } from "@/utils/getNext";
import { useHistory } from "react-router";
import DynamicDivider from "@/components/Dynamic/Divider";

const FormItem = Form.Item;

export default function CustomMac() {
  const [form] = Form.useForm();
  const t = useLocale();
  const history = useHistory();
  const [macData, setMacData] = ProductStore(state => [state.macData, state.setMacData], shallow);
  const [demandId, serviceType, serviceData] = ProductStore(state =>
    [state.demandId, state.serviceType, state.serviceData], shallow);
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
    const temp = convertToNumber(end) - convertToNumber(start) + 1;
    if (temp <= 0) {
      return 0;
    }
    return temp.toLocaleString("en-US");
  };
  const getProjectNumber = (start, end, project) => {
    const temp = convertToNumber(end) - convertToNumber(start) + 1;
    if (temp <= 0) {
      return 0;
    }
    return Math.floor(temp / project * 0.998).toLocaleString("en-US");
  };

  const postMacCustom = () => {
    try {
      form.validate();
    } catch (error) {
      return;
    }
    const temp = {
      ...macData,
      ...form.getFieldsValue()
    };

    postMacCustomDemand({
      ...temp,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        setMacData({
          id: res.data.result,
          ...temp
        });
        history.push(getNextRouter(1, serviceType));
        Message.success(t["submit.hardware.success"]);
      }
    });
  };

  // 获取mac服务支持的写入位置服务
  const getMacService = () => {
    const temp = [];
    if (serviceData?.burnMacToFlash === 1) {
      temp.push({ label: "Flash", value: "FLASH" });
    }
    if (serviceData?.burnMacToEfuse === 1) {
      temp.push({ label: "efuse", value: "EFUSE" });
    }
    return temp;
  };
  // useEffect(() => {console.log(macData);
  //   if(macData?.macStart) {
  //   console.log(macData?.macStart?.length);
  // }
  // },[macData])
  return (<DynamicOuterCard title={t["firmware.mac.title"]}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form
        scrollToFirstError
        form={form}
        initialValues={{ ...macData }}
        onSubmit={postMacCustom}
      >

        <div className={style["context"]}>
          <Alert type="info" className={style["context-text"]}
                 content={t["firmware.mac.partitions.write.area.efuse"]}
                 style={{ maxWidth: "30rem" }} closeElement="Close" />
          <FormItem label={t["firmware.mac.partitions.write.area"]}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 6 }}
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
                               options={getMacService()}
                               onChange={(value) => {
                                 form.setFieldValue("type", value);
                                 form.setFieldValue("offsetAddr", null);
                                 setMacData({
                                   type: value,
                                   offsetAddr: null
                                 });
                               }}

            />
          </FormItem>
          {
            macData?.type === "FLASH" &&
            <FormItem label={t["firmware.mac.partitions.flash.write.area"]}
                      field={"offsetAddr"}
                      className={style["context-offset"]}
                      labelCol={{ span: 9 }}
                      wrapperCol={{ span: 3 }}
                      labelAlign={"left"}
                      rules={[
                        {
                          required: true,
                          message: t["firmware.mac.partitions.flash.write.area.error"],
                          validator: (value, callback) => {
                            if ((value === undefined || value === "" || value === null) && macData?.type === "FLASH") {
                              callback(t["firmware.mac.partitions.flash.write.area.error"]);
                            }
                          }
                        }
                      ]}>
              <Input
                style={{ width: 270 }}
                placeholder="Please Enter Offset Address"
                maxLength={20}
              />
            </FormItem>
          }
        </div>
        <DynamicDivider />
        <FormItem label={t["firmware.mac.partitions.flash.write.area.serial.port"]}
                  labelAlign={"left"}
                  field={"serialCheckStr"}
                  rules={[{
                    required: true,
                    message: t["firmware.mac.partitions.flash.write.area.serial.port.error"]
                  }]}>
          <Input
            style={{ width: 270 }}
            maxLength={20}
          />
        </FormItem>
        <Divider style={{ borderBottomStyle: "dashed" }} />
        <Space size={20} direction={"vertical"}>
          <Typography.Title heading={5} type="primary">
            {t["firmware.mac.partitions.flash.write.area.title"]}
          </Typography.Title>
          <FormItem label={t["firmware.mac.partitions.flash.write.area.mac"]}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 7 }}
                    labelAlign={"left"}
                    field={"macNumPerProduction"}
                    rules={[{ required: true, type: "number", min: 1, max: 4 }]}>
            <InputNumber
              mode="button"
              // style={{ width: "10rem" }}
              min={1}
              max={4}
              style={{ maxWidth: "20rem" }}
              onChange={(value) => {
                form.setFieldValue("macNumPerProduction", value);
                setMacData({
                  macNumPerProduction: value
                });
              }}
            />
          </FormItem>
          <FormItem label={t["firmware.mac.partitions.start"]}
                    field={"macStart"}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 7 }}
                    labelAlign={"left"}
                    rules={[
                      {
                        required: true,
                        message: t["firmware.mac.partitions.start.error"],
                        validator: (_, callback) => {
                          if (macData?.macStart && macData?.macStart.length !== 17) {
                            callback(t["firmware.mac.partitions.start.error"]);
                          }
                        }
                      }
                    ]}>
            <Input value={macData?.macStart} onChange={getMacStartInfo} style={{ maxWidth: "20rem" }} />
          </FormItem>

          <FormItem label={t["firmware.mac.partitions.end"]}
                    field={"macEnd"}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 7 }}
                    labelAlign={"left"} rules={[
            {
              required: true,
              message: t["firmware.mac.partitions.end.error"],
              validator: (_, callback) => {
                if (macData?.macEnd && macData?.macEnd.length !== 17) {
                  callback(t["firmware.mac.partitions.end.error"]);
                }
              }
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
        <Alert className={style["self-mac"]} type="info" content={t["firmware.mac.partitions.warn"]}
               style={{ maxWidth: "23rem", marginBottom: 20 }} closeElement="Close" />
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
