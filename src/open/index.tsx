import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "@arco-design/web-react";
import cs from "classnames";
import { IconMenuFold, IconMenuUnfold, IconStorage } from "@arco-design/web-react/icon";
import { useSelector } from "react-redux";
import qs from "query-string";
import NProgress from "nprogress";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { isArray } from "@/utils/is";
import useLocale from "@/utils/useHook/useLocale";
import getUrlParams from "@/utils/getUrlParams";
import lazyload from "@/utils/lazyload";
import { GlobalState } from "@/store";
import styles from "./style/layout.module.less";
import { defaultRoute, routes } from "@/open/routes";
import Locale from "./locale/index";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

function getIconFromKey(key) {
  switch (key) {
    case "work_order":
      return <IconStorage className={styles.icon} />;
    // default:
    //   return <IconTag className={styles.icon} />;
  }
}

function getFlattenRoutes(routes) {
  const mod = import.meta.glob("./pages/**/[a-z[]*.tsx");
  const res = [];

  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        route.component = lazyload(mod[`./pages/${route.key}/index.tsx`]);
        res.push(route);
      } else if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }

  travel(routes);
  return res;
}

function getUrlParamsPrefix(url: string): string[] {
  const res = [];
  let temp = "";
  for (const str of url.split("/")) {
    if (str.length > 0) {
      temp = temp + "/" + str;
      res.push(temp);
    }
  }
  return res;
}

export const Open: React.FC = (props: React.PropsWithChildren<any>) => {
  const urlParams = getUrlParams();
  const history = useHistory();
  const pathname = history.location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const locale = useLocale(Locale);
  const settings = useSelector((state: GlobalState) => state.settings);

  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split("/");
  const defaultOpenKeys = paths.slice(0, paths.length - 1);

  const [breadcrumb, setBreadCrumb] = useState([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings.menuWidth;

  const showNavbar = settings.navbar && urlParams.navbar !== false;
  const showMenu = settings.menu && urlParams.menu !== false;
  const showFooter = settings.footer && urlParams.footer !== false;

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      setSelectedKeys([key]);
      history.push(currentRoute.path ? currentRoute.path : `/open/${key}`);
      NProgress.done();
    });
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed);
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  function renderRoutes(locale) {
    routeMap.current.clear();
    const nodes = [];

    function travel(_routes, level, parentNode = []) {
      return _routes.map((route) => {
        const { breadcrumb = true } = route;
        const iconDom = getIconFromKey(route.key);
        const titleDom = (
          <>
            {iconDom} {locale[route.name] || route.name}
          </>
        );
        if (
          route.component &&
          (!isArray(route.children) ||
            (isArray(route.children) && !route.children.length))
        ) {
          routeMap.current.set(
            `/${route.key}`,
            breadcrumb ? [...parentNode, route.name] : []
          );

          if (level > 1) {
            return <MenuItem key={route.key}>{titleDom}</MenuItem>;
          }
          nodes.push(
            <MenuItem key={route.key}>
              <Link to={`/open/${route.key}`}>{titleDom}</Link>
            </MenuItem>
          );
        }
        if (isArray(route.children) && route.children.length) {
          const parentNode = [];
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom);
          }

          if (level > 1) {
            return (
              <SubMenu key={route.key} title={titleDom}>
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            );
          }
          nodes.push(
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
      });
    }

    travel(routes, 1);
    return nodes;
  }

  useEffect(() => {
    // 用来设置面包屑
    const urlParamsPrefix = getUrlParamsPrefix(pathname);
    let routeConfig = [];
    while (urlParamsPrefix.length) {
      const temp = urlParamsPrefix.pop();
      routeConfig = routeMap.current.get(temp);
      if (routeConfig && routeConfig.length > 0) {
        break;
      }
    }
    setBreadCrumb(routeConfig || []);
  }, [pathname]);

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles["layout-navbar"], {
          [styles["layout-navbar-hidden"]]: !showNavbar
        })}
      >
        <Navbar show={showNavbar} isLogIn={false} />
      </div>
      <Layout>
        {showMenu && (
          <Sider
            className={styles["layout-sider"]}
            width={menuWidth}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            collapsible
            breakpoint="xl"
            style={paddingTop}
          >
            <div className={styles["menu-wrapper"]}>
              <Menu
                collapse={collapsed}
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onClickSubMenu={(_, openKeys) => {
                  setOpenKeys(openKeys);
                }}
              >
                {renderRoutes(locale)}
              </Menu>
            </div>
            <div className={styles["collapse-btn"]} onClick={toggleCollapse}>
              {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            </div>
          </Sider>
        )}
        {/*todo 菜单栏收起导致的重复渲染bug*/}
        <Layout className={styles["layout-content"]} style={paddingStyle}>
          <div className={styles["layout-content-wrapper"]}>
            {!!breadcrumb.length && (
              <div className={styles["layout-breadcrumb"]}>
                <Breadcrumb>
                  {breadcrumb.map((node, index) => (
                    <Breadcrumb.Item key={index}>
                      {typeof node === "string" ? locale[node] || node : node}
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </div>
            )}
            <Content>
              <Switch>
                {flattenRoutes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={`/open/${route.key}`}
                      component={route.component}
                    />
                  );
                })}
                <Route exact path="/open">
                  <Redirect to={`/open/${defaultRoute}`} />
                </Route>
                <Route
                  path="*"
                  component={lazyload(() => import("@/components/Exception/403"))}
                />
              </Switch>
            </Content>
          </div>
          {showFooter && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
};


