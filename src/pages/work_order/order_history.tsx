import React, { useEffect, useImperativeHandle, useState } from "react";
import { Card, List, PaginationProps, Space, Tag, Tooltip } from "@arco-design/web-react";
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

  const options = [
    {
      label: t["workplace.add.custom.product.stage.a"],
      key: 1
    },
    {
      label: t["workplace.add.custom.product.stage.b"],
      key: 2
    },
    {
      label: t["workplace.add.custom.product.stage.c"],
      key: 3
    },
    {
      label: t["workplace.add.custom.product.stage.d"],
      key: 4
    }
  ];

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
            className={item?.isCustomer ? styles["custom"] : styles["common"]}
            hoverable>
            <div className={item?.isCustomer ? styles["custom-space"] : null}>
              <Space size={"large"}>
                {item?.isCustomer && isLogin &&
                  <Tooltip color={"#165DFF"} content={item?.username && <div style={{ width: 200 }}>
                    <Space direction={"vertical"}>
                      <div>{item?.username}</div>
                      <div>{item?.userPhone}</div>
                      <div>{item?.userEmail}</div>
                    </Space>
                  </div>}>
                    <Tag color="green">{t["work.order.operate.common.custom.add"]}</Tag>
                  </Tooltip>}
                {item?.creator && <Tag color="arcoblue">{item?.creator}</Tag>}
                {!item?.internal && isLogin && <Tag color="red">{t["work.order.operate.common.custom"]}</Tag>}
                {item?.sendEmail && isLogin && <Tag color="green">{t["work.order.operate.common.custom.email"]}</Tag>}
                {item?.stage && <Tag color={"cyan"}>{options[item?.stage]}</Tag>}
                <Tag>
                  {item?.created}
                </Tag>
              </Space>
            </div>

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
