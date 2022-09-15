import React, { useEffect, useState } from "react";
import { Card, List, PaginationProps } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import RiceText from "@/rice_text";
import { getOrderCommonHistory } from "@/api/cqapms";


export default function WorkOrderHistory({ order }: { order: string }) {

  const [dataSource, setDataSource] = useState();
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
    onChange: onChangeTable
  });

  function onChangeTable(page, pageSize) {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    });
  }

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(order);

  const fetchData = () => {
    const { current, pageSize } = pagination;
    setLoading(true);
    getOrderCommonHistory({
      pageNo: current,
      pageSize: pageSize,
      id: orderId
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
    if (orderId) {
      fetchData();
    }
  }, [
    pagination.current,
    pagination.pageSize
  ]);

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
            style={{ margin: 10 }}
            hoverable>
            {/*<UserInfo user={item} />*/}
            <RiceText key={item.id} readOnly={true} initValue={item?.remarks} />
          </Card>
        )}
      />
    </DynamicSkeleton>
  );
}
