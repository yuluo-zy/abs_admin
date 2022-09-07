import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import Logo from "@/assets/logo.svg";
import LoginForm from "./form";
import LoginBanner from "./banner";
import styles from "./style/index.module.less";
import checkLogin from "@/utils/checkLogin";
import { useHistory } from "react-router";
import { defaultRoute } from "@/routes";
import { Message } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "@/locale/index";

function Login() {
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
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.banner}>
        <div className={styles["banner-inner"]}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["content-inner"]}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
          <div>
            {t["login.form.work.order"]}
          </div>
        </div>
      </div>
    </div>
  );
}

Login.displayName = "LoginPage";

export default Login;
