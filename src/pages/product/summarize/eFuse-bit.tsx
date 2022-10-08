import React from "react";
import { Table, TableColumnProps, Typography } from "@arco-design/web-react";

const { Text } = Typography;
const EFuseBit = (props) => {
  const { data } = props;
  const columns: TableColumnProps[] = [
    {
      title: "eFuse bit",
      dataIndex: "bit",
      align: "center",
      render: (value) => <Text copyable>{value}</Text>
    },
    {
      title: "Target Value",
      dataIndex: "value",
      align: "center",
      render: (value) => <Text copyable>{value}</Text>
    }
  ];

  const getData = (data) => {
    let key = 0;
    const temp = [];
    for (const items in data) {
      for (const item in data[items]) {
        temp.push({
          key: key++,
          bit: item,
          value: data[items][item]
        });
      }
    }
    return temp;
  };
  return <Table pagination={false} size={"mini"} data={getData(data)} columns={columns} />;
};

export default EFuseBit;
