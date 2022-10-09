import auth, {AuthParams} from "@/utils/authentication";
import {useEffect, useMemo, useState} from "react";

export type Route = AuthParams & {
    name: string;
    key: string;
    breadcrumb?: boolean;
    permission?: string;
    hide?: boolean;
    children?: Route[];
};

export const defaultRoute = "user/setting";

export const routes: Route[] = [
    {
        name: "menu.user",
        key: "user",
        children: [
            {
                name: "menu.user.setting",
                key: "user/setting"
            }
        ]
    },
    {
        name: "menu.storage",
        key: "storage",
    },
];

export const getName = (path: string, routes) => {
    return routes.find((item) => {
        const itemPath = `/${item.key}`;
        if (path === itemPath) {
            return item.name;
        } else if (item.children) {
            return getName(path, item.children);
        }
    });
};


export const useMenu = (userMenu: []): [Route[], string] => {
    const filterUserMenu = ( routes: Route[], arr = []): Route[] => {
        // todo this is a error about get user router
        if (routes.length === 0 && arr.length === 0) {
            return [];
        }

        // collect permission
        const menu = [];
        if (userMenu != null && userMenu.length > 0) {
            userMenu.forEach(item => {
                if (item["permission"]) {
                    menu.push(item["permission"]);
                }
            });
        }

        for (const route of routes) {
            const {permission} = route;
            let visible = true;
            if (permission) {
                visible = menu.includes(permission);
            }
            if (!visible) {
                continue;
            }
            if (route.children && route.children.length) {
                const newRoute = {...route, children: []};
                filterUserMenu( route.children, newRoute.children);
                if (newRoute.children.length) {
                    arr.push(newRoute);
                }
            } else {
                arr.push({...route});
            }
        }
        return arr;
    };

    const [permissionMenu, setPermissionMenu] = useState(routes);
    useMemo(() => {
        const newRoutes = filterUserMenu(userMenu,routes);
        setPermissionMenu(value => newRoutes);
    }, [userMenu]);

    const defaultMenu = useMemo(() => {
        const first = permissionMenu[0];
        if (first) {
            return first?.children?.[0]?.key || first.key;
        }
        return "";
    }, [permissionMenu]);

    return [permissionMenu, defaultMenu];
};
