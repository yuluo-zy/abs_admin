import * as React from "react";
import { useContext } from "react";
import { MakeDown } from "@/components/Dynamic/Makedown";
import useLocale from "./locale/useLocale";
import styles from "./style/index.module.less";
import Sheet from "@/pages/product/summarize/sheet";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { GlobalContext } from "@/context";
import { Button, Notification } from "@arco-design/web-react";
import CommentList from "@/pages/product/summarize/comment-list";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { postDemandComment } from "@/api/comment";
import DOMPurify from "dompurify";

const bodyStyle = {
  padding: "1rem",
  transition: " 0.5s all ease-in-out"
};
export default function Summarize() {
  const t = useLocale();
  const { theme } = useContext(GlobalContext);

  const getTheme = (theme) => {
    return theme === "dark";
  };

  const [demandId, ] = ProductStore(state =>
    [state.demandId,], shallow);

  const ChildRef = React.createRef();

  function handleOnClick() {
    // @ts-ignore
    let data = ChildRef.current.getContext();
    data = DOMPurify.sanitize(data)
    if(demandId &&  demandId >0){
      postDemandComment({
        demandId: demandId,
        remarks: data
      }).then(r => {
        if(r.data.success){
          // @ts-ignore
          ChildRef.current.clear()
          Notification.success({
            title: 'Success',
            content: t['summarize.history.comment.success'],
          })
        }
      })
    }
  }
  return <div className={styles["context"]}>
    <div className={styles["context-main"]}>
      <Sheet />
    </div>

    <DynamicOuterCard title={t["summarize.history.comment"]} bodyStyle={bodyStyle}>
      <div className={styles["context-card"]}>
        <Button className={styles["context-card-button"]} type={"primary"} onClick={handleOnClick}>{t["summarize.history.comment.add"]}</Button>
        <MakeDown theme={getTheme(theme)} onRef={ChildRef} />
      </div>
    </DynamicOuterCard>

    <DynamicOuterCard title={t["summarize.history.title"]} bodyStyle={bodyStyle}>
      <CommentList />
    </DynamicOuterCard>

  </div>;
}
