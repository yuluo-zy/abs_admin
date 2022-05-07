import React from 'react';
import { FormItemProps, FormList } from "@/components/type";
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicForm from '@/components/Dynamic/Form';
import DynamicCard from '@/components/Dynamic/Card';


export default function FirmwareInformation(props) {
  const t = useLocale();
  const {number} = props
  const labelCol = {
    span: 12
  };
  const informationProps: Array<FormItemProps> = [
    {
      label: t['firmware.information.name'],
      type: 'input',
      field: 'firmwareName',
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
      field: 'fileMd5',
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
      field: 'beginAddr',
      required: true,
      placeholder: t['firmware.information.startAddress.message'],
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
      field: 'files',
      labelCol: labelCol,
      required: true,
      limit: 1,
      rules: [
        {
          required: true,
          message: t['firmware.information.upLoad.error'],
        }
      ]
    }
  ];

  if(number !== undefined){
    const formList = [...new Array(number).keys()]
    return (
      <DynamicCard title={t['firmware.information.title']}>
        {
          formList.map(item=> {
            return <DynamicForm title={`firmware.information.title-${item}`}
                                col={4}
                                formItem={informationProps} />
          })
        }
      </DynamicCard>
    );
  }

  return (
    <DynamicCard title={t['firmware.information.title']}>
      <DynamicForm title={'firmware.information.title'}
                   col={4}
                   formItem={informationProps} />
    </DynamicCard>
  );
}
