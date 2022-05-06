import React, { useMemo, useState } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicCard from "@/components/Dynamic/Card";
import { Checkbox, Form, Input } from "@arco-design/web-react";
import style from "./style/index.module.less";
import { useThrottleFn } from "react-use";

export default function FirmwareEfuse() {
  const t = useLocale();
  const EfuseConfig = [
    {
      title: "Security fuses: ",
      key: "securityFuses",
      child: [
        {
          title: "JTAG_DISABLE",
          key: "JTAG_DISABLE",
          value: 0,
          initValue: 0
        },
        {
          title: "DISABLE_DL_ENCRYPT",
          key: "DISABLE_DL_ENCRYPT",
          value: 0,
          initValue: 0
        },
        {
          title: "DISABLE_DL_DECRYPT",
          key: "DISABLE_DL_DECRYPT",
          value: 0,
          initValue: 0
        },
        {
          title: "DISABLE_DL_CACHE",
          key: "DISABLE_DL_CACHE",
          value: 0,
          initValue: 0
        }
      ]
    },
    {
      title: "Config fuses: ",
      key: "configFuses",
      child: [
        {
          title: "XPD_SDIO_FORCE",
          key: "XPD_SDIO_FORCE",
          value: 0,
          initValue: 0
        },
        {
          title: "XPD_SDIO_REG",
          key: "XPD_SDIO_REG",
          value: 0,
          initValue: 0
        },
        {
          title: "XPD_SDIO_TIEH",
          key: "XPD_SDIO_TIEH",
          value: 0,
          initValue: 0
        }
      ]
    }
  ];

  const [efuseList, setEfuseList] = useState(new Set())

  const [efuse, setEfuse] = useState({})

  const setEfuseInfo = (data: string, key: string) => {

    if(efuseList.has(key)){
      const temp = {
        ...efuse
      }
      temp[key] = {
        data: data,
        validity: true
      }
      setEfuse(temp)
      console.log(temp)
    }

  }


  const getEfuseConfig = (entity) => {
    return (
        entity.map(item => {
          return <div className={style['efuse']}>
            <Checkbox onChange={(checked: boolean)=>{
              if(checked){
                let temp = new Set(efuseList)
                  temp.add(item.key)
                // 检查是否已经有这个属性
                if(item.key in efuse){
                  let efuseTemp = {...efuse}
                  efuseTemp[item.key] = {
                    ...efuseTemp[item.key],
                    validity: true
                  }
                  setEfuse(efuseTemp)
                  console.log(efuseTemp)
                }
                setEfuseList(temp)
              }else {
                let temp = new Set(efuseList)
                  temp.delete(item.key)
                let efuseTemp = {...efuse}
                efuseTemp[item.key] = {
                  ...efuseTemp[item.key],
                  validity: false
                }
                setEfuse(efuseTemp)
                setEfuseList(temp)
                console.log(efuseTemp)
              }
            }
            }>{item.title}</Checkbox>
            <Input
              style={{ width: 200 }}
              type={"number"}
              disabled={!efuseList.has(item.key)}
              placeholder={t['firmware.information.efuse.other.port.default']}
              onChange={(value: string) =>{
                setEfuseInfo(value, item.key)
              }
              }
            />
          </div>
        })


    )
  }

  return (
    <DynamicCard title={t["firmware.information.efuse.title"]}>
      <Form style={{ maxWidth: 650 }}>
        {EfuseConfig.map(item => {
            return <Form.Item
              label={item.title}
              field={item.key}
            >
              {getEfuseConfig(item.child)}
            </Form.Item>;
          }
        )}

        <Form.Item
          label="other Custom"
          field="otherCustom"
        >
          <Input.TextArea placeholder={t["firmware.information.efuse.other.port.help"]} />
        </Form.Item>
      </Form>
    </DynamicCard>
  );
}
