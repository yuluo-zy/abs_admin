import React, { useEffect, useState } from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { getProductionInfo } from "@/api/production";
import {
  Button,
  Descriptions,
  Message,
  Modal,
  Notification,
  Radio,
  Space,
  Table,
  Typography
} from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import ResizableTitle from "@/components/Dynamic/Resizeable";
import style from "./style/index.module.less";
import { ProductSelectItem } from "@/components/type";
import cs from "classnames";
import { IconArrowRight, IconDelete } from "@arco-design/web-react/icon";
import useFilter, { multiFilter } from "@/utils/useHook/useFilter";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { postProduction } from "@/api/demand";
import { useHistory } from "react-router";

const bodyCellStyle = {};
const originColumns = [

  {
    title: "Name",
    dataIndex: "name",
    fixed: "left" as const,
    width: 170,
    headerCellStyle: {
      position: "sticky" as const,
      top: 0,
      left: 40
    }
  },
  {
    title: "Series",
    dataIndex: "series",
    bodyCellStyle: bodyCellStyle,
    width: 170
  },
  {
    title: "MPN",
    dataIndex: "mpn",
    width: 200,
    bodyCellStyle: bodyCellStyle
  },
  {
    title: "Marketing Status",
    dataIndex: "status",
    bodyCellStyle: bodyCellStyle,
    width: 150
  },
  {
    title: "Antenna",
    dataIndex: "antenna",
    bodyCellStyle: bodyCellStyle,
    width: 100
  },
  {
    title: "Core",
    dataIndex: "core",
    bodyCellStyle: bodyCellStyle,
    width: 100
  },
  {
    title: "Type",
    dataIndex: "type",
    bodyCellStyle: bodyCellStyle,
    width: 80
  },
  {
    title: "Wi-Fi",
    dataIndex: "wifi",
    bodyCellStyle: bodyCellStyle,
    width: 200
  },
  {
    title: "Bluetooth",
    dataIndex: "bluetooth",
    bodyCellStyle: bodyCellStyle,
    width: 200
  },
  {
    title: "Temp (°C)",
    dataIndex: "operatingTemp",
    bodyCellStyle: bodyCellStyle,
    width: 100
  },
  {
    title: "Gpio",
    dataIndex: "gpio",
    bodyCellStyle: bodyCellStyle,
    width: 50
  },
  {
    title: "Flash (MB)",
    dataIndex: "flash",
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: "SRAM (KB)",
    dataIndex: "sram",
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: "PSRAM (MB)",
    dataIndex: "psram",
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: "ROM (KB)",
    dataIndex: "rom",
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: "Freq. (MHz)",
    dataIndex: "freq",
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: "Size (mm)",
    dataIndex: "dimensions",
    bodyCellStyle: bodyCellStyle,
    width: 120
  },
  {
    title: "MPQ/SPQ",
    dataIndex: "spq",
    bodyCellStyle: bodyCellStyle,
    width: 100
  },
  {
    title: "MOQ",
    dataIndex: "moq",
    bodyCellStyle: bodyCellStyle,
    width: 70
  }
];

