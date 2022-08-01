import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Space, Table } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import { IconCheckSquare, IconCloseCircle } from "@arco-design/web-react/icon";

export default function CheckTable(props: { data }) {
  const t = useLocale();
  const { data } = props;

  const md5 = () => {
    return <Space direction="vertical" className={styles["project"]}>
      <p>{t["self.check.table.Md5"]}</p>
      <p>{t["self.check.table.Md5.info"]}</p>
    </Space>;
  };

  const serial = () => {
    return <Space direction="vertical" className={styles["project"]}>
      <p>{t["self.check.table.serial.port"]}</p>
      <p>{t["self.check.table.serial.port.info"]}</p>
    </Space>;
  };
  const efuse = () => {
    return <Space direction="vertical" className={styles["project"]}>
      <p>{t["self.check.table.efuse"]}</p>
      <p>{t["self.check.table.efuse.info"]}</p>
    </Space>;
  };

  const getNode = (node) => {
    switch (node) {
      case "md5":
        return md5();
      case "serial":
        return serial();
      case "efuse":
        return efuse();
    }
  };
  const getRender = (col, item, index) => {
    const obj = {
      children: getNode(col),
      props: { rowSpan: 0 }
    };
    const fileLength = data?.fileMd5?.length || 0;
    const serialLength = data?.serialLog?.length || 0;
    const efuseLength = data?.efuseValue?.length || 0;
    if (data && index === 0) {
      obj.props.rowSpan = fileLength;
    } else if (data && index === fileLength) {
      obj.props.rowSpan = serialLength;
    } else if (data && index === fileLength + serialLength) {
      obj.props.rowSpan = efuseLength;
    }
    return obj;
  };

  const columns = [
    {
      title: t["self.check.table.project"],
      dataIndex: "project",
      render: getRender
    },
    {
      title: t["self.check.table.file"],
      dataIndex: "fileName"
    },
    {
      title: t["self.check.table.expected.value"],
      dataIndex: "expectedValue"
    },
    {
      title: t["self.check.return.result"],
      dataIndex: "result",
      render: (col, record, index) => {
        if (col && col === "FAIL") {
          return <IconCloseCircle style={{ color: "rgb(var(--red-6))", fontSize: "1.5rem" }} />;
        }
        return <IconCheckSquare style={{ color: "rgb(var(--green-6))", fontSize: "1.5rem" }} />;
      }
    }
  ];

  const getData = (data) => {
    let temp = [];
    if (data) {
      if (data.fileMd5) {
        for (const i of data.fileMd5) {
          temp.push({
            project: "md5",
            ...i
          });
        }
      }
      if (data.serialLog) {
        for (const i of data.serialLog) {
          temp.push({
            project: "serial",
            ...i
          });
        }
      }
      if (data.efuseValue) {
        for (const i of data.efuseValue) {
          temp.push({
            project: "efuse",
            ...i
          });
        }
      }
    }
    return temp;
  };


  return <div>
    <Space>
      <p>{t["self.check.return.result"]}</p>
      <b>{data.result}</b>
    </Space>
    <Table columns={columns} data={getData(data)} hover={false} pagination={false} />
  </div>;
}
