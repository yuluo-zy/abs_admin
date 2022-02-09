import { Skeleton } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';

function DynamicSkeleton(props) {

  const [lazy, setLazy] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLazy(false);
    }, 700);
  }, []);

  return <Skeleton  {...props} loading={lazy} />;
}

export default DynamicSkeleton;
