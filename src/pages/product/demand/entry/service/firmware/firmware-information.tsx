import React, { useMemo, useState } from "react";
import { FormItemProps } from "@/components/type";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicCard from "@/components/Dynamic/Card";
import { useUpdateEffect } from "react-use";
import { getList } from "@/utils/listTools";
import { Button, InputNumber, Link, Space, Tooltip, Typography } from "@arco-design/web-react";
import style from "./style/index.module.less";
import { IconDelete, IconLaunch, IconPlus } from "@arco-design/web-react/icon";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";

export default function FirmwareInformation(props: { initialValues, addItem?, deleteItem?, number?, }) {
  const t = useLocale();
  const { initialValues, addItem, deleteItem } = props;
  const [info, setInfo] = ProductStore(state => [state.info, state.setInfo], shallow);
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

  useUpdateEffect(() => {
    setNumber(getList(props.number));
  }, [props.number]);

  return useMemo(() => {
    return (
     <>
       <DynamicCard title={t["firmware.information.title"]}>
         {info?.keyType === 1 && <> <Space size={10}>
           <Typography.Text>
             {t["firmware.serial.partitions"]}
             <Tooltip color={"#0E42D2"} position={"top"}
                      defaultPopupVisible
                      content={t["firmware.customization.info.encryption.firmware.flash.link"]}>
               <Link target={"_blank"}
                     href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html">
                 <IconLaunch style={
                   { color: "#0E42D2", fontSize: 15 }
                 } />
               </Link>
             </Tooltip>
           </Typography.Text>
           <InputNumber
             style={{ width: 150 }}
             mode="button"
             min={1}
             max={8}
             value={info?.partitionNum}
             onChange={value => {
               setInfo({
                 partitionNum: value
               });
             }}
             placeholder="Please Enter Partitions Numbers"
           />
         </Space>
           <br /><br />
         </>}
         {number.map((item, index) => {
           return <div key={index} className={style["button_group_delete"]}>
             <DynamicForm title={`firmware.information.title-${item}`}
                          col={3}
                          key={item}
                          style={{ "float": (item === number.length) && deleteItem ? "left" : "" }}
                          className={style["button_group_delete-form"]}
                          data={initialValues?.[index]}
                          formItem={informationProps} />
             {(item === number.length) && deleteItem && <Button
                className={style["button_group_delete-button"]}
                icon={<IconDelete />}
                shape="circle"
                status="danger"
                onClick={deleteItem}
              ></Button>}
            </div>;
          })
          }
          {addItem && <Button type="primary" icon={<IconPlus />}
                              onClick={addItem}>{t["firmware.customization.info.encryption.firmware.add"]}</Button>
          }        </DynamicCard>
     </>
    );
  }, [number]);
}
