import React from "react";
import { FormItemProps } from "@/components/type";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicCard from "@/components/Dynamic/Card";

export default function FirmwareKey(props: { initialValues }) {
  const t = useLocale();
  const { initialValues } = props;
  const labelCol = {
    span: 12
  };
  const informationProps: Array<FormItemProps> = [
    {
      label: t["firmware.information.key.name"],
      type: "input",
      field: "keyName",
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t["firmware.information.key.name.error"],
          minLength: 2
        }
      ],
      style: {
        minWidth: "15rem"
      }
    },
    {
      label: t["firmware.information.key.md5"],
      type: "input",
      field: "keyMd5",
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t["firmware.information.key.md5.error"],
          minLength: 2
        }
      ],
      style: {
        minWidth: "17rem"
      }
    },
    {
      label: t["firmware.information.key.file"],
      type: "upload",
      field: "keyId",
      labelCol: labelCol,
      required: true,
      limit: 1,
      rules: [
        {
          required: true,
          message: t["firmware.information.key.file.error"]
        }
      ],
      style: {
        minWidth: "17rem"
      }
    }
  ];

  return <DynamicCard title={t["firmware.information.key"]}>
    <DynamicForm
      col={3}
      title={"firmware.key"}
      data={initialValues}
      className={style["key"]}
      formItem={informationProps} />
  </DynamicCard>;
}
