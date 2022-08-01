import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Table, TableColumnProps } from "@arco-design/web-react";
import { IconCheckSquare, IconCloseCircle } from "@arco-design/web-react/icon";


const convert = (data) => {

};

export default function EFuseTable(props: { data }) {
  const { data } = props;
  const t = useLocale();
  const columns: TableColumnProps[] = [
    {
      align: "center",
      title: t["self.check.boot.efuse.file.name"],
      dataIndex: "fileName",
      width: 200
    },
    {
      align: "center",
      title: t["self.check.boot.efuse.expect.name"],
      dataIndex: "expectedValue"
    },
    {
      align: "center",
      title: t["self.check.boot.result"],
      dataIndex: "result",
      width: 100,
      render: (col, record, index) => {
        console.log(col);
        if (col && col === "FAIL") {
          return <IconCloseCircle style={{ color: "rgb(var(--red-6))" }} />;
        }
        return <IconCheckSquare style={{ color: "rgb(var(--green-6))" }} />;
      }
    }
  ];

  return <Table columns={columns} data={data} stripe={true} pagination={false} size={"mini"} hover />;
}
