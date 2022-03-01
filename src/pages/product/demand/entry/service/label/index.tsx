import React, { useState } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import { Checkbox, Divider, Input, Link, Modal, Space, Tooltip, Typography, Upload } from '@arco-design/web-react';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import style from './style/index.module.less';
import { IconLaunch } from '@arco-design/web-react/icon';

const cardStyle = {
  // minWidth: 200,
  // minHeight: 200
};
export default function CustomLabel() {
  const t = useLocale();
  const [model, setModel] = useState(false);
  const [box, setBox] = useState(false);


  return (<DynamicOuterCard title={t['firmware.label.title']}>
    <DynamicSkeleton animation text={{ rows: 10, width: ['100%', 600, 400] }}>
      <Space size={40}>
        <Space size={20} direction={'vertical'}>
          <Checkbox checked={model} onChange={() => {
            setModel(!model);
          }}>{t['firmware.label.model']}</Checkbox>
          <Checkbox checked={box} onChange={() => {
            setBox(!box);
          }}>{t['firmware.label.box']}</Checkbox>
        </Space>
        <Tooltip color={'#0E42D2'} position={'rt'}
                 content={t['firmware.label.help']}>
          <Link target={'_blank'}
                href='https://www.espressif.com/sites/default/files/documentation/Espressif_Module_Packing_Information_CN.pdf'>
            <IconLaunch style={
              { color: '#0E42D2', fontSize: 15 }
            } />
          </Link>
        </Tooltip>
      </Space>
      <div className={style['label']}>
        {model && <div className={style['label-context']}>
          <div className={style['label-item']}>
            <Upload
              action='/'
              autoUpload
              limit={1}
              showUploadList
              listType='picture-card'
              onPreview={file => {
                Modal.info({
                  title: 'preview',
                  content: <div style={{ textAlign: 'center' }}>
                    <img style={{ maxWidth: '100%' }} src={file.url || URL.createObjectURL(file.originFile)} />
                  </div>
                });
              }}
            />
          </div>
          <div className={style['label-item']}>
            <Typography.Text>{t['firmware.label.model']}</Typography.Text>
          </div>
        </div>}

        {box && <div className={style['label-context']}>
          <div className={style['label-item']}>
            <Upload
              action='/'
              autoUpload
              limit={1}
              showUploadList
              listType='picture-card'
              onPreview={file => {
                Modal.info({
                  title: 'preview',
                  content: <div style={{ textAlign: 'center' }}>
                    <img style={{ maxWidth: '100%' }} src={file.url || URL.createObjectURL(file.originFile)} />
                  </div>
                });
              }}
            />
          </div>
          <div className={style['label-item']}>
            <Typography.Text>{t['firmware.label.box']}</Typography.Text>
          </div>
        </div>}
      </div>


      <Divider style={{ borderBottomStyle: 'dashed' }} />
      <div className={style['remark']}>
        <Typography.Text>{t['firmware.label.remark']}</Typography.Text>
        <Input.TextArea
          style={{ marginTop: 20, marginBottom: 24, marginRight: 20 }}
          maxLength={{ length: 400, errorOnly: true }}
          autoSize={{ minRows: 3 }}
          showWordLimit
          placeholder='More than 400 letters will be error'
        />
      </div>
    </DynamicSkeleton>

  </DynamicOuterCard>);
}
