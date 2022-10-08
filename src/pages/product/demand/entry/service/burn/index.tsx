import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Button, Checkbox, Form, Message, Select, Space, Tooltip } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import DynamicDivider from "@/components/Dynamic/Divider";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { IconArrowRight } from "@arco-design/web-react/icon";
import { postBurnCustomDemand } from "@/api/demand";
import { getNextRouter } from "@/utils/getNext";
import { useHistory } from "react-router";
import EFuseData from "@/pages/product/demand/entry/service/burn/eFuse-data";
import FlashNvsNot from "@/pages/product/demand/entry/service/burn/flash-nvs-not";
import FlashBin from "@/pages/product/demand/entry/service/burn/flash-bin";
import FlashNvs from "@/pages/product/demand/entry/service/burn/flash-nvs";
import FlashScript from "@/pages/product/demand/entry/service/burn/flash-script";

const Option = Select.Option;

export default function ServicePreselection() {
  const t = useLocale();
  const history = useHistory();
  const [burnData, setBurnData] = ProductStore(state => [state.burnData, state.setBurnData], shallow);
  const [demandId, serviceType, serviceData] = ProductStore(state => [state.demandId, state.serviceType, state.serviceData], shallow);
  const options = [
    t["firmware.burn.flash.planA"],
    t["firmware.burn.flash.planB.NVS"],
    t["firmware.burn.flash.planB.NO_NVS"],
    t["firmware.burn.flash.planC"]
  ];

  const getFormList = (value: number | undefined) => {
    if (value != undefined && value > -1) {
      switch (value) {
        case 0:
          return <FlashBin initialValues={burnData} />;
        case 1:
          return <FlashNvsNot initialValues={burnData} />;
        case 2:
          return <FlashNvs initialValues={burnData} />;
        case 3:
          return <FlashScript initialValues={burnData} />;
      }
    }
  };

  // 提交数据
  const postForm = async (name, values, info) => {
    try {
      for (const item in info.forms) {
        await info.forms[item].validate();
      }
    } catch (e) {
      Message.error("校验失败");
      return;
    }
    const temp = {
      ...burnData,
      ...info.forms["firmware.burn.flash.title"]?.getFieldsValue(),
      ...info.forms["firmware.burn.efuse.title"]?.getFieldsValue()
    };

    postBurnCustomDemand({
      ...temp,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        setBurnData({
          ...temp,
          id: res.data.result
        });
        history.push(getNextRouter(2, serviceType));
        Message.success(t["submit.hardware.success"]);
      }
    });
  };

  return (<DynamicOuterCard title={t["firmware.burn.title"]}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form.Provider
        onFormSubmit={postForm}
      >
        <Space size={10} direction={"vertical"}>
          <Space size={15} direction={"vertical"}>
            {t["firmware.burn.title.context"]}
            {serviceData?.burnContentToFlash === 1 &&
              <Checkbox checked={burnData?.flashType !== -1} onChange={(value) => {
                if (value) {
                  setBurnData({ flashType: 0 });
                } else {
                  setBurnData({ flashType: -1 });
                }

              }}>Flash</Checkbox>}
            {serviceData?.burnContentToEfuse === 1 &&
              <Checkbox checked={burnData?.efuseType === 0} onChange={(value) => {
                if (value) {
                  setBurnData({
                    efuseType: 0
                  });
                } else {
                  setBurnData({
                    efuseType: -1
                  });
                }

              }}>eFuse</Checkbox>}
          </Space>
          <br />
          <Space>
            {t["firmware.burn.hint"]}
          </Space>
          <Space>
            {t["firmware.burn.hint.notice"]}
          </Space>
        </Space>

        {
          burnData?.flashType !== -1 && <div>
            <DynamicDivider />
            <div style={{ marginBottom: "1rem" }}>
              <h2>{t["firmware.burn.flash.title"]}</h2>
            </div>
            <Space size={15} style={{ marginLeft: "1rem" }}>
              {t["firmware.burn.flash.plan"]}
              <Tooltip color={"#1380ea"} position={"rt"}
                       defaultPopupVisible
                       content={t["firmware.burn.hint"]}>
                <Select
                  placeholder="Please select"
                  style={{ width: 430 }}
                  defaultValue={burnData?.flashType}
                  onChange={(value) => {
                    setBurnData({ flashType: value });
                  }}
                >
                  {options.map((option, index) => (
                    <Option key={option} value={index}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Tooltip>
            </Space>
          </div>
        }

        {/*获取flash 烧录方案*/}
        {(burnData?.flashType != undefined && burnData?.flashType > -1) && <div className={style["card"]}>

          {/*<div className={style["title"]}><b>{options[burnData?.flashType]}</b></div>*/}
          {getFormList(burnData?.flashType)}
        </div>}


        < DynamicDivider />
        {
          burnData?.efuseType === 0 && <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "1rem" }}>
              <h2>{t["firmware.burn.efuse.title"]}</h2>
            </div>
            <div className={style["card"]}>
              <EFuseData initialValues={burnData} />
            </div>
            <DynamicDivider />
          </div>
        }
        <div className={style["context-next"]}>
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
