import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Button, Checkbox, Form, Message, Select, Space, Tooltip } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import DynamicDivider from "@/components/Dynamic/Divider";
import { FormItemProps } from "@/components/type";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { IconArrowRight } from "@arco-design/web-react/icon";
import { postBurnCustomDemand } from "@/api/demand";
import { getNextRouter } from "@/utils/getNext";
import { useHistory } from "react-router";
import EFuseData from "@/pages/product/demand/entry/service/burn/eFuse-data";

const Option = Select.Option;

export default function ServicePreselection() {
  const t = useLocale();
  const history = useHistory();
  const [burnData, setBurnData] = ProductStore(state => [state.burnData, state.setBurnData], shallow);
  const [demandId, serviceType] = ProductStore(state => [state.demandId, state.serviceType], shallow);
  const options = [
    t["firmware.burn.flash.planA"],
    t["firmware.burn.flash.planB.NVS"],
    t["firmware.burn.flash.planB.NO_NVS"],
    t["firmware.burn.flash.planC"]
  ];

  const [form] = Form.useForm();

  const FlashItem: Array<Array<FormItemProps>> = [
    [
      {
        placeholder: t["firmware.burn.flash.plan.data"],
        type: "input",
        field: "flashDataSize",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.data.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.address"],
        type: "input",
        field: "burnOffset",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.address.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.output"],
        type: "text",
        field: "flashOkSerialLabel",
        required: true,
        labelCol: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.output.error"],
            minLength: 2
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.bin"],
        type: "upload",
        field: "burnBin",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.bin.error"]
          }
        ]
      }
    ],
    [
      {
        placeholder: t["firmware.burn.flash.plan.data"],
        type: "input",
        field: "flashDataSize",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.data.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.address"],
        type: "input",
        field: "burnOffset",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.address.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.output"],
        type: "text",
        field: "flashOkSerialLabel",
        required: true,
        labelCol: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.output.error"],
            minLength: 2
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.file.bin.data.config"],
        type: "upload",
        field: "configFile",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.config.error"]
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.file.bin.data.values"],
        type: "upload",
        field: "valuesFile",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.values.error"]
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.bin"],
        type: "upload",
        field: "sampleBinFile",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.bin.error"]
          }
        ]
      }
    ],
    [
      {
        placeholder: t["firmware.burn.flash.plan.data"],
        type: "input",
        field: "flashDataSize",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.data.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.address"],
        type: "input",
        field: "burnOffset",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.address.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.output"],
        type: "text",
        field: "flashOkSerialLabel",
        required: true,
        labelCol: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.output.error"],
            minLength: 2
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.file.bin.data.list"],
        type: "upload",
        field: "flashListCsvFile",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.list.error"]
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.bin"],
        type: "upload",
        field: "burnBin",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.bin.error"]
          }
        ]
      }
    ],
    [
      {
        placeholder: t["firmware.burn.flash.plan.data"],
        type: "input",
        field: "flashDataSize",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.data.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.address"],
        type: "input",
        field: "burnOffset",
        required: true,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.address.error"],
            minLength: 1
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.plan.output"],
        type: "text",
        field: "flashOkSerialLabel",
        required: true,
        labelCol: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.plan.output.error"],
            minLength: 2
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.file.bin.data.script.cmd"],
        type: "input",
        field: "burnScriptCommand",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.script.cmd.error"]
          }
        ]
      },
      {
        placeholder: t["firmware.burn.flash.file.bin.data.script"],
        type: "upload",
        field: "burnScriptFile",
        required: true,
        limit: 1,
        rules: [
          {
            required: true,
            message: t["firmware.burn.flash.file.bin.data.script.error"]
          }
        ]
      }
    ]
  ];

  const getFormList = (value: number | undefined) => {
    if (value != undefined && value > -1) {
      return <div className={style["card"]}>
        <div className={style["title"]}><b>{options[burnData?.flashType]}</b></div>
        {/*<DynamicForm data={{ ...burnData }}*/}
        {/*             layout={"inline"}*/}
        {/*             col={colList[burnData?.flashType]}*/}
        {/*             title={"firmware.burn.flash.title"}*/}
        {/*             formItem={FlashItem[value]}*/}
        {/*             formData={form} onSubmit={() => {*/}
        {/*}} />*/}

      </div>;
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
    let temp = {
      ...burnData,
      ...info.forms["firmware.burn.flash.title"]?.getFieldsValue(),
      ...info.forms["firmware.burn.efuse.title"]?.getFieldsValue()
    }
    console.log(temp)

    postBurnCustomDemand({
      ...temp,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        setBurnData({
          ...temp,
          id: res.data.result
        })
        history.push(getNextRouter(2, serviceType))
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
            <Checkbox checked={burnData?.flashType !== -1} onChange={(value) => {
              if (value) {
                setBurnData({ flashType: 0 });
              } else {
                setBurnData({ flashType: -1 });
              }

            }}>Flash</Checkbox>
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

            }}>eFuse</Checkbox>
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
            <Space size={15}>
              {t["firmware.burn.flash.title"]}
              <Tooltip color={'#1380ea'} position={'rt'}
                       defaultPopupVisible
                       content= {t["firmware.burn.hint"]}>
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
        {getFormList(burnData?.flashType)}

        < DynamicDivider />
        {
          burnData?.efuseType === 0 && <div style={{width: '100%'}}>
            <Space>
              {t["firmware.burn.efuse.title"]}
            </Space>
            <div className={style["card"]}>
              <EFuseData initialValues={burnData}/>
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