export default function HardwareSelection() {
  const t = useLocale();
  const socSelect: ProductSelectItem[] = [
    {
      name: t["hardware.production.info.soc"],
      type: "core",
      select: ["SINGLE", "DUAL"]
    },
    {
      name: t["hardware.production.info.soc.antenna"],
      type: "antenna",
      select: ["N/A", "PCB", "IPEX"]
    },
    {
      name: t["hardware.production.info.soc.package"],
      type: "dimensions",
      select: ["QFN56(7*7)", "QFN48(5*5)", "QFN48(6*6)",
        "LGA48(7*7)", "QFN32(5*5)", "QFN28(4*4)"]
    },
    {
      name: t["hardware.production.info.soc.model"],
      type: "series",
      select: ["ESP8685", "ESP32-S3", "ESP32-C3(含ESP8685)", "ESP32-S2", "ESP32", "ESP8266"]
    },
    {
      name: t["hardware.production.info.soc.temperature"],
      type: "operatingTemp",
      select: ["-40 ~ 85", "-40 ~ 105", "-40 ~ 125"]
    },
    {
      name: t["hardware.production.info.soc.flash"],
      type: "flash",
      select: ["1", "2", "4", "8", "16"]
    },
    {
      name: t["hardware.production.info.soc.psram"],
      type: "psram",
      select: ["0", "2", "8"]
    }
  ];
  const moduleSelect: ProductSelectItem[] = [
    {
      name: t["hardware.production.info.module.model"],
      type: "series",
      select: ["ESP8685", "ESP32-S3", "ESP32-C3(含ESP8685)", "ESP32-S2", "ESP32", "ESP8266"]
    },
    {
      name: t["hardware.production.info.module.temperature"],
      type: "operatingTemp",
      select: ["-40 ~ 85", "-40 ~ 105", "-40 ~ 125"]
    },
    {
      name: t["hardware.production.info.module.flash"],
      type: "flash",
      select: ["1", "2", "4", "8", "16"]
    },
    {
      name: t["hardware.production.info.module.psram"],
      type: "psram",
      select: ["0", "2", "8"]
    }
  ];
  const product = [
    {
      name: t["hardware.production.info.chip"],
      type: "SoC",
      description: t["hardware.production.info.chip.description"]
    },
    {
      name: t["hardware.production.info.modules"],
      type: "Module",
      description: t["hardware.production.info.modules.description"]
    }
  ];

  const [productList, setProductList, oldState, setOldState, reduction] = useFilter();
  const [visible, setVisible] = useState(false);
  const [keyList, setKeyList] = useState({});
  const [selectItem, setSelectItem] = useState(-1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [moduleInfo, setModuleInfo, setCollapse] = ProductStore(state => [state.moduleInfo, state.setModuleInfo, state.setCollapse], shallow);
  const demandId = ProductStore(state => state.demandId);
  const dispatchSelect = (oldState, setState, keyList) => {
    if (keyList) {
      setState(multiFilter(oldState, keyList));
    }
  };
  const history = useHistory();

  useEffect(() => {
    if (keyList && Object.keys(keyList).length > 0) {
      dispatchSelect(oldState, setProductList, keyList);
    }
  }, [keyList]);

  useEffect(() => {
    fetchProductionList();
    setCollapse(false);
    setSelectedRowKeys([moduleInfo?.id]);
  }, []);

  const [columns, setColumns] = useState(
    originColumns.map((column, index) => {
      if (column.width) {
        return {
          ...column,
          onHeaderCell: (col) => ({
            width: col.width,
            onResize: handleResize(index)
          })
        };
      }
      return column;
    })
  );

  function handleResize(index) {
    return (e, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width
        };
        return nextColumns;
      });
    };
  }

  const components = {
    header: {
      th: ResizableTitle
    }
  };

  function fetchProductionList() {
    getProductionInfo().then((res) => {
      setOldState(res.data.result);
    });
  }


  const nextStep = () => {
    if (Object.keys(moduleInfo).length === 0) {
      Notification.error({ title: "error", content: t["hardware.production.info.select.model.error"] });
      return;
    }
    setVisible(true);
  };

  const setSelectKey = (key, item) => {
    const keyOld = {
      ...keyList
    };
    if (item === undefined) {
      delete keyOld[key];
    } else {
      keyOld[key] = item;
    }

    setKeyList(keyOld);
  };


  const onEmpty = () => {
    reduction();
    setSelectItem(-1);
    setKeyList({});
    setSelectedRowKeys([]);
    setModuleInfo({});
  };


  const bodyStyle = {
    paddingTop: "0",
    transition: " 0.5s all ease-in-out"
  };

  const getSelectItem = (value: ProductSelectItem) => {
    // 获取 查询选项
    const res = [];
    for (const element of value.select) {
      res.push({
        label: element, value: element
      });
    }
    return res;
  };

  const getDescriptions = (item) => {
    // 获取生成提示弹窗的数据内容
    const res = [];
    for (const key in item) {
      for (const info of originColumns) {
        if (info.dataIndex === key) {
          res.push(
            {
              label: info.title,
              value: item[key]
            }
          );
        }
      }

    }
    return res;
  };

  const postHardWare = (moduleInfo, demandId) => {
    if (Object.keys(moduleInfo).length <= 0 || moduleInfo.id === undefined) {
      Notification.error({ title: "error", content: t["hardware.production.info.select.model.error"] });
      return;
    }
    if (demandId == undefined || demandId <= 0) {
      Notification.error({ title: "error", content: t["hardware.production.info.select.model.demand.error"] });
      return;
    }
    postProduction({
      demandId: demandId,
      id: moduleInfo?.sid,
      productionId: moduleInfo.id
    }).then(res => {
      if (res.data.success) {
        Message.success(t["submit.hardware.success"]);
        setModuleInfo({
          sid: res.data.result
        });
        setVisible(false);
        history.push(`/product/demand/service/preselection`);
      }
    }).catch(error => {
      Message.error(t["submit.hardware.error"]);
    });
  };

  // const tableRef = useRef(null)

  const [tableNode, setTableNode] = useState(null);

  useEffect(() => {
    if (tableNode) {
      const node = tableNode.getElementsByClassName("arco-table-tr arco-table-row-checked");
      if (node && node.length > 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        node[0].scrollIntoView();
      }
    }
    return null;
  }, [tableNode]);

  return (
    <div>
      <DynamicOuterCard title={t["hardware.production.info.title"]} bodyStyle={bodyStyle}>
        <div className={style["product"]}>
          <Radio.Group key={selectItem} direction="vertical" value={selectItem}>
            {product.map((item, index) => {
              return (
                <Radio key={index} value={index} onClick={() => {
                  setSelectItem(index);
                  setKeyList({ "type": item.type });
                }}>
                  {({ checked }) => {
                    return (
                      <Space
                        align="center"
                        className={cs(style["custom-radio-card"], {
                          [style["custom-radio-card-checked"]]: checked
                        })}
                      >
                        <div className={style["custom-radio-card-mask"]}>
                          <div className={style["custom-radio-card-mask-dot"]} />
                        </div>
                        <div>
                          <div className={style["custom-radio-card-title"]}>{item.name}</div>
                          <Typography.Text type="secondary">{item.description}</Typography.Text>
                        </div>
                      </Space>
                    );
                  }}
                </Radio>
              );
            })}
          </Radio.Group>
          <div className={style["select"]}>
            {
              selectItem !== -1 && [socSelect, moduleSelect][selectItem].map((item, index) => {
                return <div className={style["select-item"]} key={index}>
                  <div className={style["select-item-title"]}>
                    {item.name}
                  </div>
                  <DynamicRadioGroup direction="vertical" key={index} options={getSelectItem(item)}
                                     onChange={(select_value) => setSelectKey(item.type, select_value)} />
                </div>;
              })
            }
          </div>
        </div>
        <div className={style["product-operate"]}><Button size={"large"} icon={<IconDelete />}
                                                          onClick={onEmpty}>{t["hardware.production.info.operate"]}</Button>
        </div>
      </DynamicOuterCard>

      <DynamicOuterCard>
        <DynamicSkeleton text={{ rows: 10, width: "90rem" }}>
          <div className={style["product-top"]}>
            {
              productList &&
              <div className={style["product-total"]}>
                <p>{t["hardware.production.info.total"] + productList.length}</p>
              </div>
            }
            {
              moduleInfo.mpn &&
              <div className={style["product-info"]}>
                <p>{t["hardware.production.info.select.model"] + moduleInfo.mpn}</p>
              </div>
            }
          </div>

          <Table
            scroll={{ x: true, y: 450 }}
            border
            ref={value => {
              if (value) {
                const { getRootDomElement } = value;
                setTableNode(getRootDomElement());
              }
            }}
            borderCell
            rowKey="id"
            components={components}
            size={"mini"}
            columns={columns}
            data={productList}
            pagination={false}
            rowSelection={{
              type: "radio",
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setModuleInfo(selectedRows[0]);
                setSelectedRowKeys(selectedRowKeys);
              }
            }}
          />
        </DynamicSkeleton>
      </DynamicOuterCard>
      <div className={style["product-nuxt"]}>

        <Button type="primary"
                size={"large"}
                icon={<IconArrowRight />}
                onClick={() => nextStep()}
        >
          {t["hardware.production.info.next"]}
        </Button>
        <Modal
          title={t["hardware.modal.title"]}
          visible={visible}
          style={{ minWidth: "50rem" }}
          onOk={() => postHardWare(moduleInfo, demandId)}
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
        >
          <p>{t["hardware.production.info.select.model"]} <b>{moduleInfo.mpn}</b></p>
          <Descriptions
            column={2}
            border
            size={"small"}
            title={t["hardware.modal.info"]}
            valueStyle={{ textAlign: "right", padding: 6 }}
            data={getDescriptions(moduleInfo)} />
        </Modal>
      </div>
    </div>
  );
}
