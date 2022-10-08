import React from "react";
import styles from "./style/index.module.less";

export default function UserInfo(props) {
  const { user } = props;
  // todo 效果美化
  return <div className={styles["user-info"]}>
    <div>头像</div>
    <div>{user?.creatorName}</div>
    <div>{user?.created}</div>
  </div>;
}
