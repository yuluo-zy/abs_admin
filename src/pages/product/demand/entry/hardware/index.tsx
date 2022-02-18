import React, { useEffect, useState } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import DynamicCard from '@/components/Dynamic/Card';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { getProductionInfo } from '@/api/production';
import { Table } from '@arco-design/web-react';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';
import ResizableTitle from '@/components/Dynamic/Resizeable';
import style from './style/index.module.less';

const bodyCellStyle = {};
const originColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    bodyCellStyle: bodyCellStyle,
    fixed: 'left' as const,
    width: 120,
  },
  {
    title: 'MPN',
    dataIndex: 'mpn',
    width: 140,
    bodyCellStyle: bodyCellStyle,
  },
  {
    title: 'Marketing Status',
    dataIndex: 'status',
    bodyCellStyle: bodyCellStyle,
    width: 140,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    bodyCellStyle: bodyCellStyle,
    width: 70,
  },
  {
    title: 'Wi-Fi',
    dataIndex: 'wifi',
    bodyCellStyle: bodyCellStyle,
    width: 200,
  },
  {
    title: 'Bluetooth',
    dataIndex: 'bluetooth',
    bodyCellStyle: bodyCellStyle,
    width: 200,
  },
  {
    title: 'Temp (°C)',
    dataIndex: 'operatingTemp',
    bodyCellStyle: bodyCellStyle,
    width: 100,
  },
  {
    title: 'Gpio',
    dataIndex: 'gpio',
    bodyCellStyle: bodyCellStyle,
    width: 50,
  },
  {
    title: 'Flash (MB)',
    dataIndex: 'flash',
    bodyCellStyle: bodyCellStyle,
    width: 60,
  },
  {
    title: 'SRAM (KB)',
    dataIndex: 'sram',
    bodyCellStyle: bodyCellStyle,
    width: 60,
  },
  {
    title: 'PSRAM (MB)',
    dataIndex: 'psram',
    bodyCellStyle: bodyCellStyle,
    width: 60,
  },
  {
    title: 'ROM (KB)',
    dataIndex: 'rom',
    bodyCellStyle: bodyCellStyle,
    width: 60,
  },
  {
    title: 'Freq. (MHz)',
    dataIndex: 'freq',
    bodyCellStyle: bodyCellStyle,
    width: 60,
  },
  {
    title: 'Size (mm)',
    dataIndex: 'dimensions',
    bodyCellStyle: bodyCellStyle,
    width: 120,
  },
  {
    title: 'MPQ/SPQ',
    dataIndex: 'spq',
    bodyCellStyle: bodyCellStyle,
    width: 70,
  },
  {
    title: 'MOQ',
    dataIndex: 'moq',
    bodyCellStyle: bodyCellStyle,
  },
];

export default function HardwareSelection() {
  const [productList, setProductList] = useState([]);
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
            onResize: handleResize(index),
          }),
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
          width: size.width,
        };
        return nextColumns;
      });
    };
  }

  const components = {
    header: {
      th: ResizableTitle,
    },
  };

  function fetchProductionList() {
    getProductionInfo().then((res) => {
      setProductList(res.data.result);
    });
  }

  const t = useLocale();

  return (
    <DynamicCard>
      <DynamicOuterCard title={t['hardware.production.info.title']}>
        <div>
          <p>kjhkjhkjh</p>
        </div>
      </DynamicOuterCard>
      <DynamicOuterCard>
        <DynamicSkeleton text={{ rows: 10, width: '90rem' }}>
          <div>
            <Table
              className={style['table-demo-resizable-column']}
              scroll={{ x: true, y: 600 }}
              border
              borderCell
              components={components}
              size={'mini'}
              columns={columns}
              data={productList}
              pagination={false}
              rowSelection={{
                pureKeys: true,
              }}
            />
          </div>
        </DynamicSkeleton>
      </DynamicOuterCard>
    </DynamicCard>
  );
}
