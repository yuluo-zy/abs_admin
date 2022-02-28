import React, { useState } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import {
  Checkbox,
  Divider,
  Form,
  Input,
  Link,
  Message,
  Select,
  Space,
  Tooltip,
  Typography
} from '@arco-design/web-react';
import FirmwareInformation from '@/pages/product/demand/entry/service/firmware/firmware-information';
import SerialCheck from '@/pages/product/demand/entry/service/firmware/serial-check';
import DynamicRadioGroup from '@/components/Dynamic/Radio';
import { IconLaunch, IconTags } from '@arco-design/web-react/icon';


const CheckboxGroup = Checkbox.Group;


export default function FirmwareCustomization() {
  const t = useLocale();

  const Option = Select.Option;
  const [form] = Form.useForm();

  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

  const [history, setHistory] = useState('');
  const [encryption, setEncryption] = useState();

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
            style={{ width: 300 }}
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
        <DynamicRadioGroup direction='vertical' options={[
          { label: t['firmware.customization.info.project.history.first'], value: 'first' },
          { label: t['firmware.customization.info.project.history.next'], value: 'next' }
        ]} onChange={(value) => {
          setHistory(value);
        }} />
        {
          history === 'next' && <Space size={12}>
            <IconTags style={
              { color: '#00B42A', fontSize: 20 }
            } />
            <Typography.Text>{t['firmware.customization.info.project.history.old']}</Typography.Text>
            <Select
              size={'large'}
              style={{ width: 300 }}
              placeholder={t['firmware.customization.info.project.hint']}
              onChange={(value) => Message.info({ content: `You select ${value}.`, showIcon: true })}
            >
              {options.map((option, index) => (
                <Option key={option} disabled={index === 3} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Space>
        }
      </Space>

    </Space>

    <Divider style={{ borderBottomStyle: 'dashed' }} />
    <Space size={10} direction='vertical'>
      <Typography.Text>{t['firmware.customization.info.encryption']}</Typography.Text>
      <DynamicRadioGroup direction='vertical' options={[
        { label: t['firmware.customization.info.unencryption.firmware'], value: 'unencryption' },
        { label: t['firmware.customization.info.encryption.firmware'], value: 'encryption' }
      ]} onChange={(value) => {
        setEncryption(value);
      }} />
      {encryption === 'encryption' && <div style={{ paddingLeft: '6rem' }}>
        <Space size={40}>
          <CheckboxGroup
            options={[{ label: t['firmware.customization.info.encryption.firmware.flash'], value: 'flash' },
              { label: t['firmware.customization.info.encryption.firmware.v1'], value: 'v1' },
              { label: t['firmware.customization.info.encryption.firmware.v2'], value: 'v2' }]}
            style={{ display: 'block', marginBottom: 16 }}
          />
          <Tooltip color={'#0E42D2'} position={'rt'}
                   content={t['firmware.customization.info.encryption.firmware.v2.link']}>
            <Link target={'_blank'}
                  href='https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html'>
              <IconLaunch style={
                { color: '#0E42D2', fontSize: 15 }
              } />
            </Link>
          </Tooltip>
        </Space>
      </div>}
    </Space>
    <Divider style={{ borderBottomStyle: 'dashed' }} />
    {encryption === 'unencryption' && <div>
      <FirmwareInformation formData={form} />
      <Divider style={{ borderBottomStyle: 'dashed' }} />
    </div>
    }
    {encryption && <div>
      <SerialCheck formData={form} />
      <Divider style={{ borderBottomStyle: 'dashed' }} />
    </div>
    }
  </DynamicOuterCard>);
}
