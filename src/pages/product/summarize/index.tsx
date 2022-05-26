import * as React from 'react';
import { MakeDown } from "@/components/Dynamic/Mkdown";
import useLocale from "./locale/useLocale";
import styles from './style/index.module.less';
import Sheet from "@/pages/product/summarize/sheet";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
const bodyStyle = {
  padding: "1rem",
  transition: " 0.5s all ease-in-out"
};
export default function Summarize() {
  const t = useLocale();
  return <div className={styles['context']}>
    <div className={styles['context-main']}>
      <Sheet/>
    </div>

    <DynamicOuterCard title={t["summarize.sheet.title"]} bodyStyle={bodyStyle}>
      <div className={styles['context-right']}><MakeDown/></div>
    </DynamicOuterCard>

  </div>
}
