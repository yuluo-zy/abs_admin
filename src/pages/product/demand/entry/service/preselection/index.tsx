import React, { useContext } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { ProductDemandContext } from '@/store/context-manager';
import style from './style/index.module.less';
import { Button, Divider, Grid, Tag } from '@arco-design/web-react';
import DynamicCard from '@/components/Dynamic/Card';
import styles from '@/pages/list/card/style/index.module.less';
import CardBlock from '@/pages/product/demand/entry/service/preselection/card-block';
import { ServiceCard } from '@/components/type';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import { IconArrowRight } from '@arco-design/web-react/icon';

const { Row, Col } = Grid;

const terms: ServiceCard[] = [
  {
    id: 1,
    name: 'nnnn',
    description: '1. 乐鑫支持客户在对具有内置 Flash 的模组和芯片进行烧录时，使用自己的 Flash Image，这便于客户接受\n' +
      '带有自己应用程序固件和生产测试固件的模组，有助于在其生产过程中显著减少制造时间及制造复杂性；\n' +
      '2. 此外，对于 ESP32 和 ESP32-S 系列模组，我们还支持在生产过程中对他们启用 Flash 烧录、安全启\n' +
      '动以及在 eFUSE 存储中进行定制数据烧录。（注意：内置由于制程限制，当前内置 flash 的芯片烧录方案\n' +
      '，仅支持非加密固件和有安全启动需求的固件，不支持 flash 加密固件。'
  },
  {
    id: 2,
    name: 'nnnn',
    description: 'kjhdkjhfkjhds'
  },
  {
    id: 3,
    name: 'nnnn',
    description: 'kjhdkjhfkjhds'
  },
  {
    id: 4,
    name: 'nnnn',
    description: 'kjhdkjhfkjhds'
  }
];
export default function ServicePreselection() {
  const t = useLocale();
  const { state, dispatch } = useContext(ProductDemandContext);

  const setService = (item) => {

  };

  const getCardList = (list: ServiceCard[] | []) => {
    return (
      <Row gutter={24} className={styles['card-content']}>
        {list.map((item, index) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} key={index}>
            <CardBlock data={item} onChange={(item) => setService(item)} />
          </Col>
        ))}
      </Row>
    );
  };

  return (<div className={style['model']}>
    <DynamicOuterCard title={t['service.preselection.model.info.title']}>
      <Tag checkable color='arcoblue' size='large' defaultChecked>
        <p>{t['hardware.production.info.select.model']} <b>{state.moduleInfo.mpn}</b></p>
      </Tag>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <p>{t['service.preselection.model.info.title.description']}</p>

      <DynamicCard>
        <DynamicSkeleton text={{ rows: 10 }}>
          {
            getCardList(terms)
          }
        </DynamicSkeleton>
      </DynamicCard>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <div className={style['model-next']}>
        {
          <div className={style['product-total']}>
            <b>{t['service.preselection.model.service.total']}</b>
          </div>
        }
        <Button type='primary'
                size={'large'}
                icon={<IconArrowRight />}
                onClick={() => {
                }}
        >
          {t['hardware.production.info.next']}
        </Button>
      </div>
    </DynamicOuterCard>
  </div>);
}
