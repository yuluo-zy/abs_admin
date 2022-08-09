import { CallBackHandle } from "@/components/type";
import DynamicForm from "@/components/Dynamic/Form";
import { addUser, putUser } from "@/api/user";
import { Message } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/pages/account/manage/locale";
import axios from "axios";
import { addableOrg, addableRole } from "@/api/role";
// 格式化 tag 类型
const getRoleList = (data) => {
  const temp = [];
  if (data && data.length > 0) {
    for (const item of data) {
      temp.push({
        label: item.name,
        value: item.id
      });
    }
  }
  return temp;
};

const getTreeDate = (treeList, index) => {
  treeList.forEach((ele) => {
    const temp = index + 1;
    ele["label"] = ele["name"];
    ele["value"] = ele["id"];
    ele["key"] = temp + "-" + ele["id"];
    if (ele.children && ele.children.length > 0) {
      getTreeDate(ele.children, temp);
    }
  });
};
const CreateUserHOC = (props: CallBackHandle) => {
  const t = useLocale(locale);

  const [roleList, setRoleList] = useState([]);
  const [orgTree, setOrgTree] = useState([]);

  // 获取用户可以创建的角色列表
  const getRoleAndOrg = () => {
    axios.all([
      addableRole(),
      addableOrg()
    ]).then(axios.spread((role, org) => {
      if (role?.data && role?.data.success) {
        setRoleList(getRoleList([...role?.data.result]));
      }
      if (org?.data && org?.data.success) {
        let temp = [...org?.data.result];
        getTreeDate(temp, 0);
        setOrgTree(temp);
      }
    }));
  };

  useEffect(() => {
    getRoleAndOrg();
  }, []);

  return <DynamicForm
    title={t["userTable.columns.operations.add"]}
    formItem={[
      {
        label: t["userTable.columns.user.name"],
        type: "input",
        field: "username",
        required: true,
        rules: [
          {
            required: true,
            message: t["userTable.columns.user.name.error"],
            minLength: 2
          }
        ]
      },
      {
        label: t["userTable.columns.user.password"],
        field: "password",
        type: "password",
        required: true,
        rules: [
          {
            required: true,
            message: t["userTable.columns.user.password.error"],
            minLength: 8
          }
        ]
      },
      {
        label: t["userTable.columns.user.group"],
        field: "groupId",
        type: "cascader",
        rules: [
          {
            message: t["userTable.columns.user.role.error"]
          }
        ],
        required: true,
        options: [...orgTree]
      },
      {
        label: t["userTable.columns.user.role"],
        field: "roleIds",
        type: "multiple",
        rules: [
          {
            type: "array",
            minLength: 1,
            message: t["userTable.columns.user.role.error"]
          }
        ],
        required: true,
        options: [...roleList]
      }
    ]}
    data={props.data}
    onSubmit={async (value) => {
      // 验证 org组织树必须大于两层
      if (value?.groupId && value?.groupId.length <= 1) {
        Message.error(t["userTable.columns.user.org.length"]);
        return;
      }
      if (props.data) {
        await putUser({ ...value, id: props.data?.id }).then((res) => {
          if (res.data.success === true) {
            Message.success(t["userTable.columns.user.operation.success"]);
            props.confirmCallback();
          }
        });
        return;
      }

      await addUser(value).then((res) => {
        if (res.data.success === true) {
          Message.success(t["userTable.columns.user.operation.success"]);
          props.confirmCallback();
        }
      });
    }}
  />;
};

export default CreateUserHOC;
