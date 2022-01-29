import React from 'react';
import { Card } from '@arco-design/web-react';
import { DynamicCardProps } from '@/components/type';

function DynamicCard(props: DynamicCardProps) {

  const { title, children } = props;
  const headerStyle = {
    border: 'none', height: 'auto', paddingTop: '20px', padding: '1rem',
    paddingBottom: 0
  };
  const bodyStyle = {
    paddingLeft: '2rem',
    paddingRight: '2rem'
  };

  return (<Card
    title={title}
    headerStyle={headerStyle}
    bodyStyle={bodyStyle}
  >{children}</Card>);
}

export default DynamicCard;
