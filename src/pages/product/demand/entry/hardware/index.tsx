import React, { useContext, useEffect, useState } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { getProductionInfo } from '@/api/production';
import { Button, Descriptions, Modal, Notification, Radio, Space, Table, Typography } from '@arco-design/web-react';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import ResizableTitle from '@/components/Dynamic/Resizeable';
import style from './style/index.module.less';
import { ProductSelectItem } from '@/components/type';
import cs from 'classnames';
import { IconArrowRight, IconDelete } from '@arco-design/web-react/icon';
import useFilter, { multiFilter } from '@/utils/useHook/useFilter';
import { ProductDemandContext } from '@/store/context-manager';

const bodyCellStyle = {};
const originColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left' as const,
    width: 170,
    headerCellStyle: {
      position: 'sticky' as const,
      top: 0,
      left: 40
    }
  },
  {
    title: 'MPN',
    dataIndex: 'mpn',
    width: 200,
    bodyCellStyle: bodyCellStyle
  },
  {
    title: 'Marketing Status',
    dataIndex: 'status',
    bodyCellStyle: bodyCellStyle,
    width: 150
  },
  {
    title: 'Type',
    dataIndex: 'type',
    bodyCellStyle: bodyCellStyle,
    width: 80
  },
  {
    title: 'Wi-Fi',
    dataIndex: 'wifi',
    bodyCellStyle: bodyCellStyle,
    width: 200
  },
  {
    title: 'Bluetooth',
    dataIndex: 'bluetooth',
    bodyCellStyle: bodyCellStyle,
    width: 200
  },
  {
    title: 'Temp (°C)',
    dataIndex: 'operatingTemp',
    bodyCellStyle: bodyCellStyle,
    width: 100
  },
  {
    title: 'Gpio',
    dataIndex: 'gpio',
    bodyCellStyle: bodyCellStyle,
    width: 50
  },
  {
    title: 'Flash (MB)',
    dataIndex: 'flash',
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: 'SRAM (KB)',
    dataIndex: 'sram',
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: 'PSRAM (MB)',
    dataIndex: 'psram',
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: 'ROM (KB)',
    dataIndex: 'rom',
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: 'Freq. (MHz)',
    dataIndex: 'freq',
    bodyCellStyle: bodyCellStyle,
    width: 60
  },
  {
    title: 'Size (mm)',
    dataIndex: 'dimensions',
    bodyCellStyle: bodyCellStyle,
    width: 120
  },
  {
    title: 'MPQ/SPQ',
    dataIndex: 'spq',
    bodyCellStyle: bodyCellStyle,
    width: 100
  },
  {
    title: 'MOQ',
    dataIndex: 'moq',
    bodyCellStyle: bodyCellStyle,
    width: 70
  }
];


