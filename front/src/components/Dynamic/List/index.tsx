import React, { useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Button, PaginationProps, Space, Table } from "@arco-design/web-react";
import { IconDownload, IconPlus } from "@arco-design/web-react/icon";
import useLocale from "@/utils/useHook/useLocale";
import SearchForm from "./search-form";
import locale from "./locale";
import styles from "./style/index.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import { ListProps } from "@/components/type";
import DynamicModal from "@/components/Dynamic/Modal";
import { isArray } from "@/utils/is";

const SearchList = React.forwardRef((props: ListProps, ref) => {
  const t = useLocale(locale);
  const [called, setCalled] = useState(true);


  const tableCallback = async () => {
    setCalled(!called);
  };
  const {
    name,
    size,
    fetchRemoteData,
    add,
    download,
    upload,
    getColumns,
    addName,
    select,
    selectItem,
    rowSelection,
    tools,
    tableClassName,
    current,
    setCurrent
  } = props;

  const [data, setData] = useState([]);
  const columns = useMemo(() => getColumns(tableCallback), [called]);

  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: current || 1,
    pageSizeChangeResetCurrent: true
  });

  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
    if (setCurrent) {
      setCurrent(pagination.current);
    }
  }, [
    pagination.current,
    pagination.pageSize,
    called,
    props.onChange,
    JSON.stringify(formParams)
  ]);

  // const getFetchData = (value) => {
  //   if()
  // }

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    fetchRemoteData({
      page_no: current,
      page_size: pageSize,
      ...formParams
    }).then((res) => {
      setData(res.data.data?.records);
      if (res.data.data?.total) {
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.data.data?.total
        });
      }

      setLoading(false);
    });
  }

  function onChangeTable(pagination) {
    setPatination(pagination);
  }

  function handleSearch(params) {
    const temp = {};
    for (const i in params) {
      if (isArray(params[i])) {
        temp[i] = params[i].toString();
      } else {
        temp[i] = params[i];
      }
    }
    setFormParams(temp);
  }

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    callBack: () => {
      tableCallback().catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    },
    setCurrentPage: (page) => {
      setPatination(value => {
        return {
          ...value,
          current: page
        };
      });
    },
    getCurrentPage: () => {
      return pagination.current;
    }
  }));

  return (
    <div>
      <DynamicCard title={name}>
        {select && (
          <>
            <SearchForm onSearch={handleSearch} searchItem={selectItem} />
          </>
        )}
        <div className={styles["button-group"]}>
          <Space>
            {add && (
              <>
                <Button
                  type="primary"
                  icon={<IconPlus />}
                  onClick={() => setVisible(true)}
                >
                  {t["searchTable.operations.add"]}
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
                    }
                  })}
                </DynamicModal>
              </>
            )}
            {upload === true && (
              <>
                {" "}
                <Button>{t["searchTable.operations.upload"]}</Button>{" "}
              </>
            )}
            {tools}
          </Space>
          <Space>
            {download === true && (
              <>
                <Button icon={<IconDownload />}>
                  {t["searchTable.operation.download"]}
                </Button>
              </>
            )}
          </Space>
        </div>
        <Table
          rowKey="id"
          scroll={{ x: true }}
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
          size={size}
          className={tableClassName}
          rowSelection={rowSelection}
        />
      </DynamicCard>
    </div>
  );
});

export default SearchList;
