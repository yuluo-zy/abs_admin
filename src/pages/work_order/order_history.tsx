import React, { useEffect, useImperativeHandle, useState } from "react";
import { Card, List, PaginationProps, Space, Tag } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { getOrderCommonHistory } from "@/api/cqapms";
import RiceText from "@/rice_text";
import { getSalesInfo } from "@/api/file";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import styles from "./style/history.module.less";

export default function WorkOrderHistory({ order, onRef, isLogin }: { order: string, onRef: any, isLogin?: boolean }) {

  const [dataSource, setDataSource] = useState();
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
    onChange: onChangeTable
  });
  const t = useLocale(locale);


  function onChangeTable(page, pageSize) {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    });
  }

  const [loading, setLoading] = useState(false);
  // const orderId, setOrderId] = useState(order);

  const fetchData = () => {
    const { current, pageSize } = pagination;
    setLoading(true);
    getOrderCommonHistory({
      pageNo: current,
      pageSize: pageSize,
      id: order
    }).then(res => {
        if (res.data.success) {
          setDataSource(res.data.result.data);
          if (res.data.result.totalCount) {
            setPagination({
              ...pagination,
              current: res.data.result.pageNo,
              pageSize: res.data.result.pageSize,
              total: res.data.result.totalCount
            });
          }
        }
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (order) {
      fetchData();
    }
  }, [
    pagination.current,
    pagination.pageSize
  ]);
  const getSalesImgById = (data) => {
    return getSalesInfo({
      id: data,
      orderId: order
    });
  };
  const getSalesInfoById = (data) => {
    return getSalesInfo({
      ...data,
      orderId: order
    });
  };

  useImperativeHandle(onRef, () => ({
    update: () => {
      fetchData();
    }
  }));

  return (
    <DynamicSkeleton text={{ rows: 11, width: "90rem" }}>
      <List
        bordered={false}
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        render={(item, index) => (
          <Card
            bordered
            key={index}
            className={item?.isisCustomer ? styles["custom"] : styles["common"]}
            hoverable>
            <Space size={"large"}>
              {item?.creator && <Tag color="arcoblue">{item?.creator}</Tag>}
              {!item?.internal && isLogin && <Tag color="red">{t["work.order.operate.common.custom"]}</Tag>}
              {item?.sendEmail && <Tag color="green">{t["work.order.operate.common.custom.email"]}</Tag>}
              <Tag>
                {item?.created}
              </Tag>
            </Space>
            <RiceText key={item.id} readOnly={true}
                      fileDownload={getSalesInfoById}
                      imgDownload={getSalesImgById}
                      initValue={item?.commentText} />
            {/*</div>*/}
          </Card>
        )}
      />
    </DynamicSkeleton>
  );
}
