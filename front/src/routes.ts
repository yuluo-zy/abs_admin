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

export const defaultRoute = "dashboard/workplace";

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
        name: "menu.account",
        key: "account",
        permission: "user:mgr",
        children: [
            {
                name: "menu.account.manage",
                key: "account/manage",
                permission: "user:view"
            },
            {
                name: "menu.account.role",
                key: "account/role",
                permission: "role:view"
            },
            {
                name: "menu.account.permission",
                key: "account/permission",
                permission: "permission:view"
            }
        ]
    }
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
    const filterUserMenu = (user_menu:Route[], routes: Route[], arr = []): Route[] => {
        if (!routes.length) {
            return [];
        }

        // collect permission
        const menu = [];
        if (user_menu != null && user_menu.length > 0) {
            user_menu.forEach(item => {
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
                filterUserMenu(user_menu, route.children, newRoute.children);
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

    useEffect(() => {
        const newRoutes = filterUserMenu(userMenu,routes);
        setPermissionMenu(newRoutes);
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
