import React, { useState } from "react";
import { useSelector } from "react-redux";
import cs from "classnames";
import { Button, Input, Message, Modal } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import styles from "./style/index.module.less";
import { putUserPassword } from "@/api/user";

function Security() {
  const t = useLocale(locale);

  const userInfo = useSelector((state: any) => {
    return state.userInfo || {};
  });

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

  const [model, setModel] = useState(false);
  const [server, setServer] = useState(null);
  const postData = () => {
    if (server === "password") {
      putUserPassword(userInfo.id, { password: info }).then(res => {
        if (res.data.success) {
          Message.info("Successfully modified");
          setModel(value => !value);
        }
      });
    }
  };
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
      <Modal visible={model}
             simple={true}
             onCancel={() => {
               setModel(value => !value);
             }}
             title={"Update Info"}
             onOk={postData}
      >
        <Input placeholder="Please enter ..."
               value={info}
               onChange={(value) => setInfo(value)} />
      </Modal>
    </div>
  );
}

export default Security;
