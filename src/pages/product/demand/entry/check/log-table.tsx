import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Grid, Table, TableColumnProps, Typography } from "@arco-design/web-react";
import { IconCheckSquare, IconCloseCircle } from "@arco-design/web-react/icon";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";

const Row = Grid.Row;
const Col = Grid.Col;

export default function LogTable(props: { data }) {
  const t = useLocale();
  const { data } = props;

  const title = (name) => {
    switch (name) {
      case "定制固件":
        return t["self.check.boot.upload.port.hit.firmware"];
      case "定制内容烧录":
        return t["self.check.boot.upload.port.hit.mac"];
      case "定制MAC":
        return t["self.check.boot.upload.port.hit.burn"];
    }
    return "";
  };

  const columns: TableColumnProps[] = [
    {
      align: "center",
      title: t["self.check.boot.log.file.name"],
      dataIndex: "serCustomPosition",
      width: 150,
      render: (col, record, index) => {
        return title(col);
      }
    },
    {
      align: "center",
      title: t["self.check.boot.log.expect.name"],
      dataIndex: "expectedValue",
      render: (col) => {
        return <Typography.Paragraph style={{ width: "100%", margin: "3px" }}>
          {col}
        </Typography.Paragraph>;
      }
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
    <Table columns={columns} data={data} stripe={true}
           pagination={false} size={"mini"} hover />

  </DynamicSkeleton>;
}
