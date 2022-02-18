import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Modal, PaginationProps, Space, Table } from '@arco-design/web-react';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import { AxiosResponse } from 'axios';
import useLocale from '@/utils/useLocale';
import SearchForm from './search-form';
import locale from './locale';
import styles from './style/index.module.less';
import { Data } from '@/utils/httpRequest';
import { SearchItem } from "@/components/type";


export interface ListProps {
  name: string,
  fetchRemoteData: (props) => Promise<AxiosResponse<Data>>,
  add?: (props) => React.ReactNode,
  addName?: string,
  download: boolean,
  upload: boolean,
  getColumns: (callback: () => void) => any
  addCancel?: () => void
  select?: boolean
  selectItem?: Array<SearchItem>
}

export default function SearchList(props: ListProps) {
  const t = useLocale(locale);
  const [called, setCalled] = useState(true);
  const tableCallback = async () => {
    setCalled(!called);
  };
  const { name, fetchRemoteData, add, download, upload, getColumns, addName, addCancel, select, selectItem } = props;

  const [data, setData] = useState([]);
  const columns = useMemo(() => getColumns(tableCallback), [called]);

  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true
  });

  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, called, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    fetchRemoteData({
        pageNo: current,
        pageSize,
        ...formParams
      }
    )
      .then((res) => {
        setData(res.data.result.data);
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.data.result.totalCount
        });
        setLoading(false);
      });
  }


  function onChangeTable(pagination) {
    setPatination(pagination);
  }

  function handleSearch(params) {
    setFormParams(params);
  }

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  return (
    <div>
      <Card
        title={name}
        headerStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
      >
        {select && (<><SearchForm onSearch={handleSearch} searchItem={selectItem} /></>)}
        <div className={styles['button-group']}>
          <Space>
            {add && (<>
                <Button type='primary' icon={<IconPlus />} onClick={() => setVisible(true)}>
                  {t['searchTable.operations.add']}
                </Button>
                <Modal
                  title={addName}
                  visible={visible}
                  footer={null}
                  confirmLoading={confirmLoading}
                  onCancel={() => {
                    setVisible(false);
                    setConfirmLoading(false);
                    addCancel();
                  }}
                >
                  {add({
                    confirmCallback: () => {
                      setVisible(false);
                      setConfirmLoading(false);
                    }
                  })}
                </Modal>
              </>
            )}
            {upload === true && (<>  <Button>{t['searchTable.operations.upload']}</Button> </>)}
          </Space>
          <Space>
            {
              download === true && (<>
                <Button icon={<IconDownload />}>
                  {t['searchTable.operation.download']}
                </Button>
              </>)}
          </Space>
        </div>
        <Table
          rowKey='id'
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}
