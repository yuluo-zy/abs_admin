import React, { useState } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  InputNumber,
  Link,
  Message,
  Notification,
  Space,
  Tooltip,
  Typography
} from "@arco-design/web-react";
import FirmwareInformation from "@/pages/product/demand/entry/service/firmware/firmware-information";
import SerialCheck from "@/pages/product/demand/entry/service/firmware/serial-check";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import { IconArrowRight, IconLaunch } from "@arco-design/web-react/icon";
import FirmwareFlash from "@/pages/product/demand/entry/service/firmware/firmware-flash";
import FirmwareEfuse from "@/pages/product/demand/entry/service/firmware/frimware-efuse";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import style from "./style/index.module.less";
import { getNextRouter } from "@/utils/getNext";
import { useHistory } from "react-router";
import { postFirmwareCustomDemand } from "@/api/demand";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import DynamicDivider from "@/components/Dynamic/Divider";
import DynamicModal from "@/components/Dynamic/Modal";

export default function FirmwareCustomization() {
  const t = useLocale();
  const history = useHistory();
  const [demandId, serviceType, serviceData, modelInfo] =
    ProductStore(state => [state.demandId, state.serviceType, state.serviceData, state.moduleInfo], shallow);
  const [info, setInfo] = ProductStore(state => [state.info, state.setInfo], shallow);
  const [visible, setVisible] = useState(false);

  // 提交数据
  const postForm = async (name, values, infos) => {
    if (!info?.firmwareVersion === undefined || !info?.firstImport === undefined || info?.encryption === undefined) {
      Message.error(t["firmware.customization.info.project.form.error"]);
      return;
    }
    try {
      for (const item in infos.forms) {
        await infos.forms[item].validate();
      }
    } catch (e) {
      Message.error("Verification Failed");
      return;
    }
    const temp = {
      ...info,
      ...infos.forms["firmware.serial.check.title"]?.getFieldsValue(),
      ...infos.forms["firmware.information.flash.title"]?.getFieldsValue(),
      efuseConfig: {
        ...infos.forms["firmware.information.efuse.title"]?.getFieldsValue()
      }
    };
    const fileList = [];
    for (const item in infos.forms) {
      if (item.indexOf("firmware.information.title-") != -1) {
        fileList.push(infos.forms[item]?.getFieldsValue());
      }
    }
    temp.fileList = fileList;

    //  转换 串口校验信息
    if (temp?.serial_check_str?.length > 0) {
      temp.serialCheckStr1 = temp?.serial_check_str[0];
      temp.serialCheckStr2 = temp?.serial_check_str[1];
      temp.serialCheckStr3 = temp?.serial_check_str[2];
    }

    // 转换 自定义efuse otherCustom
    if (temp?.efuseConfig?.otherCustom && temp?.efuseConfig?.otherCustom.length > 0) {
      const otherCustom = {};
      for (const item of temp?.efuseConfig?.otherCustom) {
        otherCustom[item?.key || "defines"] = item?.data;
      }
      temp.efuseConfig.otherCustom = otherCustom;
    }

    setInfo({
      ...temp
    });
    postFirmwareCustomDemand({
      ...temp,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        const id = res.data.result;
        setInfo({ id: id });
        Message.success(t["submit.hardware.success"]);
        history.push(getNextRouter(0, serviceType));
      }
    });
  };

  const getSecureCheck = (value) => {
    return value >= 2;
  };
  const getFlashCheck = (value) => {
    return value === 1 || value === 3;
  };

  // 获取加密和非加密的选项内容
  const getCustomMade = () => {
    const temp = [];
    if (serviceData?.nonEncryptAndSecureBoot === 1) {
      temp.push({ label: t["firmware.customization.info.unencryption.firmware"], value: false });
    }
    if (serviceData?.flashEncrypt
      + serviceData?.secureBootV1
      + serviceData?.secureBootV2) {
      temp.push({ label: t["firmware.customization.info.encryption.firmware"], value: true });
    }
    return temp;
  };

  // 获取 secure 选项
  const getSecure = () => {
    const temp = [];
    if (serviceData?.secureBootV1 === 1) {
      temp.push({
        label: t["firmware.customization.info.encryption.firmware.v1"],
        value: 0
      });
    }
    if (serviceData?.secureBootV2 === 1) {
      temp.push({
        label: t["firmware.customization.info.encryption.firmware.v2"],
        value: 1
      });
    }
    return temp;
  };

  // 新增固件信息条目
  const addItem = () => {
    if (info?.partitionNum < 8) {
      setInfo({
        partitionNum: info.partitionNum + 1
      });
    } else {
      Notification.warning({
        content: t["firmware.customization.info.encryption.firmware.max_size"]
      });
    }
  };
  // 删除固件信息条目
  const deleteItem = () => {
    // 先在 form 中删除这里的信息, 然后再数量减一
    if (info?.partitionNum > 1) {
      setInfo({
        partitionNum: info.partitionNum - 1
      });
    } else {
      Notification.warning({
        content: t["firmware.customization.info.encryption.firmware.min_size"]
      });
    }
  };

  return (<DynamicOuterCard title={t["firmware.customization.title"]}>
    <DynamicSkeleton animation={true} text={{ rows: 10, width: ["100%", 600, 400] }}>
      <br />
      {/*<Space size={10} direction="vertical">*/}
      <Typography.Title heading={6}>{t["firmware.customization.info.encryption"]}</Typography.Title>
      <div className={style["encryption"]}>
        <DynamicRadioGroup direction="vertical"
                           defaultValue={info?.encryption}
                           options={getCustomMade()} onChange={(value) => {
          setInfo({
            encryption: value,
            firmwareType: -1,
            keyType: -1,
            secureBoot: -1,
            partitionNum: undefined
          });
        }} />
      </div>
      <Divider style={{ borderBottomStyle: "dashed" }} />
      {/*配置安全启动种类*/}
      {info?.encryption && (serviceData?.secureBootV1 || serviceData?.secureBootV2) &&
        <>
          <Checkbox defaultChecked={getSecureCheck(info?.firmwareType)}
                    onChange={(checked: boolean) => {
                      if (checked) {
                        if (info?.firmwareType && info?.firmwareType >= 1) {
                          setInfo({
                            firmwareType: 3
                          });
                        } else {
                          setInfo({
                            firmwareType: 2
                          });
                        }
                      } else {
                        if (info?.firmwareType && info?.firmwareType >= 3) {
                          setInfo({
                            firmwareType: 1,
                            secureBoot: -1,
                            partitionNum: undefined
                          });
                        } else {
                          setInfo({
                            firmwareType: -1,
                            secureBoot: -1,
                            partitionNum: undefined
                          });
                        }
                      }
                    }}
          >
            {t["firmware.customization.info.encryption.firmware.secure.boot"]}
          </Checkbox>
          {(info?.firmwareType === 2 || info?.firmwareType === 3) && <div className={style["encryption"]}>
            <Typography.Title heading={6}>
              {t["firmware.customization.info.encryption.firmware.secure.info"]}
              <Tooltip color={"#0E42D2"} position={"rt"}
                       defaultPopupVisible
                       content={t["firmware.customization.info.encryption.firmware.v2.link"]}>
                <Link target={"_blank"}
                      href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html">
                  <IconLaunch style={
                    { color: "#0E42D2", fontSize: 15 }
                  } />
                </Link>
              </Tooltip>
            </Typography.Title>

            <DynamicRadioGroup direction="vertical"
                               defaultValue={info?.secureBoot}
                               options={getSecure()}
                               onChange={(value) => setInfo({
                                 secureBoot: value
                               })}
            />
            {info?.secureBoot === 1 && <div className={style["encryption-secure"]}>
              <Typography.Text>{t["firmware.customization.info.encryption.firmware.v2.key"]}</Typography.Text>
              <InputNumber
                style={{ width: 320, marginLeft: "2rem" }}
                mode="button"
                min={1}
                max={3}
                defaultValue={info?.secureKeyNum}
                onChange={value => {
                  setInfo({
                    secureKeyNum: value
                  });
                }}
                placeholder="Please Enter Partitions Numbers"
              />
            </div>
            }
          </div>}
          <DynamicDivider />
        </>
      }
      {/*配置 flash 加密种类*/}
      {info?.encryption && serviceData?.flashEncrypt &&
        <>
          <Checkbox defaultChecked={getFlashCheck(info?.firmwareType)}
                    onChange={(checked: boolean) => {
                      if (checked) {
                        if (info?.firmwareType && info?.firmwareType >= 2) {
                          setInfo({
                            firmwareType: 3
                          });
                        } else {
                          setInfo({
                            firmwareType: 1
                          });
                        }
                      } else {
                        if (info?.firmwareType && info?.firmwareType >= 3) {
                          setInfo({
                            firmwareType: 2,
                            keyType: -1,
                            partitionNum: undefined
                          });
                        } else {
                          setInfo({
                            firmwareType: -1,
                            keyType: -1,
                            partitionNum: undefined
                          });
                        }
                      }
                    }}
          >
            {t["firmware.customization.info.encryption.firmware.flash"]}
          </Checkbox>
          {(info?.firmwareType === 1 || info?.firmwareType === 3) &&
            <div className={style["encryption"]}>
              <Typography.Title heading={6}>
                {t["firmware.customization.info.encryption.firmware.flash.info"]}
                <Tooltip color={"#0E42D2"} position={"rt"}
                         defaultPopupVisible
                         content={t["firmware.customization.info.encryption.firmware.flash.info.link"]}>
                  <Link target={"_blank"}
                        href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html#secure-boot-and-flash-encr">
                    <IconLaunch style={
                      { color: "#0E42D2", fontSize: 15 }
                    } />
                  </Link>
                </Tooltip>
              </Typography.Title>

              <DynamicRadioGroup direction="vertical"
                                 defaultValue={info?.keyType}
                                 options={[{
                                   label: t["firmware.customization.info.encryption.firmware.flash.only"],
                                   value: 0
                                 }, {
                                   label: t["firmware.customization.info.encryption.firmware.flash.random"],
                                   value: 1
                                 }]}
                                 onChange={(value) => {
                                   setInfo({
                                     keyType: value
                                   });
                                   if (value === 0) {
                                     setVisible(true);
                                   }
                                 }}
              />
              <DynamicModal
                title="info"
                visible={visible}
                onCancel={() => setVisible(false)}
              >
                <Space size={10} direction="vertical">
                  <Typography.Text>{t["firmware.customization.info.encryption.firmware.flash.only.t1"]}</Typography.Text>
                  <Typography.Text>{t["firmware.customization.info.encryption.firmware.flash.only.t2"]}</Typography.Text>
                  <Typography.Text>{t["firmware.customization.info.encryption.firmware.flash.only.t3"]}</Typography.Text>
                  <div style={{ paddingLeft: "2rem" }}>
                    <Space size={10} direction="vertical">
                      <Typography.Text>{t["firmware.customization.info.encryption.firmware.flash.only.t3.t1"]}</Typography.Text>
                      <Typography.Text>{t["firmware.customization.info.encryption.firmware.flash.only.t3.t2"]}</Typography.Text>
                    </Space>
                  </div>
                </Space>
              </DynamicModal>
              {info?.keyType === 1 && <Space size={10} style={{ marginLeft: "2rem" }}>
                <Typography.Text>
                  {t["firmware.serial.partitions"]}
                  <Tooltip color={"#0E42D2"} position={"top"}
                           defaultPopupVisible
                           content={t["firmware.customization.info.encryption.firmware.flash.link"]}>
                    <Link target={"_blank"}
                          href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html">
                      <IconLaunch style={
                        { color: "#0E42D2", fontSize: 15 }
                      } />
                    </Link>
                  </Tooltip>
                </Typography.Text>
                <InputNumber
                  style={{ width: 300 }}
                  mode="button"
                  min={1}
                  max={8}
                  value={info?.partitionNum}
                  onChange={value => {
                    setInfo({
                      partitionNum: value
                    });
                  }}
                  placeholder="Please Enter Partitions Numbers"
                />,
              </Space>}

            </div>
          }
          <DynamicDivider />
        </>
      }

      {/*开始配置表单*/}
      <Form.Provider
        onFormSubmit={postForm}
      >
        {/*非加密固件*/}
        {info?.encryption === false && <div>
          <FirmwareInformation initialValues={info?.fileList} />
          <Divider style={{ borderBottomStyle: "dashed" }} />
          <SerialCheck initialValues={{ ...info }} />
          <Divider style={{ borderBottomStyle: "dashed" }} />
        </div>
        }
        {/*flash 唯一*/}
        {info?.keyType === 0 && <div>
          <FirmwareInformation initialValues={info?.fileList} />
          <Divider style={{ borderBottomStyle: "dashed" }} />
          <FirmwareEfuse initialValues={{ ...info }} target={modelInfo?.series} />
          <Divider style={{ borderBottomStyle: "dashed" }} />
          <SerialCheck initialValues={{ ...info }} />
          <Divider style={{ borderBottomStyle: "dashed" }} />
        </div>
        }

        {
          info?.keyType === 1 && <div>
            <FirmwareInformation number={info?.partitionNum} initialValues={info?.fileList} addItem={addItem}
                                 deleteItem={deleteItem} />
            <Divider style={{ borderBottomStyle: "dashed" }} />
            <FirmwareFlash initialValues={{ ...info }} />
            <Divider style={{ borderBottomStyle: "dashed" }} />
            <FirmwareEfuse initialValues={{ ...info }} target={modelInfo?.series} />
            <Divider style={{ borderBottomStyle: "dashed" }} />
            <SerialCheck initialValues={{ ...info }} />
            <Divider style={{ borderBottomStyle: "dashed" }} />
          </div>
        }


        {/*下一步*/}

        <div className={style["model-next"]}>
          <Form id="searchForm" layout="vertical" style={{ maxWidth: "9rem" }}>
            <Button type="primary"
                    size={"large"}
                    htmlType="submit"
                    icon={<IconArrowRight />}
            >
              {t["hardware.production.info.next"]}
            </Button>
          </Form>
        </div>
      </Form.Provider>
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
