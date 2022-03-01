import React from 'react';
import { FormItemProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicForm from '@/components/Dynamic/Form';
import DynamicCard from '@/components/Dynamic/Card';


export default function FirmwareEfuse(props: { formData: any }) {
  const t = useLocale();
  const labelCol = {
    span: 12
  };
  const informationProps: Array<FormItemProps> = [{
    label: 'Flash Frequency',
    type: 'select',
    field: 'name',
    labelCol: labelCol,
    required: true,
    options: [
      { label: '40m', value: 1 },
      { label: '26m', value: 2 },
      { label: '20m', value: 3 },
      { label: '28m', value: 4 }
    ]
  },
    {
      label: 'Flash Mode',
      type: 'select',
      field: 'name',
      labelCol: labelCol,
      required: true,
      options: [
        { label: 'QIO', value: 1 },
        { label: 'QOUT', value: 2 },
        { label: 'DIO', value: 3 },
        { label: 'DOUT', value: 4 }
      ]
    },
    {
      label: 'Flash Size',
      type: 'select',
      field: 'name',
      labelCol: labelCol,
      required: true,
      options: [
        { label: '1MB', value: 1 },
        { label: '2MB', value: 2 },
        { label: '4MB', value: 3 },
        { label: '8MB', value: 4 },
        { label: '16MB', value: 5 }
      ]
    }
  ];

  return (
    <DynamicCard title={t['firmware.information.title']}>
      <DynamicForm title={t['firmware.information.title']}
                   formData={props.formData}
                   col={3}
                   formItem={informationProps}
                   onSubmit={() => {
                   }} />
    </DynamicCard>
  );
}
