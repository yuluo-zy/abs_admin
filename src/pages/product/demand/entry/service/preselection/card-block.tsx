import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import { Card, Skeleton, Switch, Tag } from '@arco-design/web-react';
import { IconCheckCircleFill, IconStarFill } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import useLocale from '@/pages/product/demand/locale/useLocale';


function CardBlock(props) {
  const { data, onChange } = props;
  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);
  const t = useLocale();
  const className = cs(styles['card-block'], styles[`rules-card`]);

  const changeStatus = async () => {
    setLoading(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        const temp = status !== 1 ? 1 : 0;
        setStatus(temp);
        onChange(temp);
        resolve(null);
      }, 500)
    ).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (data.status !== status) {
      setStatus(data.status);
    }
  }, [data.status]);

  const getButtonGroup = () => {
    return (
      <Switch checked={!!status} onChange={changeStatus} />
    );
  };

  const getStatus = () => {
    if (status) {
      return (
        <Tag
          color='green'
          icon={<IconCheckCircleFill />}
          className={styles.status}
          size='small'
        >
          {t['service.preselection.model.info.title.open']}
        </Tag>
      );
    }
  };


  return (
    <Card
      bordered
      hoverable
      className={className}
      title={
        loading ? (
          <Skeleton
            animation
            text={{ rows: 1, width: ['100%'] }}
            style={{ width: '120px', height: '24px' }}
            className={styles['card-block-skeleton']}
          />
        ) : (
          <>
            <div
              className={styles.title}
            >
              <div className={styles.icon}>
                <IconStarFill />
              </div>
              {data.name}
              {getStatus()}
            </div>
          </>
        )
      }
    >
      <div className={styles.content}>{data.description}</div>
      <div className={styles.extra}>{getButtonGroup()}</div>
    </Card>
  );
}

export default CardBlock;
