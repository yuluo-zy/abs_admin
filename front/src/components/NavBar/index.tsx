import React, { useContext } from "react";
import { Avatar, Divider, Dropdown, Menu, Message, Notification, Select, Tooltip } from "@arco-design/web-react";
import {
  IconLanguage,
  IconMoonFill,
  IconPoweroff,
  IconSettings,
  IconSunFill,
} from "@arco-design/web-react/icon";
import { GlobalContext } from "@/context";
import useLocale from "@/utils/useHook/useLocale";
import Logo from "@/assets/logo.svg";
import IconButton from "./IconButton";
import styles from "./style/index.module.less";
import defaultLocale from "@/locale";
import { useSessionStorage } from "@/utils/useHook/useStorage";
import { loginOut } from "@/api/login";
import { useHistory } from "react-router";
import { LoginPath } from "@/utils/routingTable";
import {code_success} from "@/utils/httpRequest";

function Navbar({ show, isLogIn = true, title }: { show?: boolean, isLogIn?: boolean, title?: string }) {
  const t = useLocale();
  // const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const history = useHistory();

  const [_, setUserStatus] = useSessionStorage("userStatus");
  const [userToken, setUserToken, removeUserToken] = useSessionStorage("userToken");

  const get_avatar = (user_name: string): string => {
    if (user_name) {
      const user_url = encodeURI(user_name);
      return `https://avatars.dicebear.com/v2/human/${user_url}.svg?options[mood][]=happy`;
    }
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  };

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);

  function logout() {
    setUserStatus("logout");
    loginOut().then((r) => {
      const { code } = r.data;
      if (code === code_success) {
        Notification.success({
          title: "Success",
          content: t["menu.user.setting.login.out"]
        });
        // 清除对应的token信息
        removeUserToken();
      }
      history.replace(LoginPath);
    });
  }

  function onMenuItemClick(key) {
    if (key === "logout") {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
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
          {/*<div className={styles["logo-name"]}>{title || "ESPRESSIF Custom Manufacturing Service"}</div>*/}
        </div>
        <ul className={styles.right}>
          {/*<li>*/}
          {/*  <Input.Search*/}
          {/*    className={styles.round}*/}
          {/*    placeholder={t["navbar.search.placeholder"]}*/}
          {/*  />*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  <Select*/}
          {/*    triggerElement={<IconButton icon={<IconLanguage />} />}*/}
          {/*    options={[*/}
          {/*      { label: "中文", value: "zh-CN" },*/}
          {/*      { label: "English", value: "en-US" }*/}
          {/*    ]}*/}
          {/*    value={lang}*/}
          {/*    triggerProps={{*/}
          {/*      autoAlignPopupWidth: false,*/}
          {/*      autoAlignPopupMinWidth: true,*/}
          {/*      position: "br"*/}
          {/*    }}*/}
          {/*    trigger="hover"*/}
          {/*    onChange={(value) => {*/}
          {/*      setLang(value);*/}
          {/*      const nextLang = defaultLocale[value];*/}
          {/*      Message.info(`${nextLang["message.lang.tips"]}${value}`);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</li>*/}
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
          {/*{isLogIn && userInfo && (*/}
          {/*  <li>*/}
          {/*    <Dropdown droplist={droplist} position="br">*/}
          {/*      <Avatar size={32} style={{ cursor: "pointer" }}>*/}
          {/*        <img src={get_avatar(userInfo.name)} alt={userInfo.name} />*/}
          {/*      </Avatar>*/}
          {/*    </Dropdown>*/}
          {/*  </li>*/}
          {/*)}*/}
        </ul>
      </div>
    </>

  );
}

export default Navbar;
