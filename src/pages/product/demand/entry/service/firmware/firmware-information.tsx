import React, { useMemo, useState } from 'react';
import { FormItemProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicForm from '@/components/Dynamic/Form';
import DynamicCard from '@/components/Dynamic/Card';
import { useUpdateEffect } from 'react-use';
import { getList } from '@/utils/listTools';


export default function FirmwareInformation(props: {initialValues, number?}) {
  const t = useLocale();
  const {initialValues} = props;
  const [number, setNumber] = useState(getList(props.number));
  const labelCol = {
    span: 12
  };
  const informationProps: Array<FormItemProps> = [
    {
      label: t["firmware.information.name"],
      type: "input",
      field: "firmwareName",
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t["firmware.information.name.error"],
          minLength: 2
        }
      ]
    },
    {
      label: t["firmware.information.MD5"],
      type: "input",
      field: "fileMd5",
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t["firmware.information.MD5.error"],
          minLength: 2
        }
      ]
    },
    {
      label: t["firmware.information.startAddress"],
      type: "input",
      labelCol: labelCol,
      field: "beginAddr",
      required: true,
      placeholder: t["firmware.information.startAddress.message"],
      rules: [
        {
          required: true,
          message: t["firmware.information.startAddress.error"],
          minLength: 2
        }
      ]
    },
    {
      label: t["firmware.information.upLoad"],
      type: "upload",
      field: "fileId",
      labelCol: labelCol,
      required: true,
      limit: 1,
      rules: [
        {
          required: true,
          message: t["firmware.information.upLoad.error"]
        }
      ]
    }
  ];

  useUpdateEffect(() => {
    setNumber(getList(props.number));
  }, [props.number]);


  return useMemo(() => {
    return (
      <DynamicCard title={t["firmware.information.title"]}>
        <DynamicCard title={t["firmware.information.title"]}>
          {number.map(item => {
            return <DynamicForm title={`firmware.information.title-${item}`}
                                col={4}
                                key={item}
                                data={initialValues ? initialValues[item] : {}}
                                formItem={informationProps} />;
          })
          }
        </DynamicCard>
      </DynamicCard>
    );
  }, [number]);
}
