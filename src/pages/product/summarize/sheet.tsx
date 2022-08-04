import React, { useEffect } from "react";
import styles from "./style/index.module.less";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import useLocale from "@/pages/product/summarize/locale/useLocale";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { getDemandDetails } from "@/api/demand";
import { getProductionInfo } from "@/api/production";
import { Button, Modal } from "@arco-design/web-react";
import { useHistory } from "react-router";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import DynamicTag from "@/components/Dynamic/tag";
import { getFile } from "@/api/file";
import { IconBulb, IconCheck, IconClose } from "@arco-design/web-react/icon";
import BinFile from "@/pages/product/summarize/bin-file";
import EFuseBit from "@/pages/product/summarize/eFuse-bit";
import SerialPort from "@/pages/product/summarize/serial-port";

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
        state.fitData
      ], shallow);
  const [setModuleInfo, setInfo, setMacData, setBurnData, setLabelDate, setServiceData, setFitData, setCheckData] =
    ProductStore(state => [
      state.setModuleInfo,
      state.setInfo,
      state.setMacData,
      state.setBurnData,
      state.setLabelData,
      state.setServiceData,
      state.setFitData,
      state.setCheckData
    ], shallow);

  const [serviceType, setServiceType] = ProductStore(state => [state.serviceType, state.setServiceType], shallow);
  const [serviceId, setServiceId] = ProductStore(state => [state.serviceId, state.setServiceId], shallow);

  useEffect(() => {
    getDemandDetails(demandId).then(res => {
      if (res.data.success && res.data.result) {
        if (res.data.result?.selDemandProduction) {
          setSelDemandProduction(res.data.result?.selDemandProduction);
        }
        // 设置 自定义服务
        if (res.data.result?.selServeVO) {
          setSelServeVO(res.data.result?.selServeVO);
        }
        // 设置详细的 服务选项内容
        if (res.data.result?.productionCustomServe) {
          setProductionCustomServe(res.data.result?.productionCustomServe);
        }
        // 设置固件自定义
        if (res.data.result?.selFirmwareVO) {
          setSelFirmwareVO(res.data.result?.selFirmwareVO);
        }
        // 设置定制mac
        if (res.data.result?.selDemandMac) {
          setSelDemandMac(res.data.result?.selDemandMac);
        }
        // 设置定制烧录内容
        if (res.data.result?.selContentVO) {
          setSelContentVO(res.data.result?.selContentVO);
        }
        // 设置预配置内容
        if (res.data.result?.selAdaptVO) {
          setSelAdaptVo(res.data.result?.selAdaptVO);
        }
        // 设置定制标签
        if (res.data.result?.selLabelVO) {
          setSelLabelVO(res.data.result?.selLabelVO);
        }
        // 设置校验结果
        if (res.data.result?.selAutoCheckVO) {
          setSelAutoCheckVO(res.data.result?.selAutoCheckVO);
        }
      }
    });
  }, []);

  // 设置硬件选型
  const setSelDemandProduction = (data) => {
    setModuleInfo({
      sid: data?.id,
      id: data.productionId
    });
    getProductionInfo().then(res => {
      for (const temp of res.data?.result) {
        if (temp?.id === data.productionId) {
          setModuleInfo(temp);
        }
      }
    });
  };

  // 设置 自定义服务选型
  const setSelServeVO = (data) => {
    setServiceId(data?.id);
    setServiceType(data?.serveIds);
  };

  // 设置详细信息的内容
  const setProductionCustomServe = (data) => {
    setServiceData(data);
  };

  const setSelFirmwareVO = (data) => {
    setInfo(data);
  };

  const setSelDemandMac = (data) => {
    setMacData(data);
  };

  const setSelContentVO = (data) => {
    setBurnData(data);
  };

  const setSelAdaptVo = (data) => {
    setFitData(data);
  };

  const setSelLabelVO = (data) => {
    setLabelDate(data);
  };

  const setSelAutoCheckVO = (data) => {
    const temp = {
      "id": data?.id,
      "serialFileId": data?.serialFileId,
      "efuseFileId": data?.efuseFileId,
      "efuseRsp": data?.efuseRsp?.result,
      "serialRsp": data?.serialRsp?.result
    };
    setCheckData(temp);
  };
  const toEdit = () => {
    history.push(`/product/demand/hardware`);
  };

  const options = [
    t["firmware.burn.flash.planA"],
    t["firmware.burn.flash.planB.NVS"],
    t["firmware.burn.flash.planB.NO_NVS"],
    t["firmware.burn.flash.planC"]
  ];

  const getCustomPicture = () => {
    if (labelData?.cusLaserLabel + labelData?.cusOutboxLabel) {
      return <DynamicTag value={labelData?.cusLaserLabel + labelData?.cusOutboxLabel} />;
    }
    return <DynamicTag value={0} />;
  };

  const isDisabled = (data) => {
    return !data;
  };

  const getSamplePicture = (tag) => {
    // 远程获取图片
    if (tag !== undefined && tag !== null) {
      getFile(tag).then(res => {
        if (res.status === 200) {
          Modal.success({
            title: "Picture Preview",
            content: <div style={{ textAlign: "center" }}>
              <img style={{ maxWidth: "100%" }} src={URL.createObjectURL(res.data)} alt={"Picture Preview"} />
            </div>
          });
        }
      });
    }
  };

  // 加密类型
  const getFirmware = (firmwareType, index) => {
    if (firmwareType === "flash") {
      return index === 1 || index === 3;

    }
    if (firmwareType === "secure") {
      return index === 2 || index === 3;
    }
  };
  // flash 加密类型
  const getFlash = (data) => {
    let keyType = null;
    if (data && data === 0) {
      keyType = "only key";
    }
    if (data && data === 1) {
      keyType = "random keys";
    }
    return <>
      <IconBulb />
      {keyType}
    </>;
  };
