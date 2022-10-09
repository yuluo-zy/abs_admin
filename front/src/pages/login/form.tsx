import { Button, Checkbox, Form, Input, Link, Space } from "@arco-design/web-react";
import { FormInstance } from "@arco-design/web-react/es/Form";
import { IconLock, IconUser } from "@arco-design/web-react/icon";
import React, { useEffect, useRef, useState } from "react";
import useStorage from "@/utils/useHook/useStorage";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";
import styles from "./style/index.module.less";
import { loginWithUserName } from "@/api/login";
import LoginProtocol from "@/pages/login/protocol";
import { defaultRoute } from "@/routes";
import { useHistory } from "react-router";
import {code_success} from "@/utils/httpRequest";

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage("LoginParams");
  const history = useHistory();

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);
  function afterLoginSuccess(result) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(result));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    sessionStorage.setItem("userStatus", "login");
    sessionStorage.setItem("userToken", result?.access_token);
    sessionStorage.setItem("userName", result?.user?.name);
    history.replace(defaultRoute);
  }

  function login(data) {
    setErrorMessage("");
    setLoading(true);
    loginWithUserName(data)
      .then((res) => {
        const { code, data, message } = res.data;
        if (code === code_success) {
          afterLoginSuccess(data);
        } else {
          setErrorMessage(message || t["login.system.user.login.error"]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  // // 读取 localStorage，设置初始值
  // useEffect(() => {
  //   const rememberPassword = !!loginParams;
  //   setRememberPassword(rememberPassword);
  //   if (formRef.current && rememberPassword) {
  //     const parseParams = JSON.parse(loginParams);
  //     formRef.current.setFieldsValue(parseParams);
  //   }
  // }, [loginParams]);

  return (
    <div className={styles["login-form-wrapper"]}>
      <div className={styles["login-form-title"]}>
        {t["login.system.title"]}
      </div>
      <div className={styles["login-form-sub-title"]}>
        {t["login.system.subtitle"]}
      </div>
      <div className={styles["login-form-error-msg"]}>{errorMessage}</div>
      <Form className={styles["login-form"]} layout="vertical" ref={formRef}>
        <Form.Item
          field="account"
          rules={[{ required: true, message: t["login.form.userName.errMsg"] }]}
        >
          <Input prefix={<IconUser />} onPressEnter={onSubmitClick} />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t["login.form.password.errMsg"] }]}
        >
          <Input.Password prefix={<IconLock />} onPressEnter={onSubmitClick} />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles["login-form-password-actions"]}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t["login.form.rememberPassword"]}
            </Checkbox>
            <Link>{t["login.form.forgetPassword"]}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t["login.form.login"]}
          </Button>
          <hr />
          <LoginProtocol />
        </Space>
      </Form>
    </div>
  );
}
