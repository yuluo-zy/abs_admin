import { Button, Checkbox, Form, Input, Link, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useHook/useStorage';
import useLocale from '@/utils/useHook/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { loginWithUserName } from '@/api/login';
import { UserToken } from '@/components/type';
import LoginProtocol from '@/pages/login/protocol';
import { defaultRoute } from '@/routes';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('LoginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(result: UserToken) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(result));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    sessionStorage.setItem('userStatus', 'login');
    localStorage.setItem('userToken', result.token);
    localStorage.setItem('userName', result.username);
    // 跳转首页
    window.location.href = defaultRoute;
  }

  function login(data) {
    setErrorMessage('');
    setLoading(true);
    loginWithUserName(data)
      .then((res) => {
        const { success: success, result, message } = res.data;
        if (success === true) {
          afterLoginSuccess(result);
        } else {
          setErrorMessage(message || t['login.system.user.login.error']);
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

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams: UserToken = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>
        {t['login.system.title']}
      </div>
      <div className={styles['login-form-sub-title']}>
        {t['login.system.subtitle']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input prefix={<IconUser />} onPressEnter={onSubmitClick} />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password prefix={<IconLock />} onPressEnter={onSubmitClick} />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <hr />
          <LoginProtocol />
        </Space>
      </Form>
    </div>
  );
}