// secrue 设置
  const getSecrue = (data) => {
    let keyType = null;
    if (data && data === 0) {
      keyType = "V1";
    }
    if (data && data === 1) {
      keyType = "V2";
    }
    return <>
      <IconBulb />
      {keyType}
    </>;
  };

  // 获取flash 相关数据
  const flashSpeed = (data) => {
    if (data) {
      return ["40m", "26m", "20m", "80m"][data];
    }
    return "";
  };
  const flashSize = (data) => {
    if (data) {
      return ["1MB", "2MB", "4MB", "8MB", "16MB"][data];
    }
    return "";
  };

  return <DynamicOuterCard title={t["summarize.sheet.title"]}>
    <Button className={styles["edit"]} onClick={toEdit}>{t["summarize.sheet.edit"]}</Button>
    <DynamicSkeleton text={{ rows: 10, width: "90rem" }}>
      <table cellPadding="1" cellSpacing="1" className={styles["table-style"]}>
        <tbody>
        <tr>
          <th className={styles["mini"]}>IDs</th>
          <th className={styles["medium"]}>Project Name:</th>
          <th colSpan={6}>{info?.firmwareProject}</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Module Name:</td>
          <td colSpan={6}>
            <div>{moduleInfo?.mpn}</div>
          </td>
        </tr>
        {/*第二行*/}
        <tr>
          <td rowSpan={8}>2</td>
          <td rowSpan={8}>Coustome Firmware</td>
          <td rowSpan={2}>Firmware Version Number</td>
          <td rowSpan={2} colSpan={2}>{info?.firmwareVersion}</td>
          <td>Flash Encryption</td>
          <td colSpan={1}>{getFirmware("flash", info?.firmwareType) ? <IconCheck /> : <IconClose />}</td>
          <td colSpan={1}>{getFlash(info?.keyType)}</td>
        </tr>
        <tr>
          <td>Secure Boot</td>
          <td>{getFirmware("secure", info?.firmwareType) ? <IconCheck /> : <IconClose />}</td>
          <td>{getSecrue(info?.secureBoot)}</td>
        </tr>
        <tr>
          <td rowSpan={2}>Bin Files</td>
        </tr>


        <tr>
          <td colSpan={5}><BinFile data={info?.fileList} /></td>
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
          <td colSpan={2}>{flashSpeed(info?.flashFrequency)}</td>
          <td>{info?.flashMode}</td>
          <td>{flashSize(info?.flashSize)}</td>
        </tr>
        <tr>
          <td rowSpan={1}>eFuse requirements</td>
          <td colSpan={8}><EFuseBit data={info?.efuseConfig} /></td>
        </tr>
        <tr>
          <td colSpan={1}> Serial Port Print String</td>
          <td colSpan={5}><SerialPort data={[
            info?.serialCheckStr1,
            info?.serialCheckStr2,
            info?.serialCheckStr3
          ]} /></td>
        </tr>
        {/*第三行*/}
        <tr>
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
          <td rowSpan={5}>4</td>
          <td rowSpan={5}>Customized Content</td>
          <td rowSpan={3}>Flash</td>
          <td>Burn type</td>
          <td>flash offset</td>
          <td colSpan={3}>Serial port print string</td>
        </tr>
        <tr>
          <td>{burnData?.flashType !== -1 ? options[burnData?.flashType] : ""}</td>
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
          <td rowSpan={3}>4</td>
          <td rowSpan={3}>Label</td>
          <td colSpan={2}>Custom or Not</td>
          <td colSpan={4}>{getCustomPicture()}</td>
        </tr>
        <tr>
          <td rowSpan={2}> Sample</td>
          <td>Module Laser</td>
          <td colSpan={4}><Button disabled={isDisabled(labelData?.laserFileId)} size="mini" style={{ width: "6rem" }}
                                  onClick={() => getSamplePicture(labelData?.laserFileId)}>{t["label.img.open"]}</Button>
          </td>
        </tr>
        <tr>
          <td>package</td>
          <td colSpan={4}><Button disabled={isDisabled(labelData?.outboxFileId)} size="mini" style={{ width: "6rem" }}
                                  onClick={() => getSamplePicture(labelData?.outboxFileId)}>{t["label.img.open"]}</Button>
          </td>
        </tr>
        </tbody>
      </table>
    </DynamicSkeleton>
  </DynamicOuterCard>;
}
