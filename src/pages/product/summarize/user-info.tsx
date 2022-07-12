import React, { useEffect, useState } from "react";
import styles from "./style/index.module.less";

export default function UserInfo(props) {
  const { userId } = props;

  const [info, setInfo] = useState({ name: "", avatar: "" });

  useEffect(() => {
    // getSimpleInfo(userId).then(
    //   res => {
    //     if (res.data.success) {
    //       setInfo(res.data.result);
    //     }
    //   }
    // );
  }, []);

  return <div className={styles['user-info']}>
    <div>头像</div>
    <div>{info?.name}</div>
  </div>;
}
