import React from "react";
import { FormItemProps } from "@/components/type";
import useLocale from "@/pages/product/demand/locale/useLocale";
import style from "./style/index.module.less";

export default function FirmwareInformation(props: { initialValues }) {
  const t = useLocale();
  const { initialValues } = props;
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
      ],
      style: {
        minWidth: "15rem"
      }
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
      ],
      style: {
        minWidth: "17rem"
      }
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
      ],
      style: {
        minWidth: "17rem"
      }
    }
  ];

  return <div className={style["button_group_delete"]}>
    {/*<DynamicForm title={`firmware.information.title-${item}`}*/}
    {/*             col={3}*/}
    {/*             key={item}*/}
    {/*             style={{ "float": (item === number.length) && deleteItem ? "left" : "" }}*/}
    {/*             className={style["button_group_delete-form"]}*/}
    {/*             data={initialValues?.[index]}*/}
    {/*             formItem={informationProps} />*/}
    {/*{(item === number.length) && deleteItem && <Button*/}
    {/*  className={style["button_group_delete-button"]}*/}
    {/*  icon={<IconDelete />}*/}
    {/*  shape="circle"*/}
    {/*  status="danger"*/}
    {/*  onClick={deleteItem}*/}
    {/*></Button>}*/}
  </div>;
}
