import React, { useEffect, useState } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import DynamicCard from '@/components/Dynamic/Card';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { getProductionInfo } from '@/api/production';
import { Table } from '@arco-design/web-react';
import DynamicSkeleton from '@/components/Dynamic/Skeleton';

const columns = [

  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left' as const,
    width: 120
  },
  {
    title: 'MPN',
    dataIndex: 'mpn',
    width: 140
  },
  {
    title: 'Marketing Status',
    dataIndex: 'status',
    width: 140
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 70
  }
  ,
  {
    title: 'Wi-Fi',
    dataIndex: 'wifi',
    width: 200
  },
  {
    title: 'Bluetooth',
    dataIndex: 'bluetooth',
    width: 200
  },
  {
    title: 'Temp (°C)',
    dataIndex: 'operatingTemp',
    width: 100
  },
  {
    title: 'Gpio',
    dataIndex: 'gpio',
    width: 50
  },
  {
    title: 'Flash (MB)',
    dataIndex: 'flash',
    width: 60
  },
  {
    title: 'SRAM (KB)',
    dataIndex: 'sram',
    width: 60
  },
  {
    title: 'PSRAM (MB)',
    dataIndex: 'psram',
    width: 60
  },
  {
    title: 'ROM (KB)',
    dataIndex: 'rom',
    width: 60
  },
  {
    title: 'Freq. (MHz)',
    dataIndex: 'freq',
    width: 60
  },
  {
    title: 'Size (mm)',
    dataIndex: 'dimensions',
    width: 120
  },
  {
    title: 'MPQ/SPQ',
    dataIndex: 'spq',
    width: 70
  },
  {
    title: 'MOQ',
    dataIndex: 'moq',
    width: 70
  }
];

export default function HardwareSelection() {

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchProductionList();
  }, []);

  function fetchProductionList() {
    getProductionInfo()
      .then((res) => {
        setProductList(res.data.result);
      });
  }

  const t = useLocale();
  return <DynamicCard>
    <DynamicOuterCard title={t['hardware.production.info.title']}>
      <div><p>kjhkjhkjh</p></div>
    </DynamicOuterCard>
    <DynamicOuterCard>
      <DynamicSkeleton text={{ rows: 10, width: '60rem' }}>
        <div>
          <Table
            scroll={{ x: true, y: 600 }}
            border
            size={'mini'}
            columns={columns}
            data={productList}
            pagination={false}
            rowSelection={{
              pureKeys: true
            }}
          />
        </div>
      </DynamicSkeleton>
    </DynamicOuterCard>
  </DynamicCard>;
}
