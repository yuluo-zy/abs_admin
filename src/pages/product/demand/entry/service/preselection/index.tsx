import React, { useEffect, useState } from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import { Button, Descriptions, Divider, Grid, List, Message, Modal, Switch, Tag } from "@arco-design/web-react";
import DynamicCard from "@/components/Dynamic/Card";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { IconArrowRight, IconDelete, IconDown, IconEdit } from "@arco-design/web-react/icon";
import ProductStore from "@/store/product";
import shallow from "zustand/shallow";
import { useHistory } from "react-router";
import { getProductionCustomDemand, postProductionCustomDemand } from "@/api/demand";

export default function ServicePreselection() {
  const t = useLocale();
  const [demandId,moduleInfo, setCollapse] = ProductStore(state => [state.demandId,state.moduleInfo, state.setCollapse], shallow);
  const [serviceType, setServiceType] = ProductStore(state => [state.serviceType, state.setServiceType], shallow);
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
    getProductionCustomDemand().then(res => {
      if (res.data.success) {
        setService(res.data.result);
      }
    }).catch(error => {
        Message.error(t["message.service.notfound"]);
      }
    );
    setCollapse(false);
    return () => {
      setService([]); // This worked for me
    };
  }, []);

  const isCheck = (value) => {
    if(serviceType){
      return serviceType.includes(value)
    }
  }
  const render = (item, index) => (
    <List.Item key={index} actions={
      [<span style={{paddingLeft: 5}}>
              <Switch
                checkedText={t['service.preselection.model.info.title.switch.open']}
                uncheckedText={t['service.preselection.model.info.title.switch.close']}
                checked={isCheck(item.type)}
              onChange={(value: boolean, event)=> {
                let copy = new Set([...serviceType]);
                if(value) {
                  copy.add(item.type)
                } else {
                  copy.delete(item.type)
                }
                setServiceType([...copy])
              }}/>
          </span>]
    }>
      <List.Item.Meta
        title={item.typeName}
        description={item.content}
      />

    </List.Item>
  );

  const getService = () => {
    const data = []

    for(const i of service){
      if(serviceType.includes(i.type)){
        data.push(i.typeName)
      }
    }
    return data
  }

  const postService = () => {
    if(demandId === -1){
      Message.error(t['hardware.production.info.select.model.demand.error'])
      return
    }
    postProductionCustomDemand({
      'demandId': demandId,
      'serveIds': serviceType,
    }).then(res => {
      if(res.data.success){
        Message.success(t["submit.hardware.success"]);
        setVisible(false)
        // 根据选择的服务项目进行下一步导航
        history.push(`/product/demand/service/preselection`)
      }
    }).catch(error => {
      Message.error(t["submit.hardware.error"]);
    });
  }

  return (<div className={style["model"]}>
    <DynamicOuterCard title={t["service.preselection.model.info.title"]}>
      <Tag   closable={false} color="arcoblue" size="large" >
        <p>{t["hardware.production.info.select.model"]} <b>{moduleInfo.mpn}</b></p>
      </Tag>
      <Divider style={{ borderBottomStyle: "dashed" }} />
      <p>{t["service.preselection.model.info.title.description"]}</p>
      <DynamicCard title={t['service.preselection.model.info.title.list']}>
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
                  setVisible(true)
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
        size='small'
        bordered={false}
        split={false}
        dataSource={getService()}
        render={(item, index) => <List.Item key={index}>
          <Tag   closable={false} color="arcoblue" >{item}</Tag>
          </List.Item>}
      />
    </Modal>
  </div>);
}
