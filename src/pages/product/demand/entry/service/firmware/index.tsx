import React, { useState } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Link,
  Modal,
  Select,
  Space,
  Tooltip,
  Typography,
  Message
} from "@arco-design/web-react";
import FirmwareInformation from '@/pages/product/demand/entry/service/firmware/firmware-information';
import SerialCheck from '@/pages/product/demand/entry/service/firmware/serial-check';
import DynamicRadioGroup from '@/components/Dynamic/Radio';
import { IconArrowRight, IconLaunch, IconTags } from "@arco-design/web-react/icon";
import FirmwareFile from '@/pages/product/demand/entry/service/firmware/firmware-file';
import FirmwareFlash from '@/pages/product/demand/entry/service/firmware/firmware-flash';
import FirmwareEfuse from '@/pages/product/demand/entry/service/firmware/frimware-efuse';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import ProductStore from "@/store/product";
import shallow from "zustand/shallow";
import style from "./style/index.module.less";
const CheckboxGroup = Checkbox.Group;

export default function FirmwareCustomization() {
  const t = useLocale();

  const Option = Select.Option;

  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
  const [demandId,moduleInfo, setCollapse] = ProductStore(state => [state.demandId,state.moduleInfo, state.setCollapse], shallow);
  const [info, setInfo] =  ProductStore(state => [state.info,state.setInfo], shallow);
  const [visible, setVisible] = useState(false);
  // 是否加密
  const [encryption, setEncryption] = useState(null)
  // 加密种类
  const [encryptionType, setEncryptionType] = useState([])
  // 安全启动种类
  const [secure, setSecure] = useState('')
  const [flash, setFlash] = useState('')

  return (<DynamicOuterCard title={t['firmware.customization.title']}>
    <DynamicSkeleton animation text={{ rows: 10, width: ['100%', 600, 400] }}>
      <Space size={30} direction='vertical'>
        <Space size={60} split={<Divider type='vertical' />}>
          <Space size={20}>
            <Typography.Text>{t['firmware.customization.info.version']}</Typography.Text>
            <Input
              style={{ width: 350 }}
              allowClear
              size={'large'}
              onChange={value => setInfo({
                firmwareVersion: value
              })}
              defaultValue = {info?.firmwareVersion}
              placeholder={t['firmware.customization.info.version.hint']}
            />
          </Space>
          <Space size={20}>
            <Typography.Text>{t['firmware.customization.info.project']}</Typography.Text>
            <Select
              size={'large'}
              placeholder={t['firmware.customization.info.project.hint']}
              style={{ width: 300 }}
              defaultValue={info?.firmwareProject}
              onChange={(value) => setInfo({
                firmwareProject: value
              })}
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
          <DynamicRadioGroup
            direction='vertical'
            defaultValue={info?.firstImport}
            options={[
            { label: t['firmware.customization.info.project.history.first'], value: 1 },
            { label: t['firmware.customization.info.project.history.next'], value: 0 }
          ]} onChange={(value) => {
              setInfo({ firstImport: value })
          }} />
          {
           info?.firstImport === 0 &&  <Space size={12}>
              <IconTags style={
                { color: '#00B42A', fontSize: 20 }
              } />
              <Typography.Text>{t['firmware.customization.info.project.history.old']}</Typography.Text>
              <Select
                size={'large'}
                style={{ width: 300 }}
                placeholder={t['firmware.customization.info.project.hint']}
                defaultValue={info?.lastMpn}
                onChange={(value) =>setInfo({ lastMpn: value })}
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
          { label: t['firmware.customization.info.unencryption.firmware'], value: false },
          { label: t['firmware.customization.info.encryption.firmware'], value: true }
        ]} onChange={(value) => {
          setEncryption(value);
          setEncryptionType([]);
          setSecure('');
          setFlash('');
        }} />
        {/*选择 flash 和 boot*/}
        {encryption && <div style={{ paddingLeft: '6rem' }}>
          <Space size={40}>
            <CheckboxGroup
              options={[{ label: t['firmware.customization.info.encryption.firmware.flash'], value: 'flash' },
                { label: t['firmware.customization.info.encryption.firmware.secure.boot'], value: 'secure' },
              ]}
              style={{ display: 'block', marginBottom: 16 }}
              onChange={(value) => {
                setEncryptionType(value)
              }}
            />
          </Space>
        </div>}
      </Space>
      <Divider style={{ borderBottomStyle: 'dashed' }} />
      {/*配置安全启动种类*/}
      {encryptionType.includes('secure') &&
        <div>
        <Space size={10} direction='vertical'>
          <Typography.Text>
            {t['firmware.customization.info.encryption.firmware.secure.info']}
            <Tooltip color={'#0E42D2'} position={'rt'}
                     defaultPopupVisible
                     content={t['firmware.customization.info.encryption.firmware.v2.link']}>
              <Link target={'_blank'}
                    href='https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html'>
                <IconLaunch style={
                  { color: '#0E42D2', fontSize: 15 }
                } />
              </Link>
            </Tooltip>
          </Typography.Text>

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

          { secure === 'v2' && <div>
            <Typography.Text>{t["firmware.customization.info.encryption.firmware.v2.key"]}</Typography.Text>
            <Input
            style={{width: 350}}
            allowClear
            />
          </div>
            }
        </Space>

          <Divider style={{ borderBottomStyle: 'dashed' }} />
        </div>
      }
      {/*配置 flash 加密种类*/}
      {encryptionType.includes('flash') &&
        <Space size={10} direction='vertical'>
          <Typography.Text>{t['firmware.customization.info.encryption.firmware.flash.info']}</Typography.Text>

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

      {/*开始配置表单*/}
      <Form.Provider
        onFormValuesChange={(name, changedValues, info) => {
          console.log('onFormValuesChange: ', name, changedValues, info)
        }}
        onFormSubmit={(name, values, info) => {
          console.log('onFormSubmit: ',name, values, info)
          Message.info({
            icon: <span></span>,
            content: <div style={{textAlign: 'left'}}>
              <span>form values:</span>
              <pre>
                {
                  JSON.stringify({
                    ...info.forms['firmware.information.title'].getFieldsValue(),
                    ...info.forms['firmware.serial.check.title'].getFieldsValue(),
                  }, null, 2)
                }
              </pre>
            </div>
          })
        }}
      >
      {/*非加密固件*/}
      {encryption === false  && <div>
        <FirmwareInformation />
        <Divider style={{ borderBottomStyle: 'dashed' }} />
        <SerialCheck />
        <Divider style={{ borderBottomStyle: 'dashed' }} />
      </div>
      }

      {/*{*/}
      {/*  flash === 'only' && <div>*/}
      {/*    <FirmwareFile />*/}
      {/*    <Divider style={{ borderBottomStyle: 'dashed' }} />*/}
      {/*    <FirmwareFlash formData={form} />*/}
      {/*    <Divider style={{ borderBottomStyle: 'dashed' }} />*/}
      {/*    <FirmwareEfuse formData={form} />*/}
      {/*    <Divider style={{ borderBottomStyle: 'dashed' }} />*/}
      {/*  </div>*/}
      {/*}*/}


        {/*下一步*/}

        <div className={style["model-next"]}>
          <Form id='searchForm' layout='vertical' style={{maxWidth: '9rem'}}>
          <Button type="primary"
                  size={"large"}
                  htmlType='submit'
                  icon={<IconArrowRight />}
          >
            {t["hardware.production.info.next"]}
          </Button>
          </Form>
        </div>
      </Form.Provider>
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
