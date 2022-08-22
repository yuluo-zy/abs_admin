import React from "react";
import { List } from "@arco-design/web-react";
import useLocale from "@/pages/product/locale/useLocale";

interface Person {
  userList: Array<string>;
}

export const DemandPerson: React.FC<Person> = (props: Person) => {
  const t = useLocale();
  const { userList } = props;
  return (
    <List
      header={t["product.manage.tools.related.personnel.list"]}
      size="small"
      dataSource={userList}
      render={(item, index) => <List.Item key={index}>{item}</List.Item>}
    />
  );
};

export default DemandPerson;
