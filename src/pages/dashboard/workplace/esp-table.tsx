import React from "react";
import DynamicCard from "@/components/Dynamic/Card";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/dashboard/workplace/locale";
import styles from "./style/table.module.less";
import { Table } from "@arco-design/web-react";


function EspTable() {
  const t = useLocale(locale);
  const columns = [
    {
      title: t["workplace.table.info.type"],
      dataIndex: "type",
      render: (col, item, index) => {
        const obj = {
          children: col,
          props: { rowSpan: 0 }
        };

        if (index === 0) {
          obj.props.rowSpan = 1;
        }
        if (index === 1) {
          obj.props.rowSpan = 2;
        }
        if (index === 3) {
          obj.props.rowSpan = 3;
        }
        if (index === 6) {
          obj.props.rowSpan = 2;
        }
        if (index === 8) {
          obj.props.rowSpan = 1;
        }

        return obj;
      }
    },
    {
      title: t["workplace.table.info.sub.type"],
      dataIndex: "subtype"
    },
    {
      title: t["workplace.table.info.model"],
      children: [
        {
          title: "ESP32-C3",
          dataIndex: "c3"
        },
        {
          title: "ESP32-S2",
          dataIndex: "s2"
        },
        {
          title: "ESP32",
          dataIndex: "32"
        },
        {
          title: "ESP8266 & ESP8285",
          dataIndex: "8266"
        }
      ]
    },
    {
      title: t["workplace.table.info.chip"],
      children: [
        {
          title: "ESP8285",
          dataIndex: "8285"
        },
        {
          title: "ESP32-U4WDH",
          dataIndex: "u4wdh"
        },
        {
          title: "ESP32-D2WD",
          dataIndex: "d2wd"
        },
        {
          title: "ESP32-PICO-D4",
          dataIndex: "d4"
        },
        {
          title: "ESP32-PICO-v3",
          dataIndex: "v3"
        }
      ]
    }
  ];

  const data = [
    {
      key: "1",
      "type": t["workplace.table.info.tip"],
      "subtype": "NA",
      "c3": "√",
      "s2": "√",
      "32": "√",
      "8266": "√"
    },
    {
      key: "2",
      "type": t["workplace.table.info.mac"],
      "subtype": t["workplace.table.info.mac.flash"],
      "c3": "√",
      "s2": "√",
      "32": "√",
      "8266": "√"
    },
    {
      key: "3",
      "type": t["workplace.table.info.mac"],
      "subtype": t["workplace.table.info.mac.efuse"],
      "c3": "√",
      "s2": "√",
      "32": "√"
    },
    {
      key: "4",
      "type": t["workplace.table.info.firmware"],
      "subtype": t["workplace.table.info.firmware.not"],
      "c3": "√",
      "s2": "√",
      "32": "√",
      "8266": "√",
      "8285": "√",
      "u4wdh": "√",
      "d2wd": "√",
      "d4": "√",
      "v3": "√"
    },
    {
      key: "5",
      "type": t["workplace.table.info.tip"],
      "subtype": t["workplace.table.info.firmware.flash"],
      "c3": "√",
      "s2": "√",
      "32": "√"

    },
    {
      key: "6",
      "type": t["workplace.table.info.tip"],
      "subtype": t["workplace.table.info.firmware.secure"],
      "c3": "√",
      "s2": "√",
      "32": "√",
      "u4wdh": "√",
      "d2wd": "√",
      "d4": "√",
      "v3": "√"
    },
    {
      key: "7",
      "type": t["workplace.table.info.other"],
      "subtype": t["workplace.table.info.other.flash"],
      "c3": "√",
      "s2": "√",
      "32": "√",
      "8286": "√"
    },
    {
      key: "8",
      "type": t["workplace.table.info.other"],
      "subtype": t["workplace.table.info.other.eFuse"],
      "c3": "√",
      "s2": "√",
      "32": "√"
    },
    {
      key: "9",
      "type": t["workplace.table.info.other"],
      "subtype": "NA",
      "c3": "√",
      "s2": "√",
      "32": "√"
    }
  ];
  return <DynamicCard title={t["workplace.table.info.title"]}>
    <Table
      size={"mini"}
      borderCell={true}
      columns={columns}
      data={data}
      border={{
        headerCell: true,
        bodyCell: false
      }}
      className={styles["esp-table"]}
      stripe={true}
      pagination={false}
    />
  </DynamicCard>;
}

export default EspTable;
