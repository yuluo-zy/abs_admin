import React, { useEffect, useState } from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import { Button, Divider, Link, List, Message, Modal, Switch, Tag, Typography } from "@arco-design/web-react";
import DynamicCard from "@/components/Dynamic/Card";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { IconArrowRight, IconLaunch } from "@arco-design/web-react/icon";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { useHistory } from "react-router";
import { getProductionCustomDemand, postProductionCustomDemand } from "@/api/demand";
import { getNextRouter } from "@/utils/getNext";
import axios from "axios";
import { getProductionServe } from "@/api/production";
import { Recordable } from "@/components/type";
import ModelInfoZh from "@/assets/model_info_zh.png";
import LabelInfoZh from "@/assets/label_info_zh.png";

const { Title, Paragraph, Text } = Typography;

export default function ServicePreselection() {
  const t = useLocale();
  const [demandId, moduleInfo, setCollapse] = ProductStore(state => [state.demandId, state.moduleInfo, state.setCollapse], shallow);
  const [serviceType, setServiceType] = ProductStore(state => [state.serviceType, state.setServiceType], shallow);
  const [serviceId, setServiceId] = ProductStore(state => [state.serviceId, state.setServiceId], shallow);
  const [serviceData, setServiceData] = ProductStore(state => [state.serviceData, state.setServiceData], shallow);
  const history = useHistory();
  const [service, setService] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {

    if (moduleInfo.mpn == null) {
      Modal.confirm({
        title: "ERROR",
        content: t["message.hardware.notfound"],
        okButtonProps: { status: "danger" },
        mask: true,
        maskClosable: false,
        cancelButtonProps: { disabled: true },
        onOk: () => {
          history.push(`/product/demand/hardware`);
        }
      });
    }
    // 并发请求 获取所有的服务 并 匹配 本款物料 提供的服务
    axios.all([
      getProductionCustomDemand(),
      getProductionServe({
        mpn: moduleInfo.mpn
      })
    ]).then(axios.spread((productionDemand, productionServe) => {
      if (productionDemand.data.success && productionServe.data.success) {
        if (productionServe.data.result.length > 0) {
          setServiceData(productionServe.data.result[0]);
          setService([...getCustomService(productionDemand.data.result, productionServe.data.result[0])]);
        }
      }
    }))
      .catch(error => {
          Message.error(t["message.service.notfound"]);
        }
      );
    setCollapse(false);
    return () => {
      setService([]);
    };
  }, []);

  const isCheck = (value) => {
    if (serviceType) {
      return serviceType.includes(value);
    }
  };

  // 过滤生成支持的 服务内容
  const getCustomService = (item, services) => {
    // * 0 定制固件
    // * 1 定制mac
    // * 2 定制内容烧录
    // * 3 预适配
    // * 4 定制标签
    let data: Array<Recordable> = [];
    for (const datum of item) {
      switch (datum.type) {
        case 0:
          if (services?.nonEncryptAndSecureBoot
            + services?.flashEncrypt
            + services?.secureBootV1
            + services?.secureBootV2 > 0) {
            data.push(datum);
          }
          break;
        case 1:
          if (services?.burnMacToFlash + services?.burnMacToEfuse > 0) {
            data.push(datum);
          }
          break;
        case 2:
          if (services?.burnContentToFlash + services?.burnContentToEfuse > 0) {
            data.push(datum);
          }
          break;
        case 3:
          if (services?.customPreAdapt > 0) {
            data.push(datum);
          }
          break;
        case 4:
          if (services?.customLabel > 0) {
            data.push(datum);
          }
          break;
      }
    }
    return data;
  };

  // 获取 服务的提示内容

  const getServicesHint = (item) => {
    // * 0 定制固件
    // * 1 定制mac
    // * 2 定制内容烧录
    // * 3 预适配
    // * 4 定制标签
    switch (item) {
      case 1:
        useMacHint();
        break;
      case 2:
        useBurnHint();
        break;
      case 4:
        useLabelHint();
        break;
    }
  };

  function useMacHint() {
    Modal.info({
      title: t["preselection.hint.mac.title"],
      okText: "got it",
      className: style["typography"],
      content: <div>
        {t["preselection.hint.mac.context"]}
        <Link target={"_blank"}
              href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/system.html#mac-address">
          <IconLaunch style={
            { color: "#0E42D2", fontSize: 15 }
          } />
        </Link>
      </div>
    });
  }

  function useBurnHint() {
    Modal.info({
      title: t["preselection.hint.burn.title"],
      okText: "got it",
      className: style["typography"],
      content: <Typography>
        <Paragraph>{t["preselection.hint.burn.context1"]}</Paragraph>
        <br />
        <Paragraph>
          <ol>
            <li>{t["preselection.hint.burn.context2"]}</li>
            <br />
            <li>{t["preselection.hint.burn.context3"]}
              <ol>
                <br />
                <li>{t["preselection.hint.burn.context4"]}</li>
                <li>{t["preselection.hint.burn.context5"]}</li>
              </ol>
            </li>
          </ol>
        </Paragraph>
      </Typography>
    });
  }

  function useLabelHint() {
    Modal.info({
      title: t["preselection.hint.burn.title"],
      okText: "got it",
      alignCenter: false,
      className: style["typography-top"],
      //todo 完成中英文的图片返回
      content: <div>
        <div>{t["preselection.hint.label.context1"]}</div>
        <div>
          <img src={ModelInfoZh} className={style["model_info"]} alt={"model_img"} />
          <img src={LabelInfoZh} className={style["label_info"]} alt={"label_img"} />
        </div>
      </div>
    });
  }

  const render = (item, index) => (
    <List.Item key={index} actions={
      [<span style={{ paddingLeft: 5 }}>
                 <Switch
                   checkedText={t["service.preselection.model.info.title.switch.open"]}
                   uncheckedText={t["service.preselection.model.info.title.switch.close"]}
                   checked={isCheck(item.type)}
                   onChange={(value: boolean) => {
                     let copy = new Set([...serviceType]);
                     if (value) {
                       getServicesHint(item.type);
                       copy.add(item.type);
                     } else {
                       copy.delete(item.type);
                     }
                     if(!copy.has(5)){
                       copy.add(5)
                     }
                     setServiceType([...copy]);
                   }} />
          </span>]
    }>
      <List.Item.Meta
        title={item.typeName}
        description={item.content}
      />

    </List.Item>
  );

  const getService = () => {
    const data = [];

    for (const i of service) {
      if (serviceType.includes(i.type)) {
        data.push(i.typeName);
      }
    }
    return data;
  };

  const postService = () => {
    if (demandId === -1) {
      Message.error(t["hardware.production.info.select.model.demand.error"]);
      return;
    }
    postProductionCustomDemand({
      "demandId": demandId,
      "id": serviceId,
      "serveIds": serviceType
    }).then(res => {
      if (res.data.success) {
        Message.success(t["submit.hardware.success"]);
        setVisible(false);
        setServiceId(res.data.result);
        // 根据选择的服务项目进行下一步导航
        history.push(getNextRouter(-1, serviceType));
      }
    }).catch(error => {
      Message.error(t["submit.hardware.error"]);
    });
  };

  return (<div className={style["model"]}>
    <DynamicOuterCard title={t["service.preselection.model.info.title"]}>
      <Tag closable={false} color="arcoblue" size="large">
        <p>{t["hardware.production.info.select.model"]} <b>{moduleInfo.mpn}</b></p>
      </Tag>
      <Divider style={{ borderBottomStyle: "dashed" }} />
      <p>{t["service.preselection.model.info.title.description"]}</p>
      <DynamicCard title={t["service.preselection.model.info.title.list"]}>
        <DynamicSkeleton text={{ rows: 10 }}>
          <List
            hoverable={true}
            dataSource={service}
            render={render}
          />
        </DynamicSkeleton>
      </DynamicCard>
      <Divider style={{ borderBottomStyle: "dashed" }} />
      <div className={style["model-next"]}>
        {
          <div className={style["product-total"]}>
            <b>{t["service.preselection.model.service.total"]}</b> {serviceType.length}
          </div>
        }
        <Button type="primary"
                size={"large"}
                icon={<IconArrowRight />}
                onClick={() => {
                  setVisible(true);
                }}
        >
          {t["hardware.production.info.next"]}
        </Button>
      </div>
    </DynamicOuterCard>
    <Modal
      title={t["service.modal.title"]}
      visible={visible}
      style={{ width: "50%" }}
      onOk={postService}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
    >
      <p>{t["hardware.production.info.select.model"]} <b>{moduleInfo.mpn}</b></p>

      <p>{t["service.preselection.model.service.info"]}</p>
      <List
        style={{ width: 622 }}
        size="small"
        bordered={false}
        split={false}
        dataSource={getService()}
        render={(item, index) => <List.Item key={index}>
          <Tag closable={false} color="arcoblue">{item}</Tag>
        </List.Item>}
      />
    </Modal>
  </div>);
};
