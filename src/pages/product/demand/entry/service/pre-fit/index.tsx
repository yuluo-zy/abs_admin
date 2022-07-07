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
  Select,
  Space,
  Table,
  Tag,
  Typography
} from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import style from "./style/index.module.less";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { getMac } from "@/utils/stringTools";
import { IconArrowRight } from "@arco-design/web-react/icon";
import { postAdaptCustomDemand } from "@/api/demand";
import { getNextRouter } from "@/utils/getNext";
import { useHistory } from "react-router";

const Option = Select.Option;
const FormItem = Form.Item;
const bodyStyle = {
  padding: "3rem"
};
const maxWidth = {
  maxWidth: "20rem"
};
const options = [
  1,
  2,
  3,
  4,
  5
];

const certificaties = [
  "CUSTOM_FLASH",
  "NVS"
];

export default function PreFit() {
  const [form] = Form.useForm();
  const t = useLocale();
  const history = useHistory();
  const [fitData, setFitData] = ProductStore(state => [state.fitData, state.setFitData], shallow);
  const [demandId, serviceType, serviceData] = ProductStore(state =>
    [state.demandId, state.serviceType, state.serviceData], shallow);

  const postFitCustom = () => {
    try {
      form.validate();
    } catch (error) {
      return;
    }
    setFitData({
      ...form.getFieldsValue()
    });
    postAdaptCustomDemand({
      ...fitData,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        setFitData({id: res.data.result})
        history.push(getNextRouter(3, serviceType))
        Message.success(t["submit.hardware.success"]);
      }
    });
  };
  const setValue = (key, value) => {
    form.setFieldValue(key, value);
    const temp = {};
    temp[key] = value;
    setFitData({
      ...temp
    });
  };
  const columns = [
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Cust_bootloader.bin",
      dataIndex: "bootloader"
    },
    {
      title: "cust_user.bin and cust_partition.bin",
      dataIndex: "user"
    },
    {
      title: "Example_cust_partition.bin  and example_cust_partition.bin",
      dataIndex: "example"
    }
  ];
  const data = [
    {
      type: t["firmware.pre.ca.setting.config.flashing.provided.recommend"],
      bootloader: t["firmware.pre.ca.setting.config.flashing.provided.required"],
      user: t["firmware.pre.ca.setting.config.flashing.provided.required"],
      example: t["firmware.pre.ca.setting.config.flashing.provided.optional"]
    },
    {
      type: "ESP32-C3 & S3",
      bootloader: t["firmware.pre.ca.setting.config.flashing.provided.optional"],
      user: t["firmware.pre.ca.setting.config.flashing.provided.no.need"],
      example: t["firmware.pre.ca.setting.config.flashing.provided.optional"]
    },
    {
      type: "ESP32",
      bootloader: t["firmware.pre.ca.setting.config.flashing.provided.required"],
      user: t["firmware.pre.ca.setting.config.flashing.provided.optional"],
      example: t["firmware.pre.ca.setting.config.flashing.provided.required"]
    }
  ];


  const getMacStartInfo = (value) => {
    const temp = getMac(value, fitData?.commonName || "");
    setValue("commonName", temp);
  };

  const getDay = (day) => {
    if(day !== undefined){
      return day * 365
    }
    return 0
  }

  return (<DynamicOuterCard title={t["firmware.pre.title"]} bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form
        scrollToFirstError
        form={form}
        initialValues={{ ...fitData }}
        onSubmit={postFitCustom}
        labelAlign={"left"}
      >

        <FormItem label={t["firmware.pre.email"]}
                  labelAlign={"left"}
                  field="espPgpEmail"

                  rules={[
                    {
                      required: true,
                      message: t["firmware.pre.email.error"]
                    }
                  ]}
        >
          <Input style={maxWidth} maxLength={35} value={fitData?.espPgpEmail} onChange={
            (value) => {
              setValue("espPgpEmail", value);
            }
          } />
        </FormItem>

        <Divider style={{ borderBottomStyle: "dashed" }} />
        <b>{t["firmware.pre.ca.setting.config.title"]}</b>
        <br />
        <div className={style['ca']}>
          <FormItem label={t["firmware.pre.ca.setting.config.type"]}
                    labelAlign={"left"}
                    field={"isAdapt"}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    className={style['ca-way']}
                    rules={[{ required: true, message: t["firmware.pre.ca.setting.config.type.error"] }]}>

            <DynamicRadioGroup direction="vertical"
                               defaultValue={fitData?.isAdapt}
                               options={[{
                                 label: t["firmware.pre.ca.setting.config.type.custom"],
                                 value: 1
                               }, {
                                 label: t["firmware.pre.ca.setting.config.type.no.custom"],
                                 value: 0
                               }]}
                               onChange={(value) => {
                                 setValue("isAdapt", value);
                                   setValue("transmissionMethod", undefined)
                               }}
            />
          </FormItem>
          {fitData?.isAdapt === 1 &&
            <FormItem label={t["firmware.pre.ca.setting.config.type.transmission.method"]}
                      labelAlign={"left"}
                      field={"transmissionMethod"}
                      labelCol={{ span: 7 }}
                      wrapperCol={{ span: 17 }}
                      className={style['ca-transmission']}
                      rules={[{
                        required: true,
                        message: t["firmware.pre.ca.setting.config.type.transmission.method.error"],
                        validator: (value, callback) => {
                          if ((value === undefined || value === "") && fitData?.isAdapt === 1) {
                            callback(t["firmware.pre.ca.setting.config.type.transmission.method.error"]);
                          }
                        }
                      }]}>

              <DynamicRadioGroup direction="vertical"
                                 defaultValue={fitData?.transmissionMethod}
                                 options={[{
                                   label: "PGP",
                                   value: "PGP"
                                 }, {
                                   label: "YUBIKEY",
                                   value: "YUBIKEY"
                                 }]}
                                 onChange={(value) => {
                                   setValue("transmissionMethod", value);
                                 }}
              />
            </FormItem>}
          {fitData?.isAdapt === 0 && <Alert className={style["ca-text"]}
                                            content={t["firmware.pre.ca.setting.config.type.no.custom.info"]} closeElement="Close" />}
          {fitData?.transmissionMethod === "PGP" && <Alert className={style["ca-text"]}
                                                           content={t["firmware.pre.ca.setting.config.type.no.custom.info.PGP"]}
                                                           closeElement="Close" />}
          {fitData?.transmissionMethod === "YUBIKEY" && <Alert className={style["ca-text"]}
                                                               content={t["firmware.pre.ca.setting.config.type.no.custom.info.YUBIKEY"]}
                                                               closeElement="Close" />}
        </div>

        <Divider style={{ borderBottomStyle: "dashed" }} />
        {serviceData.storageType === 1 && <div>
          <b>EFUSE_KEY_BLOCK & Storage type of Device Certificate</b>
          <br />
          <br/>
          <Space size={30} className={style["centered"]}>
            <Typography.Text>
              {t["firmware.pre.ca.setting.config.type.transmission.EFUSE_KEY_BLOCKx"]}
            </Typography.Text>
            <FormItem
              field={"leaveBlock"}
            >
              <Select
                placeholder={t["firmware.pre.ca.setting.config.type.Leave"]}
                style={{width: 400}}
                defaultValue={fitData?.leaveBlock}
                onChange={(value) => setValue("leaveBlock", value)}
              >
                {options.map((option, index) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Space>
          <br />
          <br />
          <Space size={30} className={style["centered"]}>
            <Typography.Text>
              {t["firmware.pre.ca.setting.config.type.device"]}
            </Typography.Text>
            <FormItem
              field={"certificatiesPlace"}
            >
              <Select
                placeholder={t["firmware.pre.ca.setting.config.type.Leave"]}
                style={{ width: 300 }}
                defaultValue={fitData?.certificatiesPlace}
                onChange={(value) => setValue("certificatiesPlace", value)}
              >
                {certificaties.map((option, index) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Space>

          <Divider style={{ borderBottomStyle: "dashed" }} />
        </div>}

        <b>{t["firmware.pre.ca.setting.config.device.certificates"]}</b>
        <br />
        <br />
        <FormItem label={"subject"}
                  field={"subject"}
                  labelAlign={"left"}
                  extra={"Defaults: C=CN,ST=SH,O=Espressif"}
                  rules={[
                    {
                      required: true,
                      message: "subject value cannot be empty"
                    }
                  ]}>
          <Input value={fitData?.subject} onChange={
            (value) => {
              setValue("subject", value);
            }
          } style={{ maxWidth: "20rem", margin: "1rem", marginLeft:0 }} />
        </FormItem>
        <FormItem label={"commonName: "}
                  field={"commonName"}
                  labelAlign={"left"}
                  extra={"Defaults: Upcase MAC address e.g: AABBCC112233"}
                  rules={[
                    {
                      required: true,
                      message: "Common Name value cannot be empty"
                    }
                  ]}>
          <Input value={fitData?.commonName} onChange={getMacStartInfo} style={{ maxWidth: "20rem", margin: "1rem", marginLeft:0 }} />
        </FormItem>

        <FormItem label={"validityDate: "}
                  field={"validityDate"}
                  labelAlign={"left"}
                  extra={"Defaults: 5475 Day (15 years)"}
                  rules={[
                    {
                      required: true,
                      message: "Validity Date value cannot be empty"
                    }
                  ]}>
          <div className={style['year']}>
            <InputNumber max={30} value={fitData?.validityDate} onChange={
              (value) => {
                setValue("validityDate", value);
              }
            } style={{ maxWidth: "5rem", margin: "1rem", marginLeft:0 }} />

            <b>Year</b>
            <p>=</p>
            <Tag color={'blue'} style={{margin: '1rem'}}>{getDay(fitData?.validityDate)}</Tag>
            <b>Day</b>
          </div>

        </FormItem>

        <Divider style={{ borderBottomStyle: "dashed" }} />
        <b>{t["firmware.pre.ca.setting.config.device.certificates"]}</b>
        <br />
        <br />

        <FormItem label={t["firmware.pre.ca.setting.config.flashing.scheme.options.espressif"]}
                  field={"espFlash"}
                  labelAlign={"left"}
                  rules={[
                    {
                      required: true,
                      message: t["firmware.pre.ca.setting.config.type.transmission.EFUSE_KEY_BLOCKx.error"]
                    }
                  ]}>
          <DynamicRadioGroup direction="vertical"
                             defaultValue={fitData?.espFlash}
                             options={[{
                               label: "Yes",
                               value: 1
                             }, {
                               label: "No",
                               value: 0
                             }]}
                             onChange={(value) => {
                               setValue("isAdapt", value);
                             }}
          />
        </FormItem>

        <br />
        <Table columns={columns} data={data} />
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
