import React, { useEffect, useState } from "react";
import { Card, Link, Skeleton, Tag, Typography } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import styles from "./style/announcement.module.less";
import DynamicModal from "@/components/Dynamic/Modal";

function Announcement() {
  const [data, setData] = useState([
    {
      type: "activity",
      content: "欢迎使用"
    },
    {
      type: "info",
      content: "首次使用注意事项"
    }

  ]);
  const [loading, setLoading] = useState(true);

  const t = useLocale(locale);

  const fetchData = () => {
    setLoading(true);
    // axios
    //   .get('/api/workplace/announcement')
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getTagColor(type) {
    switch (type) {
      case "activity":
        return "orangered";
      case "info":
        return "cyan";
      case "notice":
        return "arcoblue";
      default:
        return "arcoblue";
    }
  }

  const [visible, setVisible] = useState(false);

  return (<>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography.Title heading={6}>
            {t["workplace.announcement"]}
          </Typography.Title>
          <Link>{t["workplace.seeMore"]}</Link>
        </div>
        <Skeleton loading={loading} text={{ rows: 5, width: "100%" }} animation>
          <div className={styles.content}>
            {data.map((d, index) => (
              <div key={index} className={styles.item} onClick={() => {
                setVisible(value => !value);
              }}>
                <Tag color={getTagColor(d.type)} size="small">
                  {d.type}
                </Tag>
                <span className={styles.link}>{d.content}</span>
              </div>
            ))}
          </div>
        </Skeleton>

      </Card>
      <DynamicModal title={t["workplace.announcement"]} visible={visible} onCancel={() => {
        setVisible(value => !value);
      }}>
        <p>欢迎使用产品质量工单管理系统, 通过本系统可以提供工单查询 工单提交等自助操作</p>
        <p>系统当前处于内测阶段, 欢迎提交相关建议见解</p>
        <p>由衷感谢选择乐鑫相关产品</p>
      </DynamicModal>
    </>

  );
}

export default Announcement;
