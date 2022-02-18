import React, { useMemo, useReducer } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import ProductMenu from '@/pages/product/demand/menu';
import { initialProductDemand, ProductDemandContext, ProductDemandStore } from '@/store/context-manager';
import styles from './style/index.module.less';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { isArray } from '@/utils/is';
import { MenuItemProps } from '@/components/type';
import { IconCalendar, IconMindMapping, IconNav, IconSubscribed } from '@arco-design/web-react/icon';
import NProgress from 'nprogress';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import lazyload from '@/utils/lazyload';

function getFlattenRoutes(routes) {
  const res = [];
  const mod = import.meta.glob('./entry/**/[a-z[]*.tsx');

  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && route.path && !route.children) {
        route.component = lazyload(
          mod[`./entry/${route.path}/index.tsx`]
        );
        res.push(route);
      } else if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }

  travel(routes);
  return res;
}

export default function ProductDemand(props) {
  const t = useLocale();
  const [state, dispatch] = useReducer(
    ProductDemandStore,
    initialProductDemand
  );
  const MenuTree: MenuItemProps[] = [
    {
      name: t['menu.hardware.selection'],
      key: 'menu.hardware.selection',
      icon: <IconMindMapping key={'menu.hardware.selection'} />,
      path: 'hardware',
    },
    {
      name: t['menu.production.service.selection'],
      key: 'menu.production.service.selection',
      icon: <IconSubscribed key={'menu.production.service.selection'} />,
      child: [
        {
          name: t['menu.production.service.selection.title'],
          key: 'menu.production.service.selection.title',
          icon: (
            <IconCalendar key={'menu.production.service.selection.title'} />
          ),
        },
        {
          name: t['menu.production.service.selection.requirements.details'],
          key: 'menu.production.service.selection.requirements.details',
          icon: (
            <IconCalendar
              key={'menu.production.service.selection.requirements.details'}
            />
          ),
          child: [
            {
              name: t[
                'menu.production.service.selection.requirements.details.firmware'
              ],
              key: 'menu.production.service.selection.requirements.details.firmware',
            },
            {
              name: t[
                'menu.production.service.selection.requirements.details.mac'
              ],
              key: 'menu.production.service.selection.requirements.details.mac',
            },
            {
              name: t[
                'menu.production.service.selection.requirements.details.burn'
              ],
              key: 'menu.production.service.selection.requirements.details.burn',
            },
            {
              name: t[
                'menu.production.service.selection.requirements.details.pre-fit'
              ],
              key: 'menu.production.service.selection.requirements.details.pre-fit',
            },
            {
              name: t[
                'menu.production.service.selection.requirements.details.custom.label'
              ],
              key: 'menu.production.service.selection.requirements.details.custom.label',
            },
          ],
        },
        {
          name: t['menu.production.service.selection.check'],
          key: 'menu.production.service.selection.check',
          icon: (
            <IconCalendar key={'menu.production.service.selection.check'} />
          ),
        },
      ],
    },
    {
      name: t['menu.production.service.selection.overview'],
      key: 'menu.production.service.selection.overview',
      icon: <IconNav key={'menu.production.service.selection.overview'} />,
    },
  ];
  const flattenRoutes = useMemo(() => getFlattenRoutes(MenuTree) || [], []);
  const history = useHistory();
  const { path } = useRouteMatch();

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      dispatch({
        type: 'StepRouter',
        payload: currentRoute.path,
      });
      history.push(`${path}/${currentRoute.path}`);
      NProgress.done();
    });
  }

  return (
    <ProductDemandContext.Provider value={{ state, dispatch }}>
      <DynamicOuterCard title={t['menu.title']}>
        <div className={styles.layout}>
          <div className={styles.layoutLeftSide}>
            <ProductMenu menu={MenuTree} clickMenuItem={onClickMenuItem} />
          </div>
          <div className={styles['layout-content']}>
            <Switch>
              {flattenRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={`${path}/${route.path}`}
                    component={route.component}
                  />
                );
              })}
              <Route exact path={path}>
                <div>jjjj</div>
              </Route>
            </Switch>
          </div>
        </div>
      </DynamicOuterCard>
    </ProductDemandContext.Provider>
  );
}
