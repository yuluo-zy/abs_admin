import React from "react";
import useLocale from "@/pages/product/locale/useLocale";
import { List } from "@arco-design/web-react";

interface Person {
  userList: Array<Record<string, string>>;
}

export const DemandPerson: React.FC<Person> = (props: Person) => {
  const t = useLocale();
  const { userList } = props;
  return (
    <List
      header={t["product.manage.tools.related.personnel.list"]}
      // size="small"
      hoverable={true}
      bordered={true}
      dataSource={userList}
      render={(item, index) => <List.Item key={index}>
        <List.Item.Meta
          title={item?.username}
          description={item?.email}
        />
      </List.Item>}
    />
  );
};

export default DemandPerson;
