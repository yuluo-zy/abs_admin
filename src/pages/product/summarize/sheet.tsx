import React, { useEffect } from "react";
import styles from "./style/index.module.less";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import useLocale from "@/pages/product/summarize/locale/useLocale";
import DynamicMiniInput from "@/components/Dynamic/Input/mini";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { getDemandDetails } from "@/api/demand";
import { getProductionInfo } from "@/api/production";
import { Button } from "@arco-design/web-react";
import { useHistory } from "react-router";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";

const bodyStyle = {
  paddingTop: '0',
  marginRight: '1rem',
  transition: ' 0.5s all ease-in-out'
};
export default function Sheet() {
  const t = useLocale();
  const history = useHistory();
  // 获取用来存储数据的所有对象
  const [checkData, moduleInfo, demandId, info, macData, labelData, burnData, fitData] =
    ProductStore(state =>
      [state.checkData,
        state.moduleInfo,
        state.demandId,
        state.info,
        state.macData,
        state.labelData,
        state.burnData,
        state.fitData,
      ], shallow);
  const [setModuleInfo,setInfo, setMacData, setBurnData, setLabelDate, setServiceData] =
    ProductStore( state => [
      state.setModuleInfo,
      state.setInfo,
      state.setMacData,
      state.setBurnData,
      state.setLabelData,
      state.setServiceData
    ], shallow)

  const [serviceType, setServiceType] = ProductStore(state => [state.serviceType, state.setServiceType], shallow);
  const [serviceId, setServiceId] = ProductStore(state => [state.serviceId, state.setServiceId], shallow);

  useEffect(()=> {
    getDemandDetails(demandId).then(res => {
      if(res.data.success && res.data.result) {
        if(res.data.result?.selDemandProduction){
          setSelDemandProduction(res.data.result?.selDemandProduction)
        }
        // 设置 自定义服务
        if(res.data.result?.selServeVO){
          setSelServeVO(res.data.result?.selServeVO)
        }
        // 设置详细的 服务选项内容
        if(res.data.result?.productionCustomServe){
          setProductionCustomServe(res.data.result?.productionCustomServe)
        }
        // 设置固件自定义
        if(res.data.result?.selFirmwareVO){
          setSelFirmwareVO(res.data.result?.selFirmwareVO)
        }
        // 设置定制mac
        if(res.data.result?.selDemandMac){
          setSelDemandMac(res.data.result?.selDemandMac)
        }
        // 设置定制烧录内容
        if(res.data.result?.selContentVO){
          setSelContentVO(res.data.result?.selContentVO)
        }
        // 设置定制标签
        if(res.data.result?.selLabelVO){
          setSelLabelVO(res.data.result?.selLabelVO)
        }
    }})
  }, [])

  // 设置硬件选型
  const setSelDemandProduction = (data) => {
    setModuleInfo({
      sid: data?.id,
      id: data.productionId
    })
    getProductionInfo().then(res => {
      for(const temp of res.data?.result){
        if(temp?.id === data.productionId){
          setModuleInfo(temp)
        }
      }
    })
  }

  // 设置 自定义服务选型
  const setSelServeVO = (data) => {
    setServiceId(data?.id)
    setServiceType(data?.serveIds)
  }

  // 设置详细信息的内容
  const setProductionCustomServe = (data) => {
    setServiceData(data)
  }

  const setSelFirmwareVO = (data) => {
    setInfo(data)
  }

  const setSelDemandMac = (data) => {
    setMacData(data)
  }

  const setSelContentVO = (data) => {
    setBurnData(data)
  }

  const setSelLabelVO = (data) => {
    setLabelDate(data)
  }
  const toEdit = () => {
    history.push(`/product/demand/hardware`)
  }

  const options = [
    t["firmware.burn.flash.planA"],
    t["firmware.burn.flash.planB.NVS"],
    t["firmware.burn.flash.planB.NO_NVS"],
    t["firmware.burn.flash.planC"]
  ]

  return <DynamicOuterCard title={t['summarize.sheet.title']} bodyStyle={bodyStyle}>
    <Button className={styles['edit']} onClick={toEdit}>{t['summarize.sheet.edit']}</Button>
    <DynamicSkeleton text={{ rows: 10, width: "90rem" }}>
    <table cellPadding='1' cellSpacing='1' className={styles['table-style']}>
    <tbody>
      <tr>
        <th className={styles['mini']}>勾选</th>
        <th className={styles['mini']}>IDs</th>
        <th className={styles['medium']}>Project Name:</th>
        <th colSpan={6}></th>
      </tr>
      <tr>
        <td></td>
        <td>1</td>
        <td>Module Name:</td>
        <td colSpan={6}><div>{moduleInfo?.mpn}</div></td>
      </tr>
      <tr>
        <td rowSpan={12}></td>
        <td rowSpan={12}>2</td>
        <td rowSpan={12}>Coustome Firmware</td>
        <td rowSpan={2}>Firmware Version Number</td>
        <td rowSpan={2} colSpan={2}>{info?.firmwareVersion}</td>
        <td>Flash Encryption</td>
        <td colSpan={2}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td>Secure Boot</td>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={5}> Bin Files</td>
        <td colSpan={2}>Name of Firmware bin files</td>
        <td colSpan={2}>Md5 value of the "xxx.bin" file</td>
        <td>Flash Offset</td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}>Flash SPI Configuration</td>
        <td>Configurations</td>
        <td colSpan={2}>Flash Speed</td>
        <td>Flash Mode</td>
        <td>Flash Size</td>
      </tr>
      <tr>
        <td> Target Configurations</td>
        <td colSpan={2}><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
        <td><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}>eFuse requirements</td>
        <td>eFuse bit</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td>Target Value</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td colSpan={2}> Serial Port Print String</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      {/*第三行*/}
      <tr>
        <td rowSpan={5}></td>
        <td rowSpan={5}>3</td>
        <td rowSpan={5}>Custom MAC</td>
        <td colSpan={2}>Starting Address</td>
        <td colSpan={4}>{macData?.macStart}</td>
      </tr>
      <tr>
        <td colSpan={2}>Ending Address</td>
        <td colSpan={4}>{macData?.macEnd}</td>
      </tr>
      <tr>
        <td colSpan={2}>MAC Address total</td>
        <td colSpan={4}>{macData?.macTotalNum}</td>
      </tr>
      <tr>
        <td colSpan={2}>每个模组占用 MAC 数量</td>
        <td colSpan={4}>{macData?.macNumPerProduction}</td>
      </tr>
      <tr>
        <td colSpan={2}>可用于生产模组数量</td>
        <td colSpan={4}>{macData?.productionNum}</td>
      </tr>
      {/*第四行*/}
      <tr>
        <td rowSpan={5}></td>
        <td rowSpan={5}>4</td>
        <td rowSpan={5}>Customized Content</td>
        <td rowSpan={3}>Flash</td>
        <td>Burn type</td>
        <td>flash offset</td>
        <td colSpan={3}>Serial port print string</td>
      </tr>
      <tr>
        <td>{burnData?.flashType !== -1 ? options[burnData?.flashType]: ""}</td>
        <td>{burnData?.burnOffset}</td>
        <td colSpan={3}>{burnData?.flashOkSerialLabel}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td colSpan={3}></td>
      </tr>
      <tr>
        <td rowSpan={2}>eFuse</td>
        <td>eFuse offset</td>
        <td colSpan={4}>Serial port print string</td>
      </tr>
      <tr>
        <td>{burnData?.efuseBurnAddr}</td>
        <td colSpan={4}>{burnData?.efuseOkSerialLabel}</td>
      </tr>

      {/*第五节内容*/}
      <tr>
        <td rowSpan={3}></td>
        <td rowSpan={3}>4</td>
        <td rowSpan={3}>Label</td>
        <td colSpan={2}>Custom or Not</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td rowSpan={2}> Sample</td>
        <td>Module Laser</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
      <tr>
        <td>package</td>
        <td colSpan={4}><DynamicMiniInput /></td>
      </tr>
    </tbody>
    </table>
    </DynamicSkeleton>
  </DynamicOuterCard>;
}
