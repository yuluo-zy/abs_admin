import React from "react";
import { FormItemProps } from "@/components/type";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicCard from "@/components/Dynamic/Card";


export default function FirmwareFlash(props: { initialValues }) {
  const t = useLocale();
  const labelCol = {
    span: 24
  };
  const { initialValues } = props;
  const informationProps: Array<FormItemProps> = [{
    label: "Flash Frequency",
    type: "select",
    field: "flashFrequency",
    labelCol: labelCol,
    required: true,
    options: [
      { label: "40m", value: 1 },
      { label: "26m", value: 2 },
      { label: "20m", value: 3 },
      { label: "80m", value: 4 }
    ],
    rules: [
      {
        required: true,
        message: t["firmware.information.flash.config.error"]
      }
    ]
  },
    {
      label: "Flash Mode",
      type: "select",
      field: "flashMode",
      labelCol: labelCol,
      required: true,
      options: [
        { label: "QIO", value: "QIO" },
        { label: "QOUT", value: "QOUT" },
        { label: "DIO", value: "DIO" },
        { label: "DOUT", value: "DOUT" }
      ],
      rules: [
        {
          required: true,
          message: t["firmware.information.flash.config.error"]
        }
      ]
    },

    {
      label: "Flash Size",
      type: "select",
      field: "flashSize",
      labelCol: labelCol,
      required: true,
      options: [
        { label: "1MB", value: 1 },
        { label: "2MB", value: 2 },
        { label: "4MB", value: 3 },
        { label: "8MB", value: 4 },
        { label: "16MB", value: 5 }
      ],
      rules: [
        {
          required: true,
          message: t["firmware.information.flash.config.error"]
        }
      ]
    }
  ];

  return (
    <DynamicCard title={t["firmware.information.flash.title"]}>
      <DynamicForm title={"firmware.information.flash.title"}
                   col={4}
                   data={initialValues}
                   formItem={informationProps} />
    </DynamicCard>
  );
}
