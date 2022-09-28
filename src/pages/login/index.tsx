import React, { useContext, useEffect } from "react";
import Footer from "@/components/Footer";
import LoginForm from "./form";
import styles from "./style/index.module.less";
import checkLogin from "@/utils/checkLogin";
import { useHistory } from "react-router";
import { defaultRoute } from "@/routes";
import { Message, Select } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import IconButton from "@/components/NavBar/IconButton";
import { IconLanguage } from "@arco-design/web-react/icon";
import defaultLocale from "@/locale";
import { GlobalContext } from "@/context";
import LoginNode from "@/assets/login_node.png";

function Login() {
  const { setLang, lang } = useContext(GlobalContext);
  const t = useLocale(locale);
  const history = useHistory();
  useEffect(() => {
    document.body.setAttribute("arco-theme", "light");
    if (checkLogin()) {
      Message.info("Successfully Logged In");
      history.replace(defaultRoute);
    }
  }, []);

  return (
    <div className={styles.container}>
      {/*<div className={styles.logo}>*/}
      {/*  <Logo />*/}
      {/*</div>*/}
      <div className={styles.banner}>
        <img src={LoginNode} />
      </div>
      <div className={styles.content}>
        <div className={styles.multi}>
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
        </div>
        <div className={styles["content-inner"]}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer isLink={true} />
        </div>
      </div>
    </div>
  );
}

Login.displayName = "LoginPage";

export default Login;
