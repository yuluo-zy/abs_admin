import React from 'react';import { Result } from '@arco-design/web-react';import MessageItem, { DataItem } from './item';import styles from './style/index.module.less';interface MessageListProps {  data: DataItem[];}function MessageList(props: MessageListProps) {  const { data = [] } = props;  return (    <div className={styles['message-list']}>      {data.map((item) => (        <MessageItem key={item.id} data={item} />      ))}      {!data.length && <Result status="404" />}    </div>  );}export default MessageList;