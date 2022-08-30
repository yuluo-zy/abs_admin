import React from "react";
import { Table, TableColumnProps, Typography } from "@arco-design/web-react";

const { Text } = Typography;
const BinFile = (props) => {
  const { data } = props;
  const columns: TableColumnProps[] = [
    {
      title: "Firmware bin Name",
      dataIndex: "firmwareName",
    },
    {
      title: "Md5 value",
      dataIndex: "fileMd5",
      render: (value) => <Text copyable>{value}</Text>
    },
    {
      title: "Flash Offset",
      dataIndex: "beginAddr",
      render: (value) => <Text copyable>{value}</Text>
    }

  ];

  return <Table pagination={false} size={"mini"} data={data} columns={columns} />;
};

export default BinFile;
