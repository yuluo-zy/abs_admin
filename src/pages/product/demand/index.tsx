import React, { useEffect, useMemo } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import ProductMenu from '@/pages/product/demand/menu';

import styles from './style/index.module.less';
import { useHistory } from 'react-router-dom';
import { isArray } from '@/utils/is';
import { MenuItemProps } from '@/components/type';
import { IconCalendar, IconMindMapping, IconSubscribed } from '@arco-design/web-react/icon';
import NProgress from 'nprogress';
import lazyload from '@/utils/lazyload';
import { Route, Switch } from 'react-router';
import { ProductStore, setMenu } from '@/store/product';
import shallow from 'zustand/shallow';
import { Button } from '@arco-design/web-react';

function getFlattenRoutes(routes) {
  const res = [];
  const mod = import.meta.glob("./entry/**/[a-z[]*.tsx");

  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && route.path) {
        route.component = lazyload(
          mod[`./entry/${route.path}/index.tsx`]
        );
        res.push(route);
      }
      if (isArray(route.child) && route.child.length) {
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
      path: "service/preselection",
      child: [
        {
          name: t[
            "menu.production.service.selection.requirements.details.firmware"
            ],
          key: "menu.production.service.selection.requirements.details.firmware",
          path: "service/firmware",
          show: false,
          value: 0
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.mac"
            ],
          key: "menu.production.service.selection.requirements.details.mac",
          path: "service/mac",
          show: false,
          value: 1
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.burn"
            ],
          key: "menu.production.service.selection.requirements.details.burn",
          path: "service/burn",
          show: false,
          value: 2
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.pre-fit"
            ],
          key: "menu.production.service.selection.requirements.details.pre-fit",
          path: "service/pre-fit",
          show: false,
          value: 3
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.custom.label"
            ],
          key: "menu.production.service.selection.requirements.details.custom.label",
          path: "service/label",
          show: false,
          value: 4
        }
      ]
    },
    {
      name: t["menu.production.service.selection.check"],
      key: "menu.production.service.selection.check",
      icon: <IconCalendar key={"menu.production.service.selection.check"} />

    }
  ];
  const flattenRoutes = useMemo(() => getFlattenRoutes(MenuTree) || [], []);
  const history = useHistory();
  const [setStepRouter, setCollapse] = ProductStore(state => [state.setStepRouter, state.setCollapse, state.setStepList], shallow);

  useEffect(() => {
    setMenu(MenuTree)
  }, []);

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      setStepRouter(currentRoute.path);
      history.push(`/product/demand/${currentRoute.path}`);
      NProgress.done();
    });
  }

  const nextStep = () => {
    history.push(`/product/demand/hardware`)
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
          <ProductMenu clickMenuItem={onClickMenuItem} />
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
              <div>todo 添加导入过程声明和足以事项</div>
              <div>
                <Button type='primary' onClick={nextStep}>
                  {t['index.start']}
                </Button>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
