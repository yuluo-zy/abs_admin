import React, { useState } from "react";
import cs from "classnames";
import { Button, Message } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import styles from "./style/index.module.less";
import DynamicModal from "@/components/Dynamic/Modal";
import DynamicForm from "@/components/Dynamic/Form";
import { FormItemProps } from "@/components/type";

function Security() {
  const t = useLocale(locale);

  // const userInfo = useSelector((state: any) => {
  //   return state.userInfo || {};
  // });

  const data = [
    {
      key: "password",
      title: t["userSetting.security.password"],
      value: t["userSetting.security.password.tips"]
    }
    // {
    //   title: t["userSetting.security.question"],
    //   value: "",
    //   placeholder: t["userSetting.security.question.placeholder"]
    // },
    // {
    //   key: "phone",
    //   title: t["userSetting.security.phone"],
    //   value: userInfo.phoneNumber
    //     ? `${t["userSetting.security.phone.tips"]} ${userInfo.phoneNumber}`
    //     : ""
    // },
    // {
    //   key: "email",
    //   title: t["userSetting.security.email"],
    //   value: "",
    //   placeholder: t["userSetting.security.email.placeholder"]
    // }
  ];

  const [info, setInfo] = useState(null);

  // const postData = (key) => {
  //   if(key === "password") {
  //     Modal.confirm({
  //       title: 'Change password',
  //       content: <>
  //         <Input.Password
  //           defaultVisibility={true}
  //           value={info}
  //           placeholder='Please enter ...'
  //           onChange={(value) => {
  //             setInfo(value)
  //           }
  //           }
  //         />
  //         <p>{info}</p>
  //       </> ,
  //       okText: 'Ok',
  //       cancelText: 'Cancel',
  //     });
  //   }
  // }

  const postUserPassword: Array<FormItemProps> = [
    {
      label: t["userTable.columns.user.password.old"],
      field: "oldPassword",
      type: "password",
      required: true,
      rules: [
        {
          required: true,
          message: t["userTable.columns.user.password.error"]
          // minLength: 8
        }
      ]
    },
    {
      label: t["userTable.columns.user.password.new"],
      field: "password1",
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
      label: t["userTable.columns.user.password.again"],
      field: "password2",
      type: "password",
      required: true,
      rules: [
        {
          required: true,
          message: t["userTable.columns.user.password.error"],
          minLength: 8
        }
      ]
    }
  ];

  const [model, setModel] = useState(false);
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(false);
  // const postData = () => {
  //   if (server === "password") {
  //     putUserPassword(userInfo.id, { password: info }).then(res => {
  //       if (res.data.success) {
  //         Message.info("Successfully modified");
  //         setModel(value => !value);
  //       }
  //     });
  //   }
  // };
  return (
    <div className={styles["security"]}>
      {data.map((item, index) => (
        <div className={styles["security-item"]} key={index}>
          <span className={styles["security-item-title"]}>{item.title}</span>
          <div className={styles["security-item-content"]}>
            <span
              className={cs({
                [`${styles["security-item-placeholder"]}`]: !item.value
              })}
            >
              {item.value}
            </span>

            <span>
              <Button type="text" onClick={() => {
                setModel(value => !value);
                setServer(item.key);
              }}>
                {item.value
                  ? t["userSetting.btn.edit"]
                  : t["userSetting.btn.set"]}
              </Button>
            </span>
          </div>
        </div>
      ))}
      <DynamicModal
        title={"Upload Info"}
        visible={model}
        footer={null}
        confirmLoading={loading}
        onCancel={() => {
          setModel(false);
        }}
      >
        <DynamicForm
          title={"Update Password"}
          formItem={postUserPassword}
          onSubmit={async (value) => {
            const { password1, password2, oldPassword } = value;
            if (password1 !== password2) {
              Message.error({
                content: t["userTable.columns.user.password.again.error"],
                duration: 10000
              });
              return;
            }
            setLoading(true);
            // await updatePassword({ oldPassword: oldPassword, newPassword: password1 }).then(
            //   (res) => {
            //     if (res.data.success === true) {
            //       Message.success(
            //         t["userTable.columns.user.operation.success"]
            //       );
            //       setLoading(false);
            //       setModel(false);
            //     }
            //   }
            // );
          }}
        />
      </DynamicModal>
    </div>
  );
}

export default Security;
