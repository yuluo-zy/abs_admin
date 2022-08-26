import { Skeleton } from "@arco-design/web-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

function DynamicSkeleton(props) {
  const [lazy, setLazy] = useState(true);
  const skeleton = useRef<boolean>(true);
  const { animation, text, style } = props;

  useEffect(() => {
    if (skeleton) {
      const creatInt = setTimeout(() => {
        setLazy(false);
      }, 300);
      skeleton.current = false;
      return () => {
        clearInterval(creatInt);
      };
    }
  }, []);

  return useMemo(() => {
    return <Skeleton animation={animation} text={text} style={style} loading={skeleton.current}>
      {props.children}
    </Skeleton>;
  }, [lazy]);
}

//
// function areEqual(prevProps, nextProps) {
//   console.log(prevProps);
//   console.log(nextProps);
//   return true;
// }
//
// export default React.memo(DynamicSkeleton, areEqual);
export default DynamicSkeleton;
