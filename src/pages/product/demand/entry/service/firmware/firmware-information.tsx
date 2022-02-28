import React from 'react';
import { FormItemProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicForm from '@/components/Dynamic/Form';
import DynamicCard from '@/components/Dynamic/Card';


export default function FirmwareInformation(props: { formData: any }) {
  const t = useLocale();
  const labelCol = {
    span: 12
  };
  const informationProps: Array<FormItemProps> = [
    {
      label: t['firmware.information.name'],
      type: 'input',
      field: 'name',
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t['firmware.information.name.error'],
          minLength: 2
        }
      ]
    },
    {
      label: t['firmware.information.MD5'],
      type: 'input',
      field: 'name',
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t['firmware.information.MD5.error'],
          minLength: 2
        }
      ]
    },
    {
      label: t['firmware.information.startAddress'],
      type: 'input',
      labelCol: labelCol,
      field: 'name',
      required: true,
      rules: [
        {
          required: true,
          message: t['firmware.information.startAddress.error'],
          minLength: 2
        }
      ]
    },
    {
      label: t['firmware.information.upLoad'],
      type: 'upload',
      field: 'name',
      labelCol: labelCol,
      required: true,
      rules: [
        {
          required: true,
          message: t['firmware.information.upLoad.error'],
          minLength: 2
        }
      ]
    }
  ];

  return (
    <DynamicCard title={t['firmware.information.title']}>
      <DynamicForm title={t['firmware.information.title']}
                   formData={props.formData}
                   col={4}
                   formItem={informationProps}
                   onSubmit={() => {
                   }} />
    </DynamicCard>
  );
}
