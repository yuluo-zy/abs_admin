import * as React from 'react';
import { MakeDown } from "@/components/Dynamic/Mkdown";
import useLocale from "./locale/useLocale";
import styles from './style/index.module.less';
import Sheet from "@/pages/product/summarize/sheet";

export default function Summarize() {
  const t = useLocale();
  return <div className={styles['context']}>
    <div className={styles['context-main']}>
      <Sheet/>
    </div>

    <div className={styles['context-right']}><MakeDown/></div>
  </div>
}
