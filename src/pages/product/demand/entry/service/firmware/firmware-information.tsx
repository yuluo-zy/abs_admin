import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicForm from "@/components/Dynamic/Form";
import DynamicCard from "@/components/Dynamic/Card";
import { getList } from "@/utils/listTools";
import { Button, InputNumber, Link, Notification, Space, Tooltip, Typography } from "@arco-design/web-react";
import style from "./style/index.module.less";
import { IconDelete, IconLaunch, IconPlus } from "@arco-design/web-react/icon";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { FormItemProps } from "@/components/type";

export default function FirmwareInformation(props: { initialValues }) {
  const t = useLocale();
  const { initialValues } = props;
  const [info, setInfo] = ProductStore(state => [state.info, state.setInfo], shallow);
  const labelCol = {
    span: 12
  };
  const informationProps: Array<FormItemProps> = [
    {
      label: t["firmware.information.startAddress"],
      type: "input",
      field: "beginAddr",
      required: true,
      labelCol: labelCol,
      rules: [
        {
          required: true,
          message: t["firmware.information.startAddress.error"],
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

  const getInformationProps = (): Array<FormItemProps> => {
    if (!info?.partitionNum || info?.partitionNum <= 1) {
      return informationProps.slice(1, 3);
    }
    return informationProps;
  };

  const deleteItem = () => {
    // 先在 form 中删除这里的信息, 然后再数量减一
    if (info?.partitionNum > 3) {
      setInfo({
        partitionNum: info.partitionNum - 1
      });
    } else {
      Notification.warning({
        content: t["firmware.customization.info.encryption.firmware.min_size"]
      });
    }
  };

  const addItem = () => {
    if (info?.partitionNum < 8) {
      setInfo({
        partitionNum: info.partitionNum + 1
      });
    } else {
      Notification.warning({
        content: t["firmware.customization.info.encryption.firmware.max_size"]
      });
    }
  };
  const number = getList(info?.partitionNum);
  return <>
    <DynamicCard title={t["firmware.information.title"]}>
      {info?.keyType === 1 && <> <Space size={10}>
        <Typography.Text>
          {t["firmware.serial.partitions"]}

          <Link target={"_blank"}
                href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/security/secure-boot-v1.html">
            <IconLaunch style={
              { color: "#0E42D2", fontSize: 15 }
            } />
          </Link>

        </Typography.Text>
        <Tooltip color={"#0E42D2"} position={"right"}
                 defaultPopupVisible
                 content={t["firmware.customization.info.encryption.firmware.flash.link"]}>
          <InputNumber
            style={{ width: 150 }}
            mode="button"
            min={3}
            max={8}
            value={info?.partitionNum}
            onChange={value => {
              setInfo({
                partitionNum: value ? value : 3
              });
            }}
            placeholder="Partitions Numbers"
          /></Tooltip>
      </Space>
        <br /><br />
      </>}
      {number.map((item, index) => {
        return <div key={index} className={style["button_group_delete"]}>
          <DynamicForm title={`firmware.information.title-${item}`}
                       col={3}
                       style={{ "float": (item === number.length) && deleteItem ? "left" : "" }}
                       className={style["button_group_delete-form"]}
                       data={initialValues?.[index]}
                       formItem={getInformationProps()} />
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
  </>;

}
