import React from "react";
import DynamicCard from "@/components/Dynamic/Card";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/dashboard/workplace/locale";
import styles from "./style/table.module.less";
import { Table, Tabs } from "@arco-design/web-react";
import IconModel from "./assets/model.svg";
import IconChip from "./assets/chip.svg";

const TabPane = Tabs.TabPane;

function EspTable() {
  const t = useLocale(locale);
  const chipColumns = [
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
      title: t["workplace.table.info.chip"],
      children: [
        {
          title: "ESP8285",
          dataIndex: "c8285"
        },
        {
          title: "ESP32",
          dataIndex: "c32"
        },
        {
          title: "ESP32-S2",
          dataIndex: "cs2"
        },
        {
          title: "ESP32-C3(and ESP8685)",
          dataIndex: "cc3"
        },
        {
          title: "ESP32-S3",
          dataIndex: "cs3"
        },
        {
          title: "ESP32-C2(and ESP8684)",
          dataIndex: "cc2"
        }
      ]
    }
  ];
  const modelColumns = [
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
          title: "ESP8266 & ESP8285",
          dataIndex: "8285"
        },
        {
          title: "ESP32",
          dataIndex: "esp32"
        },
        {
          title: "ESP32-S2",
          dataIndex: "s2"
        },
        {
          title: "ESP32-C3(and ESP8685)",
          dataIndex: "c3"
        },
        {
          title: "ESP32-S3",
          dataIndex: "s3"
        },
        {
          title: "ESP32-C2(and ESP8684)",
          dataIndex: "c2"
        }
      ]
    }
  ];
  const data = [
    {
      key: "1",
      "type": t["workplace.table.info.tip"],
      "subtype": "NA",
      "8285": "√",
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"
    },
    {
      key: "2",
      "type": t["workplace.table.info.mac"],
      "subtype": t["workplace.table.info.mac.flash"],
      "8285": "√",
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"
    },
    {
      key: "3",
      "type": t["workplace.table.info.mac"],
      "subtype": t["workplace.table.info.mac.efuse"],
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"
    },
    {
      key: "4",
      "type": t["workplace.table.info.firmware"],
      "subtype": t["workplace.table.info.firmware.not"],
      "8285": "√",
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√",
      "c8285": "√",
      "c32": "√",
      "cs2": "√",
      "cc3": "√"
    },
    {
      key: "5",
      "type": t["workplace.table.info.tip"],
      "subtype": t["workplace.table.info.firmware.flash"],
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"

    },
    {
      key: "6",
      "type": t["workplace.table.info.tip"],
      "subtype": t["workplace.table.info.firmware.secure"],
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"
    },
    {
      key: "7",
      "type": t["workplace.table.info.context"],
      "subtype": t["workplace.table.info.other.flash"],
      "8285": "√",
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"
    },
    {
      key: "8",
      "type": t["workplace.table.info.other"],
      "subtype": t["workplace.table.info.other.eFuse"],
      "esp32": "√",
      "s2": "√",
      "c3": "√",
      "s3": "√"
    },
    {
      key: "9",
      "type": t["workplace.table.info.pre.fit"],
      "subtype": "NA",
      "esp32": "√",
      "c3": "√",
      "s3": "√"
    }
  ];
  return <DynamicCard title={t["workplace.table.info.title"]} bodyStyle={{ paddingTop: 0 }}>
    <Tabs defaultActiveTab="1">
      <TabPane
        key="1"
        title={
          <span>
            <IconModel className={styles["icon"]} />
            {t["workplace.table.info.model"]}
          </span>
        }
      >
        <Table
          size={"mini"}
          borderCell={true}
          columns={modelColumns}
          data={data}
          border={{
            headerCell: true,
            bodyCell: false
          }}
          className={styles["esp-table"]}
          stripe={true}
          pagination={false}
        />
      </TabPane>
      <TabPane
        key="2"
        title={
          <span>
            <IconChip className={styles["icon"]} />
            {t["workplace.table.info.chip"]}
          </span>
        }
      >
        <Table
          size={"mini"}
          borderCell={true}
          columns={chipColumns}
          data={data}
          border={{
            headerCell: true,
            bodyCell: false
          }}
          className={styles["esp-table"]}
          stripe={true}
          pagination={false}
        />
      </TabPane>
    </Tabs>

  </DynamicCard>;
}

export default EspTable;
