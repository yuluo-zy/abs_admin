import { Skeleton } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";

function DynamicSkeleton(props) {
  const [lazy, setLazy] = useState(true);

  useEffect(() => {
    const creatInt = setTimeout(() => {
      setLazy(false);
    }, 300);
    return () => {
      clearInterval(creatInt);
    };
  }, []);

  return <Skeleton {...props} loading={lazy} />;
}
export default DynamicSkeleton;
