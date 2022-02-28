import React from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import { Divider, Form, Input, Message, Radio, Select, Space, Typography } from '@arco-design/web-react';
import FirmwareInformation from '@/pages/product/demand/entry/service/firmware/firmware-information';
import SerialCheck from '@/pages/product/demand/entry/service/firmware/serial-check';
import DynamicRadioGroup from '@/components/Dynamic/Radio';


const RadioGroup = Radio.Group;

export default function FirmwareCustomization() {
  const t = useLocale();

  const Option = Select.Option;
  const [form] = Form.useForm();

  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

  return (<DynamicOuterCard title={t['firmware.customization.title']}>
    <Space size={30} direction='vertical'>
      <Space size={60} split={<Divider type='vertical' />}>
        <Space size={20}>
          <Typography.Text>{t['firmware.customization.info.version']}</Typography.Text>
          <Input
            style={{ width: 350 }}
            allowClear
            size={'large'}
            placeholder={t['firmware.customization.info.version.hint']}
          />
        </Space>
        <Space size={20}>
          <Typography.Text>{t['firmware.customization.info.project']}</Typography.Text>
          <Select
            size={'large'}
            placeholder={t['firmware.customization.info.project.hint']}
            style={{ width: 154 }}
            onChange={(value) => Message.info({ content: `You select ${value}.`, showIcon: true })}
          >
            {options.map((option, index) => (
              <Option key={option} disabled={index === 3} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>

      <Space size={10} direction={'vertical'}>
        <Typography.Text>{t['firmware.customization.info.project.history']}</Typography.Text>
        <RadioGroup
          direction='vertical'
        >
          <Radio value={'first'}>{t['firmware.customization.info.project.history.first']}</Radio>
          <Radio value={'next'}>{t['firmware.customization.info.project.history.next']}</Radio>
        </RadioGroup>
      </Space>

    </Space>
    <Divider style={{ borderBottomStyle: 'dashed' }} />
    <Space size={10} direction='vertical'>
      <Typography.Text>{t['firmware.customization.info.encryption']}</Typography.Text>
      <RadioGroup
        direction='vertical'
      >
        <Radio value={'first'}>{t['firmware.customization.info.project.history.first']}</Radio>
        <Radio value={'next'}>{t['firmware.customization.info.project.history.next']}</Radio>
      </RadioGroup>
      <div style={{ paddingLeft: '6rem' }}>
        <Space size={40}>
          <RadioGroup
          >
            <Radio value={'first'}>{t['firmware.customization.info.project.history.first']}</Radio>
            <Radio value={'next'}>{t['firmware.customization.info.project.history.next']}</Radio>
          </RadioGroup>
        </Space>
      </div>
    </Space>
    <Divider style={{ borderBottomStyle: 'dashed' }} />
    <FirmwareInformation formData={form} />
    <Divider style={{ borderBottomStyle: 'dashed' }} />
    <SerialCheck formData={form} />
    <DynamicRadioGroup options={[
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' }
    ]} onChange={(value) => {
      console.log(value);
    }} />
  </DynamicOuterCard>);
}
