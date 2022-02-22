import React, { useContext } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { ProductDemandContext } from '@/store/context-manager';
import style from './style/index.module.less';
import { Divider, Grid, Tag } from '@arco-design/web-react';
import DynamicCard from '@/components/Dynamic/Card';
import styles from '@/pages/list/card/style/index.module.less';
import CardBlock from '@/pages/product/demand/entry/service/preselection/card-block';
import { ServiceCard } from '@/components/type';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';

const { Row, Col } = Grid;

const terms: ServiceCard[] = [
  {
    id: 1,
    name: 'nnnn',
    description: 'kjhdkjhfkjhds'
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
          <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6} key={index}>
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

    </DynamicOuterCard>
  </div>);
}
