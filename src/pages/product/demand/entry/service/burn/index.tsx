import React, { useState } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Checkbox, Form, Select, Space } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import DynamicDivider from "@/components/Dynamic/Divider";
import { FormItemProps, FormList } from "@/components/type";
import DynamicForm from "@/components/Dynamic/Form";
import ProductStore from "@/store/product";
import shallow from "zustand/shallow";

const Option = Select.Option;
const FormItem = Form.Item;

export default function ServicePreselection() {
  const t = useLocale();
  const [burnData, setBurnData] = ProductStore(state => [state.burnData, state.setBurnData], shallow);
  const demandId = ProductStore(state => state.demandId);
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
        placeholder: t['firmware.burn.flash.plan.data'],
        type: "input",
        field: "firmwareName",
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
        field: "fileMd5",
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
        field: "beginAddr",
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
        field: "files",
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
        placeholder: t['firmware.burn.flash.plan.data'],
        type: "input",
        field: "firmwareName",
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
        field: "fileMd5",
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
        field: "beginAddr",
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
        field: "files",
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
        field: "files",
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
        field: "files",
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
        placeholder: t['firmware.burn.flash.plan.data'],
        type: "input",
        field: "firmwareName",
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
        field: "fileMd5",
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
        field: "beginAddr",
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
        field: "files",
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
        field: "files",
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
        placeholder: t['firmware.burn.flash.plan.data'],
        type: "input",
        field: "firmwareName",
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
        field: "fileMd5",
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
        field: "beginAddr",
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
        field: "files",
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
        field: "files",
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

  const EfuseItem: Array<FormItemProps> = [
    {
      placeholder: t['firmware.burn.flash.plan.data'],
      type: "input",
      field: "firmwareName",
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
      placeholder: 'Flash Frequency',
      type: 'select',
      field: 'flashFrequency',
      required: true,
      options: [
        { label: '40m', value: 1 },
        { label: '26m', value: 2 },
        { label: '20m', value: 3 },
        { label: '28m', value: 4 }
      ],
      rules: [
        {
          required: true,
          message: t['firmware.information.flash.config.error'],
        }
      ]
    },
    {
      placeholder: t["firmware.burn.flash.plan.address"],
      type: "input",
      field: "fileMd5",
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
      field: "beginAddr",
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
      placeholder: t["firmware.burn.flash.file.bin.data.script"],
      type: "upload",
      field: "files",
      required: true,
      limit: 1,
      rules: [
        {
          required: true,
          message: t["firmware.burn.flash.file.bin.data.script.error"]
        }
      ]
    },
    {
      placeholder: t["firmware.burn.flash.file.bin.data.script"],
      type: "upload",
      field: "files",
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
  const colList = [
    [4,4,14,2],
    [4,4, 7,3, 3, 3],
    [4,4,10,3, 3],
    [4,4,7,6, 3],
  ]

  const setValue = (key, value) => {
    form.setFieldValue(key, value);
    const temp = {};
    temp[key] = value;
    setBurnData({
      ...temp
    });
  };



  const getFormList = (value: number | undefined) => {
    if (value != undefined) {
      return <div className={style["card"]}>
        <div className={style['title']}><b>{options[burnData?.flashType]}</b></div>
        <DynamicForm data={{...burnData}}
                     layout={'inline'}
                     col={colList[burnData?.flashType]}
                     title={t["firmware.burn.flash.title"]}
                     formItem={FlashItem[value]}
                     formData={form} onSubmit={() => {
        }} /></div>;
    }
  };

  return (<DynamicOuterCard title={t["firmware.burn.title"]}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form.Provider
        // onFormSubmit={postForm}
      >
      <Space size={10} direction={"vertical"}>
        <Space size={15} direction={"vertical"}>
          {t["firmware.burn.title.context"]}
          <Checkbox checked={burnData?.flash} onChange={(value) => {
            setBurnData({ "flash":  value});
          }}>Flash</Checkbox>
          <Checkbox checked={burnData?.efuse} onChange={(value) => {
            setBurnData({
            efuse: value
          });
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

      <DynamicDivider />
      {
        burnData?.flash && <div>
          <Space size={15}>
            {t["firmware.burn.flash.title"]}
            <Select
              placeholder="Please select"
              style={{ width: 500 }}
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
          </Space>
        </div>
      }

      {getFormList(burnData?.flashType)}

      < DynamicDivider />
      {
        burnData?.efuse && <div>
          <Space>
            {t["firmware.burn.efuse.title"]}
          </Space>
          <div className={style["card"]}>
          <DynamicForm data={{...burnData}}
                       layout={'inline'}
                       col={[4,3,3,8,3, 3]}
                       title={t["firmware.burn.efuse.title"]}
                       formItem={EfuseItem} />
          </div>
          <DynamicDivider />
        </div>
      }
      </Form.Provider>
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
