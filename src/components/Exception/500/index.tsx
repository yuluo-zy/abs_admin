import React from "react";
import { Button, Result } from "@arco-design/web-react";
import locale from "./locale";
import useLocale from "@/utils/useHook/useLocale";
import styles from "./style/index.module.less";

interface Exception500Props {
  className?: string
  style?: React.CSSProperties,
  on_call_back?: () => void
}


const Exception500: React.FC<Exception500Props> = (props: Exception500Props) => {
  const t = useLocale(locale);
  const { className, style, on_call_back } = props;

  return (
    <div className={className}>
      <div className={styles.wrapper} style={{ ...style }}>
        <Result
          className={styles.result}
          status="500"
          subTitle={t["exception.result.500.description"]}
          extra={
            <Button key="back" type="primary" onClick={on_call_back}>
              {t["exception.result.500.back"]}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Exception500;
