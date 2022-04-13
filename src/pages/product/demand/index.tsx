import React, { useContext, useMemo } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import ProductMenu from "@/pages/product/demand/menu";

import styles from "./style/index.module.less";
import { useHistory } from "react-router-dom";
import { isArray } from "@/utils/is";
import { MenuItemProps } from "@/components/type";
import { IconCalendar, IconMindMapping, IconNav, IconSubscribed } from "@arco-design/web-react/icon";
import NProgress from "nprogress";
import lazyload from "@/utils/lazyload";
import { Route, Switch, useParams } from "react-router";
import  ProductStore  from "@/store/product";
import shallow from "zustand/shallow";

function getFlattenRoutes(routes) {
  const res = [];
  const mod = import.meta.glob("./entry/**/[a-z[]*.tsx");

  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && route.path && !route.child) {
        route.component = lazyload(
          mod[`./entry/${route.path}/index.tsx`]
        );
        res.push(route);
      } else if (isArray(route.child) && route.child.length) {
        travel(route.child);
      }
    });
  }

  travel(routes);
  return res;
}

export default function ProductDemand(props) {
  const t = useLocale();

  const MenuTree: MenuItemProps[] = [
    {
      name: t["menu.hardware.selection"],
      key: "menu.hardware.selection",
      icon: <IconMindMapping key={"menu.hardware.selection"} />,
      path: "hardware"
    },
    {
      name: t["menu.production.service.selection"],
      key: "menu.production.service.selection",
      icon: <IconSubscribed key={"menu.production.service.selection"} />,
      child: [
        {
          name: t["menu.production.service.selection.title"],
          key: "menu.production.service.selection.title",
          icon: (
            <IconCalendar key={"menu.production.service.selection.title"} />
          ),
          path: "service/preselection"
        },
        {
          name: t["menu.production.service.selection.requirements.details"],
          key: "menu.production.service.selection.requirements.details",
          icon: (
            <IconCalendar
              key={"menu.production.service.selection.requirements.details"}
            />
          ),
          child: [
            {
              name: t[
                "menu.production.service.selection.requirements.details.firmware"
                ],
              key: "menu.production.service.selection.requirements.details.firmware",
              path: "service/firmware"
            },
            {
              name: t[
                "menu.production.service.selection.requirements.details.mac"
                ],
              key: "menu.production.service.selection.requirements.details.mac",
              path: "service/mac"
            },
            {
              name: t[
                "menu.production.service.selection.requirements.details.burn"
                ],
              key: "menu.production.service.selection.requirements.details.burn",
              path: "service/burn"
            },
            {
              name: t[
                "menu.production.service.selection.requirements.details.pre-fit"
                ],
              key: "menu.production.service.selection.requirements.details.pre-fit"
            },
            {
              name: t[
                "menu.production.service.selection.requirements.details.custom.label"
                ],
              key: "menu.production.service.selection.requirements.details.custom.label",
              path: "service/label"
            }
          ]
        },
        {
          name: t["menu.production.service.selection.check"],
          key: "menu.production.service.selection.check",
          icon: (
            <IconCalendar key={"menu.production.service.selection.check"} />
          )
        }
      ]
    },
    {
      name: t["menu.production.service.selection.overview"],
      key: "menu.production.service.selection.overview",
      icon: <IconNav key={"menu.production.service.selection.overview"} />
    }
  ];
  const flattenRoutes = useMemo(() => getFlattenRoutes(MenuTree) || [], []);
  const history = useHistory();
  const [setStepRouter, setCollapse] = ProductStore(state => [state.setStepRouter, state.setCollapse], shallow)


  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    // 设置硬件选型的 时候, 关闭对应菜单
    if(currentRoute.path === 'hardware'){
      setCollapse(true)
    } else {
      setCollapse(false)
    }
    preload.then(() => {
      setStepRouter(currentRoute.path)
      history.push(`/product/demand/${currentRoute.path}`)
      NProgress.done();
    });
  }

  const bodyStyle = {
    paddingLeft: "2rem",
    paddingRight: "0",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    transition: " 0.5s all ease-in-out"
  };
  return (

    <div style={bodyStyle}>
      <div className={styles.layout}>
        <div className={styles.layoutLeftSide}>
          <ProductMenu menu={MenuTree} clickMenuItem={onClickMenuItem} />
        </div>
        <div className={styles["layout-content"]}>
          <Switch>
            {flattenRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={`/product/demand/${route.path}`}
                  component={route.component}
                />
              );
            })}
            <Route exact path={"/product/demand"}>
              <div>todo 添加说明</div>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
