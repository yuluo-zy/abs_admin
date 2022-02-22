import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import { Card, Skeleton, Switch, Tag } from '@arco-design/web-react';
import { IconCheckCircleFill } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import { ServiceCardProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';


function CardBlock(props: ServiceCardProps) {
  const { data, onChange } = props;
  const [visible, setVisible] = useState(false);
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
      }, 1000)
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
          {t['cardList.tag.activated']}
        </Tag>
      );
    }
  };


  return (
    <Card
      bordered={true}
      className={className}
      size='small'
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
              className={cs(styles.title, {
                [styles['title-more']]: visible
              })}
            >
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
