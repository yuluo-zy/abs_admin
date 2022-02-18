import React from 'react';
import { Card } from '@arco-design/web-react';
import { DynamicCardProps } from '@/components/type';

function DynamicOuterCard(props: DynamicCardProps) {

  const { title, children } = props;
  const headerStyle = {
    border: 'none', height: 'auto', paddingTop: '20px', padding: '1rem',
    paddingBottom: 0
  };
  const bodyStyle = {
    paddingLeft: '2rem',
    paddingRight: '2rem'

  };
  const style = {
    marginBottom: '1rem',
    boxShadow: '0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)'
  };

  return (<Card
    title={title}
    style={style}
    headerStyle={headerStyle}
    bodyStyle={bodyStyle}
  >{children}</Card>);
}

export default DynamicOuterCard;
