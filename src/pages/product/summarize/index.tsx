import * as React from "react";
import { useState } from "react";
import useLocale from "./locale/useLocale";
import styles from "./style/index.module.less";
import Sheet from "@/pages/product/summarize/sheet";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Button, Notification } from "@arco-design/web-react";
import CommentList from "@/pages/product/summarize/comment-list";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { postDemandComment } from "@/api/comment";
import RiceText from "@/rice_text";

const bodyStyle = {
  padding: 0,
  transition: " 0.5s all ease-in-out"
};
export default function Summarize() {
  const t = useLocale();
  const [riceText, setRiceText] = useState<Record<string, any>>();

  const [demandId] = ProductStore(state =>
    [state.demandId], shallow);

  function handleOnClick() {
    const data = JSON.stringify(riceText.toJSON());
    if (demandId && demandId > 0) {
      postDemandComment({
        demandId: demandId,
        remarks: data
      }).then(r => {
        if (r.data.success) {
          Notification.success({
            title: "Success",
            content: t["summarize.history.comment.success"]
          });
        }
      });
    }
  }

  return <div className={styles["context"]}>
    <div className={styles["context-main"]}>
      <Sheet />
    </div>

    <DynamicOuterCard title={t["summarize.history.comment"]} bodyStyle={bodyStyle}>
      <div className={styles["context-card"]}>
        <Button className={styles["context-card-button"]} type={"primary"}
                onClick={handleOnClick}>{t["summarize.history.comment.add"]}</Button>
        <RiceText onChange={setRiceText} readOnly={false} />
      </div>
    </DynamicOuterCard>

    <DynamicOuterCard title={t["summarize.history.title"]} bodyStyle={{
      margin: "1rem",
      transition: " 0.5s all ease-in-out"
    }}>
      <CommentList />
    </DynamicOuterCard>

  </div>;
}
