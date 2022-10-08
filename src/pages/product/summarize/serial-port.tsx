import React from "react";
import { Table, TableColumnProps, Typography } from "@arco-design/web-react";

const { Text } = Typography;
const SerialPort = (props) => {
  const { data } = props;
  const columns: TableColumnProps[] = [
    {
      title: "Number",
      dataIndex: "key",
      align: "center",
      width: 50
    },
    {
      title: "Target Value",
      dataIndex: "value",
      align: "center",
      render: (value) => <Text copyable>{value}</Text>
    }
  ];

  const getData = (data) => {
    let key = 1;
    const temp = [];
    for (const items in data) {
      temp.push({
        key: key++,
        value: data[items]
      });
    }
    return temp;
  };
  return <Table pagination={false} size={"mini"} data={getData(data)} columns={columns} />;
};

export default SerialPort;
