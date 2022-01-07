import { Button, Checkbox, Form, Input, Link, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { defaultRoute } from '@/routes';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style/index.module.less';
import LoginProtocol from '@/pages/login/protocol';
import { loginWithUserName } from '@/api/login';
import useLocale from '@/pages/login/locale/useLocale';

interface UserToken {
  token: string;
  username: string;
}

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const t = useLocale();

  function afterLoginSuccess(result: UserToken) {
    // 记住密码
    if (rememberPassword) {
      localStorage.setItem('loginParams', JSON.stringify(result));
    } else {
      localStorage.removeItem('loginParams');
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
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
    // todo 保存密码和账户信息
    const params = localStorage.getItem('loginParams');
    const rememberPassword = !!params;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams: UserToken = JSON.parse(params);
      formRef.current.setFieldsValue(parseParams);
    }
  }, []);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.system.title']}</div>
      <div className={styles['login-form-sub-title']}>{t['login.system.subtitle']}</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout='vertical'
        ref={formRef}
      >
        <Form.Item
          field='userName'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder='用户名：admin'
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field='password'
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password
            prefix={<IconLock />}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction='vertical'>
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.system.password.save']}
            </Checkbox>
            <Link>{t['login.system.password.forget']}</Link>
          </div>
          <Button type='primary' long onClick={onSubmitClick} loading={loading}>
            {t['login.system.login']}
          </Button>
          <hr />
          <LoginProtocol />
        </Space>
      </Form>
    </div>
  );
}
