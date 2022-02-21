import React, { useEffect, useMemo, useState } from 'react';
import { Button, PaginationProps, Space, Table } from '@arco-design/web-react';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useHook/useLocale';
import SearchForm from './search-form';
import locale from './locale';
import styles from './style/index.module.less';
import DynamicCard from '@/components/Dynamic/Card';
import { ListProps } from '@/components/type';
import DynamicModal from '@/components/Dynamic/Modal';

export default function SearchList(props: ListProps) {
  const t = useLocale(locale);
  const [called, setCalled] = useState(true);

  const tableCallback = async () => {
    setCalled(!called);
  };
  const {
    name,
    fetchRemoteData,
    add,
    download,
    upload,
    getColumns,
    addName,
    select,
    selectItem,
  } = props;

  const [data, setData] = useState([]);
  const columns = useMemo(() => getColumns(tableCallback), [called]);

  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });

  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  useEffect(() => {
    fetchData();
  }, [props.onChange]);

  useEffect(() => {
    fetchData();
  }, [
    pagination.current,
    pagination.pageSize,
    called,
    JSON.stringify(formParams),
  ]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    fetchRemoteData({
      pageNo: current,
      pageSize,
      ...formParams,
    }).then((res) => {
      setData(res.data.result.data);
      if (res.data.result.totalCount) {
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.data.result.totalCount,
        });
      }

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
      <DynamicCard title={name}>
        {select && (
          <>
            <SearchForm onSearch={handleSearch} searchItem={selectItem} />
          </>
        )}
        <div className={styles['button-group']}>
          <Space>
            {add && (
              <>
                <Button
                  type="primary"
                  icon={<IconPlus />}
                  onClick={() => setVisible(true)}
                >
                  {t['searchTable.operations.add']}
                </Button>

                <DynamicModal
                  title={addName}
                  visible={visible}
                  footer={null}
                  confirmLoading={confirmLoading}
                  onCancel={() => {
                    setVisible(false);
                    setConfirmLoading(false);
                  }}
                >
                  {add({
                    confirmCallback: () => {
                      setVisible(false);
                      setConfirmLoading(false);
                      tableCallback();
                    },
                  })}
                </DynamicModal>
              </>
            )}
            {upload === true && (
              <>
                {' '}
                <Button>{t['searchTable.operations.upload']}</Button>{' '}
              </>
            )}
          </Space>
          <Space>
            {download === true && (
              <>
                <Button icon={<IconDownload />}>
                  {t['searchTable.operation.download']}
                </Button>
              </>
            )}
          </Space>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </DynamicCard>
    </div>
  );
}
