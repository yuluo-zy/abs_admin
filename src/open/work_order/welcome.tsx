import React from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import styles from "./style/welcome.module.less";
import Logo from "./assets/logo.svg";
import { Button, Input, Select } from "@arco-design/web-react";
import { IconSearch, IconSubscribeAdd } from "@arco-design/web-react/icon";
import Solution from "./assets/solution_mindset.svg";
import { useHistory } from "react-router";

interface WelcomeProps {
  setSelect: any;
}

export const Welcome: React.FC<WelcomeProps> = (props: React.PropsWithChildren<WelcomeProps>) => {
  const t = useLocale(locale);
  const history = useHistory();
  const { setSelect } = props;

  const to_add = () => {
    history.push("/open/work_order/add");
  };
  return <>
    <div className={styles["content"]}>
      <div className={styles["content-banner"]}>
        <div className={styles["content-banner-logo"]}>
          <Logo />
        </div>
        <div className={styles["content-banner-content"]}>
          <p>{t["workplace.content"]}
            <Button type="outline" icon={<IconSubscribeAdd />} className={styles["button"]}
                    onClick={to_add}>{t["workplace.content.work_order.add"]}</Button>
          </p>
          <div className={styles["content-banner-group"]}>
            <Input.Group compact>
              <Select defaultValue="1" className={styles["select"]}>
                <Select.Option value="1">{t["workplace.content.work_order"]}</Select.Option>
              </Select>
              <Input placeholder="Please enter an address"
                     addAfter={<IconSearch />}
                     className={styles["input"]}
                     onPressEnter={(value) => {
                       if (value?.target?.value) {
                         setSelect(value?.target?.value);
                       }
                     }}
              />
            </Input.Group>
          </div>


        </div>
      </div>
      <div className={styles["content-img"]}>
        <Solution />
      </div>
    </div>

  </>;
};
