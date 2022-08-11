import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Menu,
  Message,
  Notification,
  Select,
  Tooltip
} from "@arco-design/web-react";
import {
  IconLanguage,
  IconMoonFill,
  IconPoweroff,
  IconSettings,
  IconSunFill,
  IconTag
} from "@arco-design/web-react/icon";
import { useSelector } from "react-redux";
import { GlobalState } from "@/store";
import { GlobalContext } from "@/context";
import useLocale from "@/utils/useHook/useLocale";
import Logo from "@/assets/logo.svg";
import IconButton from "./IconButton";
import Settings from "../Settings";
import styles from "./style/index.module.less";
import defaultLocale from "@/locale";
import useStorage from "@/utils/useHook/useStorage";
import { loginOut } from "@/api/login";
import HelpInfo from "@/pages/help";
import { setHelpKey } from "@/store/help";

function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);

  const [_, setUserStatus] = useStorage("userStatus");

  const get_avatar = (user_name: string): string => {
    const user_url = encodeURI(user_name);
    return `https://avatars.dicebear.com/v2/human/${user_url}.svg?options[mood][]=happy`;
  };

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);

  function logout() {
    setUserStatus("logout");
    window.location.href = "/login";
    loginOut().then((r) => {
      const { success } = r.data;
      if (success === true) {
        Notification.success({
          title: "Success",
          content: t["menu.user.setting.login.out"]
        });
      }
    });
  }

  function onMenuItemClick(key) {
    if (key === "logout") {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
  }


  if (!show) {
    return (
      <div className={styles["fixed-settings"]}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }


  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="setting">
        <IconSettings className={styles["dropdown-icon"]} />
        {t["menu.user.setting"]}
      </Menu.Item>
      <Divider style={{ margin: "4px 0" }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles["dropdown-icon"]} />
        {t["navbar.logout"]}
      </Menu.Item>
    </Menu>
  );


  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles["logo-name"]}>ESPRESSIF Custom Manufacturing Service</div>
        </div>
        <ul className={styles.right}>
          {/*<li>*/}
          {/*  <Input.Search*/}
          {/*    className={styles.round}*/}
        {/*    placeholder={t["navbar.search.placeholder"]}*/}
        {/*  />*/}
        {/*</li>*/}
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: "中文", value: "zh-CN" },
              { label: "English", value: "en-US" }
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "br"
            }}
            trigger="hover"
            onChange={(value) => {
              setLang(value);
              const nextLang = defaultLocale[value];
              Message.info(`${nextLang["message.lang.tips"]}${value}`);
            }}
          />
        </li>
        <li>
          <Tooltip
            content={
              "help"
            }
          >
            <IconButton
              icon={<IconTag />}
              onClick={() => setHelpKey("1")}
            />
          </Tooltip>
        </li>
        <li>
          <Tooltip
            content={
              theme === "light"
                ? t["settings.navbar.theme.toDark"]
                : t["settings.navbar.theme.toLight"]
            }
          >
            <IconButton
              icon={theme !== "dark" ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </Tooltip>
        </li>
        <Settings />
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: "pointer" }}>
                <img src={get_avatar(userInfo.name)} alt={userInfo.name} />
              </Avatar>
            </Dropdown>
          </li>
        )}
        </ul>
      </div>
      <HelpInfo />
    </>

  );
}

export default Navbar;
