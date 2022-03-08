import React, { useState } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import style from './style/index.module.less';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import { Checkbox, Form, Select, Space } from '@arco-design/web-react';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import DynamicDivider from '@/components/Dynamic/Divider';
import { FormList } from '@/components/type';
import DynamicForm from '@/components/Dynamic/Form';

const Option = Select.Option;


export default function ServicePreselection() {
  const t = useLocale();
  const [flash, setFlash] = useState(false);
  const [efuse, setEfuse] = useState(false);
  const [flashSelect, setFlashSelect] = useState();
  const options = [
    t['firmware.burn.flash.planA'],
    t['firmware.burn.flash.planB'],
    t['firmware.burn.flash.planC']
  ];

  const [form] = Form.useForm();

  const FlashItem: FormList[] = [
    {
      field: 'context',
      fieldList: [
        {
          label: t[''],
          field: 'date',
          type: 'input',
          labelCol: 5
        },
        {
          label: t['userTable.columns.id'],
          field: 'address',
          type: 'input',
          labelCol: 5
        },
        {
          label: t['userTable.columns.id'],
          field: 'output',
          type: 'text',
          labelCol: 11
        },

        {
          label: t['userTable.columns.id'],
          field: 'output',
          type: 'upload',
          labelCol: 3
        }
      ],
      styles: style['list']
    }
  ];


  const getFormList = (value: number | undefined) => {
    if (value != undefined) {
      console.log(value);
      return <DynamicForm data={{ 'context': [{}] }} title={t['firmware.burn.flash.title']} formList={FlashItem[value]}
                          formData={form} onSubmit={() => {
      }} />;
    }
  };

  return (<DynamicOuterCard title={t['firmware.burn.title']}>
    <DynamicSkeleton animation text={{ rows: 10, width: ['100%', 600, 400] }}>
      <Space size={10} direction={'vertical'}>
        <Space size={15} direction={'vertical'}>
          {t['firmware.burn.title.context']}
          <Checkbox checked={flash} onChange={() => {
            setFlash(!flash);
          }}>Flash</Checkbox>
          <Checkbox checked={efuse} onChange={() => {
            setEfuse(!efuse);
          }}>eFuse</Checkbox>
        </Space>
        <br />
        <Space>
          {t['firmware.burn.hint']}
        </Space>
        <Space>
          {t['firmware.burn.hint.notice']}
        </Space>
      </Space>

      <DynamicDivider />
      {
        flash && <div>
          <Space size={15}>
            {t['firmware.burn.flash.title']}
            <Select
              placeholder='Please select'
              style={{ width: 400 }}
              onChange={(value) => {
                setFlashSelect(value);
              }}
            >
              {options.map((option, index) => (
                <Option key={option} value={index}>
                  {option}
                </Option>
              ))}
            </Select>
          </Space>
        </div>
      }

      {
        getFormList(flashSelect)
      }
      < DynamicDivider />
      {
        efuse && <div>
          <Space>
            {t['firmware.burn.efuse.title']}
          </Space>
          <DynamicDivider />
        </div>
      }
    </DynamicSkeleton>
  </DynamicOuterCard>);
}
