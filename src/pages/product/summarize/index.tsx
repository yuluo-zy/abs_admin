import * as React from "react";
import { useContext } from "react";
import { MakeDown } from "@/components/Dynamic/Makedown";
import useLocale from "./locale/useLocale";
import styles from "./style/index.module.less";
import Sheet from "@/pages/product/summarize/sheet";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { GlobalContext } from "@/context";
import { Button } from "@arco-design/web-react";

const bodyStyle = {
  padding: "1rem",
  transition: " 0.5s all ease-in-out"
};
export default function Summarize() {
  const t = useLocale();
  const { theme } = useContext(GlobalContext);

  const getTheme = (theme) => {
    return theme === 'dark';
  }
  return <div className={styles['context']}>
    <div className={styles['context-main']}>
      <Sheet/>
    </div>

    <DynamicOuterCard title={t["summarize.history.comment"]} bodyStyle={bodyStyle}>
      <div className={styles['context-card']}>
        <Button className={styles['context-card-button']} type={'primary'}>{t['summarize.history.comment.add']}</Button>
        <MakeDown theme={getTheme(theme)}/>
      </div>
    </DynamicOuterCard>

  </div>
}
