import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Table, TableColumnProps } from "@arco-design/web-react";
import { IconCheckSquare, IconCloseCircle } from "@arco-design/web-react/icon";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";

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
      width: 120,
      render: (col, record, index) => {
        if (col && col === "FAIL") {
          return <IconCloseCircle style={{ color: "rgb(var(--red-6))", fontSize: "1.5rem" }} />;
        }
        return <IconCheckSquare style={{ color: "rgb(var(--green-6))", fontSize: "1.5rem" }} />;
      }
    }
  ];

  return <DynamicSkeleton text={{ rows: 5 }}>
    <Table columns={columns} data={data} stripe={true} pagination={false} size={"mini"} hover />
  </DynamicSkeleton>;
}
