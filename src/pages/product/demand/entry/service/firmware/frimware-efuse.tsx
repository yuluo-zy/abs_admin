import React, { useEffect, useState } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicCard from "@/components/Dynamic/Card";
import { Checkbox, Form, Input } from "@arco-design/web-react";
import style from "./style/index.module.less";

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

const ESP32_C3_EfuseConfig = [
  {
    title: "Security fuses: ",
    key: "securityFuses",
    child: [
      {
        title: "DIS_DOWNLOAD_ICACHE",
        key: "DIS_DOWNLOAD_ICACHE",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_PAD_JTAG",
        key: "DIS_PAD_JTAG",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_LEGACY_SPI_BOOT",
        key: "DIS_LEGACY_SPI_BOOT",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_USB_JTAG",
        key: "DIS_USB_JTAG",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_DOWNLOAD_MANUAL_ENCRYPT",
        key: "DIS_DOWNLOAD_MANUAL_ENCRYPT",
        value: 0,
        initValue: 0
      }
    ]
  },
]

const ESP32_EfuseConfig = [
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
]

const ESP32_S_EfuseConfig = [
  {
    title: "Security fuses: ",
    key: "securityFuses",
    child: [
      {
        title: "DIS_BOOT_REMAP",
        key: "DIS_BOOT_REMAP",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_DOWNLOAD_ICACHE",
        key: "DIS_DOWNLOAD_ICACHE",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_DOWNLOAD_DCACHE",
        key: "DIS_DOWNLOAD_DCACHE",
        value: 0,
        initValue: 0
      },
      {
        title: "HARD_DIS_JTAG",
        key: "HARD_DIS_JTAG",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_LEGACY_SPI_BOOT",
        key: "DIS_LEGACY_SPI_BOOT",
        value: 0,
        initValue: 0
      },
      {
        title: "DIS_DOWNLOAD_MANUAL_ENCRYPT",
        key: "DIS_DOWNLOAD_MANUAL_ENCRYPT",
        value: 0,
        initValue: 0
      },
    ]
  }
]
function CustomEfuseConfig(props) {
  const t = useLocale();
  const {entity} = props
  const [stateValue, setValue] = useState(props.value);
  const [efuseList, setEfuseList] = useState(new Set());
  const [efuse, setEfuse] = useState({});

  const setEfuseInfo = (data: string, key: string) => {

    if (efuseList.has(key)) {
      const temp = {
        ...efuse
      };
      temp[key] = {
        data: data,
        validity: true
      };
      setEfuse(temp);
    }
  };
  useEffect( () => {
    if(props.value){
      let temp = []
      for(const item in props.value){
        temp.push(item)
      }
      setEfuse(props.value)
      setEfuseList(new Set(temp))
    }
  }, [])

  const setCheckboxEffect = (checked, key) => {
    if (checked) {
      let temp = new Set(efuseList);
      temp.add(key);
      // 检查是否已经有这个属性
      if (key in efuse) {
        let efuseTemp = { ...efuse };
        efuseTemp[key] = {
          ...efuseTemp[key],
          validity: true
        };
        setEfuse(efuseTemp);
      }else {
        let efuseTemp = { ...efuse };
        efuseTemp[key] = {
          data: '0',
          validity: true
        };
        setEfuse(efuseTemp);
      }
      setEfuseList(temp);
    } else {
      let temp = new Set(efuseList);
      temp.delete(key);
      let efuseTemp = { ...efuse };
      delete efuseTemp[key];
      setEfuse(efuseTemp);
      setEfuseList(temp);
    }
  }

  useEffect(() => {
    if (props.value !== stateValue && props.value === undefined) {
      setValue(props.value);
    }
  }, [props.value])

  useEffect(() => {
  handleChange(efuse)
  }, [efuse])

  const handleChange = (newValue) => {
    if (!('value' in props)) {
      setValue(newValue);
    }
    props.onChange && props.onChange(newValue);
  }

  return (
    entity.map(( item, index ) => {
      return <div key={index} className={style["efuse"]}>
        <Checkbox onChange={(checked) => setCheckboxEffect(checked, item.key)} checked={efuseList.has(item.key)}>{item.title}</Checkbox>
        <Input
          style={{ width: 200 }}
          type={"number"}
          disabled={!efuseList.has(item.key)}
          placeholder={t["firmware.information.efuse.other.port.default"]}
          value={efuse[item.key]?.data}
          onChange={(value: string) => {
            setEfuseInfo(value, item.key);
          }
          }
        />
      </div>;
    })
  );
}
export default function FirmwareEfuse(props: {initialValues, target}) {
  const { initialValues, target } = props;
  const t = useLocale();

  // 这里根据芯片型号的不同来返回相关的信息
  const getEfuseConfig = (target) => {
    if(target === "ESP32-S3" || target === "ESP32-S2"){
      return ESP32_S_EfuseConfig
    }
    if(target=== "ESP32"){
      return ESP32_EfuseConfig
    }
    if(target.search("ESP32-C3") !== -1){
      return ESP32_C3_EfuseConfig
    }

  }

  return (
    <DynamicCard title={t["firmware.information.efuse.title"]}>
      <Form
        id={"firmware.information.efuse.title"}
        style={{ maxWidth: 650 }}
        initialValues={initialValues}>
        { target && getEfuseConfig(target).map((item, index) => {
            return <Form.Item
              label={item.title}
              field={item.key}
              key={index}
            >
              <CustomEfuseConfig entity={item.child}/>
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
