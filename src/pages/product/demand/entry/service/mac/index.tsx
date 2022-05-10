import React from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Alert, Button, Divider, Form, Input, InputNumber, Space, Tag, Typography } from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import style from "./style/index.module.less";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import ProductStore from "@/store/product";
import shallow from "zustand/shallow";
import { convertToNumber, setColon } from "@/utils/stringTools";
import { IconArrowRight } from "@arco-design/web-react/icon";

const bodyStyle = {
  padding: '3rem'
};
export function MacInput(props) {
  return(
    <Input {...props}/>
  )
}

export const getMac = (data, oldData) => {
  return setColon(data
    .toUpperCase()
    .split("")
    .filter(value => value.length === 1 && value.match(/[0-9A-F]/)), data.length < oldData.length)
}
export default function CustomMac() {
  const t = useLocale();
  const [macData, setMacData] = ProductStore(state => [state.macData, state.setMacData], shallow);

  const getMacStartInfo = (value) => {
    setMacData({
      macStart: getMac(value, macData?.macStart || '')
    })
  }
  const getMacEndInfo = (value) => {
    setMacData({
      macEnd: getMac(value, macData?.macEnd || '')
    })
  }

  const getMacNumber = (start, end)=> {
    return (convertToNumber(start) - convertToNumber(end)).toLocaleString('en-US')
  }
  const getProjectNumber = (start, end, project)=> {
    return Math.floor((convertToNumber(start) - convertToNumber(end) )/ project * 0.998).toLocaleString('en-US')
  }

  return (<DynamicOuterCard title={t['firmware.mac.title']} bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ['100%', 600, 400] }}>
      <div className={style['context']}>
        <Alert type='warning' className={style['context-text']} closable
               content={t['firmware.mac.partitions.write.area.efuse']}
               style={{ maxWidth: '30rem', marginBottom: 20 }} closeElement='Close' />
        <Space size={15} align={'start'}>
          <Typography.Text>{t['firmware.mac.partitions.write.area']}</Typography.Text>
          <Space size={40}>
            <DynamicRadioGroup direction='vertical'
                               defaultValue={macData?.type}
                               options={[{
                                 label: 'Flash',
                                 value: 'FLASH'
                               }, {
                                 label: 'efuse',
                                 value: 'EFUSE'
                               }]}
                               onChange={(value) => setMacData({
                                 type: value
                               })}
            />
          </Space>

          {
            macData?.type === 'FLASH' && <Space style={{marginLeft: '4rem'}}>
              <Typography.Text>{t['firmware.mac.partitions.flash.write.area']}</Typography.Text>
              <Input
                style={{ width: 300 }}
                defaultValue={macData?.offsetAddr}
                onChange={value => {
                  setMacData({
                    offsetAddr: value
                  });
                }}
                placeholder="Please Enter Offset Address"
              />
            </Space>
          }
        </Space>
      </div>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <Space size={20}>
        <Typography.Text>{t['firmware.mac.partitions.flash.write.area.mac']}</Typography.Text>
        <InputNumber
          style={{ width: 300 }}
          mode='button'
          min={1}
          max={4}
          defaultValue={macData?.macNumPerProduction}
          onChange={value => {
            setMacData({
              macNumPerProduction: value
            });
          }}
          placeholder="Please Enter Mac Numbers"
        />
      </Space>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <Space size={20} direction={'vertical'}>
        <Typography.Title heading={5} type='primary'>
          {t['firmware.mac.partitions.flash.write.area.title']}
        </Typography.Title>

        <Space size={40}>
          <Typography.Text>{t['firmware.mac.partitions.start']}</Typography.Text>
          <MacInput value={macData?.macStart} onChange={getMacStartInfo}/>
        </Space>
        <Space size={40}>
          <Typography.Text>{t['firmware.mac.partitions.end']}</Typography.Text>
          <MacInput value={macData?.macEnd} onChange={getMacEndInfo} />
        </Space>
        <br />
        <Space size={10}>
          <Typography.Text>{t['firmware.mac.partitions.info1']}</Typography.Text>
          <Tag color='arcoblue' checkable={false}>{getMacNumber(macData?.macStart,macData?.macEnd )}</Tag>
          <Typography.Text>{t['firmware.mac.partitions.info2']}</Typography.Text>
          <Tag color='arcoblue' checkable={false}>{getProjectNumber(macData?.macStart,macData?.macEnd, macData.macNumPerProduction )}</Tag>
          <Typography.Text>{t['firmware.mac.partitions.info3']}</Typography.Text>
        </Space>
      </Space>
      <Alert className={style['context-warn']} type='warning' closable content={t['firmware.mac.partitions.warn']}
             style={{ maxWidth: '30rem', marginBottom: 20 }} closeElement='Close' />
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <div className={style["context-next"]}>
          <Button type="primary"
                  size={"large"}
                  icon={<IconArrowRight />}
          >
            {t["hardware.production.info.next"]}
          </Button>
      </div>
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
