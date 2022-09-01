import useLocale from "@/utils/useHook/useLocale";
import locale from "@/open/work_order/locale";
import React from "react";
import { useHistory } from "react-router";
import styles from "./style/add.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import { Button, Checkbox, Form, Input } from "@arco-design/web-react";

const FormItem = Form.Item;
export default function WorkOrderAdd() {
  const t = useLocale(locale);
  const history = useHistory();
  const to_return = () => {
    history.push("/open/work_order");
  };
  return <div className={styles["main"]}>
    <div>
      <Button onClick={to_return}>{t["workplace.add.return"]}</Button>
    </div>
    <div className={styles["content"]}>
      <DynamicCard title={t["workplace.content.work_order.add"]}>
        <Form autoComplete="off" className={styles["form"]}>
          <FormItem label="Username">
            <Input placeholder="please enter your username..." />
          </FormItem>
          <FormItem label="Post">
            <Input placeholder="please enter your post..." />
          </FormItem>
          <FormItem wrapperCol={{ offset: 5 }}>
            <Checkbox>I have read the manual</Checkbox>
          </FormItem>
          <FormItem wrapperCol={{ offset: 5 }}>
            <Button type="primary">Submit</Button>
          </FormItem>
        </Form>
      </DynamicCard>
    </div>
  </div>;
}
