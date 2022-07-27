import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Space, Table } from "@arco-design/web-react";

export default function CheckTable(props: { data }) {
  const t = useLocale();
  const { data } = props;

  const getRender = (col, item, index) => {
    const obj = {
      children: col,
      props: { colSpan: 0 }
    };
    if (data && index == data?.fileMd5) {
      obj.props.colSpan = data?.fileMd5.length;
    } else if (data && index == data?.fileMd5 + data?.serialLog) {
      obj.props.colSpan = data?.serialLog.length;
    } else if (data && index == data?.fileMd5 + data?.serialLog + data?.efuseValue) {
      obj.props.colSpan = data?.efuseValue.length;
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
      dataIndex: "result"
    }
  ];

  const getData = (data) => {
    let temp = [];
    if (data) {
      if (data.fileMd5) {
        for (const i of data.fileMd5) {
          temp.push({
            project: t["self.check.table.Md5"],
            ...i
          });
        }
      }
      if (data.serialLog) {
        for (const i of data.serialLog) {
          temp.push({
            project: t["self.check.table.serial.port"],
            ...i
          });
        }
      }
      if (data.efuseValue) {
        for (const i of data.efuseValue) {
          temp.push({
            project: t["self.check.table.efuse"],
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
    <Table columns={columns} data={getData(data)} />
  </div>;
}
