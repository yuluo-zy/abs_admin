import React, { useState } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import { Divider, Form, Input, Link, Message, Modal, Select, Space, Tooltip, Typography } from '@arco-design/web-react';
import FirmwareInformation from '@/pages/product/demand/entry/service/firmware/firmware-information';
import SerialCheck from '@/pages/product/demand/entry/service/firmware/serial-check';
import DynamicRadioGroup from '@/components/Dynamic/Radio';
import { IconLaunch, IconTags } from '@arco-design/web-react/icon';
import FirmwareFile from '@/pages/product/demand/entry/service/firmware/firmware-file';
import FirmwareFlash from '@/pages/product/demand/entry/service/firmware/firmware-flash';
import FirmwareEfuse from '@/pages/product/demand/entry/service/firmware/frimware-efuse';


export default function FirmwareCustomization() {
  const t = useLocale();

  const Option = Select.Option;
  const [form] = Form.useForm();

  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

  const [history, setHistory] = useState('');
  const [encryption, setEncryption] = useState();
  const [encryptionWay, setEncryptionWay] = useState();
  const [flash, setFlash] = useState();
  const [secure, setSecure] = useState();
  const [visible, setVisible] = useState(false);

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
          <DynamicRadioGroup
            options={[{ label: t['firmware.customization.info.encryption.firmware.flash'], value: 'flash' },
              { label: t['firmware.customization.info.encryption.firmware.secure.boot'], value: 'secure' }]}
            style={{ display: 'block', marginBottom: 16 }}
            onChange={(value) => {
              setEncryptionWay(value);
            }}
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
    {/*加密详情*/}
    {encryptionWay === 'flash' &&
      <Space size={10} direction='vertical'>
        <Typography.Text>{t['firmware.customization.info.encryption.firmware.info']}</Typography.Text>

        <DynamicRadioGroup direction='vertical'
                           options={[{
                             label: t['firmware.customization.info.encryption.firmware.flash.only'],
                             value: 'only'
                           }, {
                             label: t['firmware.customization.info.encryption.firmware.flash.random'],
                             value: 'random'
                           }]}
                           onChange={(value) => {
                             setFlash(value);
                             if (value === 'only') {
                               setVisible(true);
                             }
                           }}
        />
        <Modal
          title='Titles'
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          autoFocus
          focusLock
        >
          <Space size={10} direction='vertical'>
            <Typography.Text>{t['firmware.customization.info.encryption.firmware.flash.only.t1']}</Typography.Text>
            <Typography.Text>{t['firmware.customization.info.encryption.firmware.flash.only.t2']}</Typography.Text>
            <Typography.Text>{t['firmware.customization.info.encryption.firmware.flash.only.t3']}</Typography.Text>
            <div style={{ paddingLeft: '2rem' }}>
              <Space size={10} direction='vertical'>
                <Typography.Text>{t['firmware.customization.info.encryption.firmware.flash.only.t3.t1']}</Typography.Text>
                <Typography.Text>{t['firmware.customization.info.encryption.firmware.flash.only.t3.t2']}</Typography.Text>
              </Space>
            </div>
          </Space>
        </Modal>
        <Space size={10}>
          <Typography.Text>{t['firmware.serial.partitions']}</Typography.Text>
          <Input
            style={{ width: 350 }}
            allowClear
            placeholder='Please Enter something'
          />,
        </Space>
        <Divider style={{ borderBottomStyle: 'dashed' }} />
      </Space>
    }
    {encryptionWay === 'secure' &&
      <Space size={10} direction='vertical'>
        <Typography.Text>{t['firmware.customization.info.encryption.firmware.info']}</Typography.Text>

        <DynamicRadioGroup direction='vertical'
                           options={[{
                             label: t['firmware.customization.info.encryption.firmware.v1'],
                             value: 'v1'
                           }, {
                             label: t['firmware.customization.info.encryption.firmware.v2'],
                             value: 'v2'
                           }]}
                           onChange={(value) => setSecure(value)}
        />
        {secure === 'v2' &&
          <Space size={16}>
            <Typography.Text>{t['firmware.customization.info.encryption.firmware.v2.key']}</Typography.Text>
            <Input
              style={{ width: 350 }}
              allowClear
            />,
          </Space>

        }
        <Divider style={{ borderBottomStyle: 'dashed' }} />
      </Space>
    }
    {
      flash === 'only' && <div>
        <FirmwareFile />
        <Divider style={{ borderBottomStyle: 'dashed' }} />
        <FirmwareFlash formData={form} />
        <Divider style={{ borderBottomStyle: 'dashed' }} />
        <FirmwareEfuse formData={form} />
        <Divider style={{ borderBottomStyle: 'dashed' }} />
      </div>
    }
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
