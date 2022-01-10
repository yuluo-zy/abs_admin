import './style/global.less';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import rootReducer from './store';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import storage from './utils/storage';
import './mock';
import { userInfo, userMenu } from '@/api/user';

const store = createStore(rootReducer);

function Index() {
  const defaultLang = storage.getItem('arco-lang') || 'zh-CN';
  const [lang, setLang] = useState(defaultLang);

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    return userInfo().then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data.result }
      });
    });
  }

  function fetchUserMenu() {
    return userMenu().then((res) => {
      store.dispatch({
        type: 'update-userMenu',
        payload: { userInfo: res.data.result }
      });
    });
  }


  useEffect(() => {
    if (checkLogin()) {
      Promise.all([fetchUserInfo(), fetchUserMenu()]).then(
        // todo 完成异步加载
        // this.setState({ loading: false })
      );
    } else if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    storage.setItem('arco-lang', lang);
  }, [lang]);

  const contextValue = {
    lang,
    setLang
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
              <Route path='/login' component={Login} />
              <Route path='/' component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
