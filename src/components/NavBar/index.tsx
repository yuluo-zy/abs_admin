import React, { useContext } from 'react';
import { Avatar, Divider, Dropdown, Input, Menu, Message, Notification, Select, Tooltip } from '@arco-design/web-react';
import {
  IconLanguage,
  IconMoonFill,
  IconNotification,
  IconPoweroff,
  IconSettings,
  IconSunFill,
  IconUser
} from '@arco-design/web-react/icon';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import MessageBox from '@/components/MessageBox';
import IconButton from './IconButton';
import Settings from '../Settings';
import storage from '@/utils/storage';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';
import { loginOut } from '@/api/login';

function Navbar() {
  const t = useLocale();
  const theme = useSelector((state: GlobalState) => state.theme);
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const dispatch = useDispatch();
  const get_avatar = (user_name: string): string => {
    const user_url = encodeURI(user_name);
    return `https://avatars.dicebear.com/v2/human/${user_url}.svg?options[mood][]=happy`;
  };

  const { setLang } = useContext(GlobalContext);

  function logout() {
    storage.setItem('userStatus', 'logout');

    window.location.href = '/login';
    loginOut().then(r => {
      const { success } = r.data;
      if (success === true) {
        Notification.success({ title: 'Success', content: t['menu.user.setting.login.out'] });
      }
    });

  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
  }


  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key='user info'>
        <IconUser className={styles['dropdown-icon']} />
        {t['menu.user.info']}
      </Menu.Item>
      <Menu.Item key='setting'>
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.user.setting']}
      </Menu.Item>
      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key='logout'>
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles['logo-name']}>ESPRESSIF Custom Manufacturing Service</div>
      </div>
      <ul className={styles.right}>
        <li>
          <Input.Search className={styles.round} placeholder='Please search' />
        </li>
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' }
            ]}
            value={storage.getItem('arco-lang')}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'br'
            }}
            trigger='hover'
            onChange={(value) => {
              storage.setItem('arco-lang', value);
              setLang(value);
              const nextLang = defaultLocale[value];
              Message.info(`${nextLang['message.lang.tips']}${value}`);
            }}
          />
        </li>
        <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li>
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? t['settings.navbar.theme.toDark']
                : t['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() =>
                dispatch({
                  type: 'toggle-theme',
                  payload: { theme: theme === 'light' ? 'dark' : 'light' }
                })
              }
            />
          </Tooltip>
        </li>
        <Settings />
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position='br'>
              <Avatar
                size={36}
                style={{ cursor: 'pointer' }}
              >
                <img src={get_avatar(userInfo.name)} alt={userInfo.name} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