export default function HardwareSelection() {
  const t = useLocale();
  const socSelect: ProductSelectItem[] = [
    {
      name: t['hardware.production.info.soc'],
      type: '',
      select: ['Single Core', 'Dual Core']
    },
    {
      name: t['hardware.production.info.soc.antenna'],
      type: '',
      select: ['N/A', 'PCB', 'IPEX']
    },
    {
      name: t['hardware.production.info.soc.package'],
      type: 'dimensions',
      select: ['QFN56(7*7)', 'QFN48(5*5)', 'QFN48(6*6)',
        'LGA48(7*7)', 'QFN32(5*5)', 'QFN28(4*4)']
    },
    {
      name: t['hardware.production.info.soc.model'],
      type: 'name',
      select: ['ESP8685', 'ESP32-S3', 'ESP32-C3', 'ESP32-S2', 'ESP32', 'ESP8266']
    },
    {
      name: t['hardware.production.info.soc.temperature'],
      type: 'operatingTemp',
      select: ['-40 ~ 85', '-40 ~ 105', '-40 ~ 125']
    },
    {
      name: t['hardware.production.info.soc.flash'],
      type: 'flash',
      select: ['1', '2', '4', '8', '16']
    },
    {
      name: t['hardware.production.info.soc.psram'],
      type: 'psram',
      select: ['0', '2', '8']
    }
  ];
  const moduleSelect: ProductSelectItem[] = [
    {
      name: t['hardware.production.info.module.model'],
      type: 'name',
      select: ['ESP8685', 'ESP32-S3', 'ESP32-C3', 'ESP32-S2', 'ESP32', 'ESP8266']
    },
    {
      name: t['hardware.production.info.module.temperature'],
      type: 'operatingTemp',
      select: ['-40 ~ 85', '-40 ~ 105', '-40 ~ 125']
    },
    {
      name: t['hardware.production.info.module.flash'],
      type: 'flash',
      select: ['1', '2', '4', '8', '16']
    },
    {
      name: t['hardware.production.info.module.psram'],
      type: 'psram',
      select: ['0', '2', '8']
    }
  ];
  const product = [
    {
      name: t['hardware.production.info.chip'],
      type: 'SoC',
      description: t['hardware.production.info.chip.description']
    },
    {
      name: t['hardware.production.info.modules'],
      type: 'Module',
      description: t['hardware.production.info.modules.description']
    }
  ];

  const [productList, setProductList, oldState, setOldState, reduction] = useFilter();
  const [visible, setVisible] = useState(false);
  const [keyList, setKeyList] = useState({});
  const [selectItem, setSelectItem] = useState(-1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { state, dispatch } = useContext(ProductDemandContext);

  const dispatchSelect = (oldState, setState, keyList) => {
    if (keyList) {
      setState(multiFilter(oldState, keyList));
    }
  };

  useEffect(() => {
    if (keyList && Object.keys(keyList).length > 0) {
      dispatchSelect(oldState, setProductList, keyList);
    }
  }, [keyList]);

  useEffect(() => {
    fetchProductionList();
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
    if (Object.keys(state.moduleInfo).length === 0) {
      Notification.error({ title: 'error', content: t['hardware.production.info.select.model.error'] });
      return;
    }
    setVisible(true);
  };
  //
  // const getModelInfo = (item) => {
  //
  // };

  const setSelectKey = (key, item) => {
    const keyOld = {
      ...keyList
    };
    keyOld[key] = item;
    setKeyList(keyOld);
  };


  const onEmpty = () => {
    reduction();
    setSelectItem(-1);
    setKeyList({});
    setSelectedRowKeys([]);
    dispatch({
      type: 'ModuleInfo',
      payload: {}
    });
  };


  return (
    <div>
      <DynamicOuterCard title={t['hardware.production.info.title']}>
        <div className={style['product']}>
          <Radio.Group direction='vertical' value={selectItem}>
            {[socSelect, moduleSelect].map((item, index) => {
              return (
                <Radio key={index} value={index} onClick={() => {
                  setSelectItem(index);
                  setKeyList({ 'type': product[index].type });
                }}>
                  {({ checked }) => {
                    return (
                      <Space
                        align='center'
                        className={cs(style['custom-radio-card'], {
                          [style['custom-radio-card-checked']]: checked
                        })}
                      >
                        <div className={style['custom-radio-card-mask']}>
                          <div className={style['custom-radio-card-mask-dot']} />
                        </div>
                        <div>
                          <div className={style['custom-radio-card-title']}>{product[index].name}</div>
                          <Typography.Text type='secondary'>{product[index].description}</Typography.Text>
                        </div>
                      </Space>
                    );
                  }}
                </Radio>
              );
            })}
          </Radio.Group>
          <div className={style['select']}>
            {
              selectItem !== -1 && [socSelect, moduleSelect][selectItem].map((item, index) => {
                return <div className={style['select-item']} key={index}>
                  <div className={style['select-item-title']}>
                    {item.name}
                  </div>
                  <Radio.Group direction='vertical' key={index}>
                    {item.select.map((select_item, index) => {
                      return <Radio value={select_item} key={index}
                                    onClick={() => setSelectKey(item.type, select_item)}>{select_item}</Radio>;
                    })}
                  </Radio.Group>
                </div>
                  ;
              })
            }
          </div>
        </div>
        <div className={style['product-operate']}><Button size={'large'} icon={<IconDelete />}
                                                          onClick={onEmpty}>{t['hardware.production.info.operate']}</Button>
        </div>
      </DynamicOuterCard>
      <DynamicOuterCard>
        <DynamicSkeleton text={{ rows: 10, width: '90rem' }}>
          <Table
            className={style['table-resizable-column']}
            scroll={{ x: true, y: 450 }}
            border
            borderCell
            rowKey='id'
            components={components}
            size={'mini'}
            columns={columns}
            data={productList}
            pagination={false}
            rowSelection={{
              type: 'radio',
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                dispatch({
                  type: 'ModuleInfo',
                  payload: selectedRows[0]
                });
                setSelectedRowKeys(selectedRowKeys);
              }
            }}
          />
        </DynamicSkeleton>
      </DynamicOuterCard>
      <div className={style['product-nuxt']}>
        {
          productList &&
          <div className={style['product-total']}>
            <p>{t['hardware.production.info.total'] + productList.length}</p>
          </div>
        }
        {
          state.moduleInfo.mpn &&
          <div className={style['product-info']}>
            <p>{t['hardware.production.info.select.model'] + state.moduleInfo.mpn}</p>
          </div>
        }
        <Button type='primary'
                size={'large'}
                icon={<IconArrowRight />}
                onClick={() => nextStep()}
        >
          {t['hardware.production.info.next']}
        </Button>
        <Modal
          title={t['hardware.modal.title']}
          visible={visible}
          // onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
        >
          <p>{t['hardware.production.info.select.model']} <b>{state.moduleInfo.mpn}</b></p>
          <Descriptions
            column={1}
            title={t['hardware.modal.info']}
            labelStyle={{ textAlign: 'right', paddingRight: 36 }}
            data={state.moduleInfo} />
        </Modal>
      </div>
    </div>
  );
}
