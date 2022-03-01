import React, { useState } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import { Alert, Divider, Input, InputNumber, Space, Tag, Typography } from '@arco-design/web-react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicRadioGroup from '@/components/Dynamic/Radio';
import style from './style/index.module.less';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';

const bodyStyle = {
  padding: '3rem'
};
export default function CustomMac() {
  const t = useLocale();
  const [location, setLocation] = useState();
  return (<DynamicOuterCard title={t['firmware.mac.title']} bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ['100%', 600, 400] }}>
      <div className={style['context']}>
        <Alert type='warning' className={style['context-text']} closable
               content={t['firmware.mac.partitions.write.area.efuse']}
               style={{ maxWidth: '30rem', marginBottom: 20 }} closeElement='Close' />
        <Space size={16} direction={'vertical'}>
          <Typography.Text>{t['firmware.mac.partitions.write.area']}</Typography.Text>

          <Space size={40}>
            <DynamicRadioGroup direction='vertical'
                               options={[{
                                 label: 'Flash',
                                 value: 'flash'
                               }, {
                                 label: 'efuse',
                                 value: 'efuse'
                               }]}
                               onChange={(value) => setLocation(value)}
            />
          </Space>

          {
            location === 'flash' && <Space>
              <Typography.Text>{t['firmware.mac.partitions.flash.write.area']}</Typography.Text>
              <Input />
            </Space>
          }
        </Space>
      </div>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <Space size={20}>
        <Typography.Text>{t['firmware.mac.partitions.flash.write.area.mac']}</Typography.Text>
        <InputNumber />
      </Space>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <Space size={20} direction={'vertical'}>
        <Typography.Title heading={5} type='primary'>
          {t['firmware.mac.partitions.flash.write.area.title']}
        </Typography.Title>

        <Space size={40}>
          <Typography.Text>{t['firmware.mac.partitions.start']}</Typography.Text>
          <Input />
        </Space>
        <Space size={40}>
          <Typography.Text>{t['firmware.mac.partitions.end']}</Typography.Text>
          <Input />
        </Space>
        <br />
        <Space size={10}>
          <Typography.Text>{t['firmware.mac.partitions.info1']}</Typography.Text>
          <Tag color='arcoblue' checkable={false}>100</Tag>
          <Typography.Text>{t['firmware.mac.partitions.info2']}</Typography.Text>
          <Tag color='arcoblue' checkable={false}>100</Tag>
          <Typography.Text>{t['firmware.mac.partitions.info3']}</Typography.Text>
        </Space>
      </Space>
      <Alert className={style['context-warn']} type='warning' closable content={t['firmware.mac.partitions.warn']}
             style={{ maxWidth: '30rem', marginBottom: 20 }} closeElement='Close' />
      <Divider style={{ borderBottomStyle: 'dashed' }} />
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
