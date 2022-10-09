import React, {useEffect, useMemo, useRef, useState} from "react";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import {Breadcrumb, Layout, Menu} from "@arco-design/web-react";
import cs from "classnames";
import {
    IconArchive,
    IconDashboard,
    IconMenuFold,
    IconMenuUnfold,
    IconNav,
    IconUser,
    IconUserGroup
} from "@arco-design/web-react/icon";
import qs from "query-string";
import NProgress from "nprogress";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import {isArray} from "./utils/is";
import useLocale from "./utils/useHook/useLocale";
import getUrlParams from "./utils/getUrlParams";
import lazyload from "./utils/lazyload";
import styles from "./style/layout.module.less";
import {useMenu} from "@/routes";
import {ManagePath} from "@/utils/routingTable";
import {Redirect} from "react-router";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

function getIconFromKey(key) {
    switch (key) {
        case "dashboard":
            return <IconDashboard className={styles.icon}/>;
        case "account":
            return <IconUserGroup className={styles.icon}/>;
        case "user":
            return <IconUser className={styles.icon}/>;
        case "product":
            return <IconNav className={styles.icon}/>;
        case "work_order":
            return <IconArchive className={styles.icon}/>;
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

function PageLayout() {
    const urlParams = getUrlParams();
    const history = useHistory();
    const pathname = history.location.pathname;
    const currentComponent = qs.parseUrl(pathname).url.slice(1);
    const locale = useLocale();

    useEffect(() => {
        fetchUserInfo()
    }, []);

    const [routes, defaultRoute] = useMenu([]);
    const defaultSelectedKeys = [currentComponent || defaultRoute];
    const paths = (currentComponent || defaultRoute).split("/");
    const defaultOpenKeys = paths.slice(0, paths.length - 1);

    const [breadcrumb, setBreadCrumb] = useState([]);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
    const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

    const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
    const navbarHeight = 60;
    const menuWidth = collapsed ? 48 : 190;


    function fetchUserInfo() {
        // return getUserInfo().then((res) => {
        //     dispatch({
        //         type: "update-userInfo",
        //         payload: {userInfo: res.data.result}
        //     });
        // });
    }

    const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

    function onClickMenuItem(key) {
        const currentRoute = flattenRoutes.find((r) => r.key === key);
        const component = currentRoute.component;
        const preload = component.preload();
        NProgress.start();
        preload.then(() => {
            setSelectedKeys([key]);
            history.push(currentRoute.path ? currentRoute.path : `${ManagePath}/${key}`);
            NProgress.done();
        });
    }

    function toggleCollapse() {
        setCollapsed((collapsed) => !collapsed);
    }

    const paddingLeft = {paddingLeft: menuWidth};
    const paddingTop = {paddingTop: navbarHeight};
    const paddingStyle = {...paddingLeft, ...paddingTop};

    function renderRoutes(locale) {
        routeMap.current.clear();
        const nodes = [];

        function travel(_routes, level, parentNode = []) {
            return _routes.map((route) => {
                const {breadcrumb = true} = route;
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
                            <Link to={`${ManagePath}/${route.key}`}>{titleDom}</Link>
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
                className={styles["layout-navbar"]}
            >
                <Navbar show={true}/>
            </div>
            <Layout>

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
                        {collapsed ? <IconMenuUnfold/> : <IconMenuFold/>}
                    </div>
                </Sider>

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
                                            path={`${ManagePath}/${route.key}`}
                                            component={route.component}
                                        />
                                    );
                                })}
                                <Route exact path={ManagePath}>
                                    <Redirect to={`${ManagePath}/${defaultRoute}`}/>
                                </Route>
                                <Route
                                    path="*"
                                    component={lazyload(() => import("@/components/Exception/404"))}
                                />
                            </Switch>
                        </Content>
                    </div>
                    <Footer/>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default PageLayout;
