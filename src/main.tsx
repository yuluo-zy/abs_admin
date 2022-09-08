import "./style/global.less";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ConfigProvider } from "@arco-design/web-react";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import rootReducer from "./store";
import { GlobalContext } from "./context";
import Login from "./pages/login";
import checkLogin from "./utils/checkLogin";
import changeTheme from "./utils/changeTheme";
import useStorage from "./utils/useHook/useStorage";
import { Redirect } from "react-router";
import lazyload from "@/utils/lazyload";
import { AnyPath, LoginPath, RootPath, TicketPath } from "@/utils/routingTable";
// todo 去除 redux
const store = createStore(rootReducer);
function Index() {
  const [lang, setLang] = useStorage("arco-lang", "zh-CN");
  const [theme, setTheme] = useStorage("arco-theme", "light");

  function getArcoLocale() {
    switch (lang) {
      case "zh-CN":
        return zhCN;
      case "en-US":
        return enUS;
      default:
        return zhCN;
    }
  }

  const toMain = () => {
    if (checkLogin()) {
      return lazyload(() => import("@/layout"));
    } else {
      return <Redirect to={{ pathname: "/login" }} />;
    }
  };

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false
          },
          List: {
            bordered: false
          },
          Table: {

            border: false
          }
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path={LoginPath} component={Login} />
              <Route path={TicketPath} component={lazyload(() => import("@/open/work_order"))} />
              {/*<Route path="/manage" render={toMain} />*/}
              {/*<Route path={Root} component={lazyload(() => import("@/open/work_order/index"))} />*/}
              <Route path={RootPath}>
                <Redirect to={{ pathname: TicketPath }} />
              </Route>
              {/*// 系统默认页*/}
              <Route
                path={AnyPath}
                component={lazyload(() => import("@/components/Exception/404"))}
              />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
