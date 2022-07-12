import React, { useContext, useEffect, useState } from "react";
import { Card, List, PaginationProps } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import { Read } from "@/components/Dynamic/Makedown/read";
import { GlobalContext } from "@/context";
import UserInfo from "@/pages/product/summarize/user-info";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { getDemandComment } from "@/api/comment";

export default function CommentList() {

  const { theme } = useContext(GlobalContext);
  const [dataSource, setDataSource] = useState();
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
    onChange: onChangeTable,
  });
  useEffect(() => {
    fetchData();
  }, [
    pagination.current,
    pagination.pageSize
  ]);

  function onChangeTable(page, pageSize) {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    });
  }

  const [loading, setLoading] = useState(true);

  const getTheme = (theme) => {
    return theme === "dark";
  };
  const [demandId] = ProductStore(state =>
    [state.demandId], shallow);

  const fetchData = () => {
    const { current, pageSize } = pagination;
    setLoading(true);
    getDemandComment({
      pageNo: current,
      pageSize: pageSize,
      demandId: demandId
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
        setLoading(false);
      }
    );
  };

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
            style={{margin: 10}}
            hoverable>
            <UserInfo user={item} />
            <Read key={index} theme={getTheme(theme)} html={item.remarks} />
          </Card>
        )}
      />
    </DynamicSkeleton>
  );
}
