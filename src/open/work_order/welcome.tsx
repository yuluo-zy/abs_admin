import React from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import styles from "./style/welcome.module.less";
import Logo from "./assets/logo.svg";
import { Button, Input, Select } from "@arco-design/web-react";
import { IconSubscribeAdd } from "@arco-design/web-react/icon";
import Solution from "./assets/solution_mindset.svg";
import { useHistory } from "react-router";

export const Welcome: React.FC = (props: React.PropsWithChildren<any>) => {
  const t = useLocale(locale);
  const history = useHistory();

  const to_add = () => {
    history.push("/open/work_order/add");
  };
  return <>
    <div className={styles["content"]}>
      <div className={styles["content-banner"]}>
        <div className={styles["content-banner-logo"]}>
          <Logo />
        </div>


        <p>{t["workplace.content"]}
          <Button type="outline" icon={<IconSubscribeAdd />}
                  onClick={to_add}>{t["workplace.content.work_order.add"]}</Button>
        </p>
        <div>
          <Input.Group compact>
            <Select defaultValue="Beijing" showSearch style={{ width: "25%" }}>
              <Select.Option value="Beijing">{t["workplace.content.work_order"]}</Select.Option>
            </Select>
            <Input style={{ width: "75%" }} placeholder="Please enter an address" />
          </Input.Group>
        </div>
      </div>
      <div className={styles["content-img"]}>
        <Solution />
      </div>
    </div>

  </>;
};
