import React, { useContext } from 'react';
import { MenuItemProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { Badge, Menu } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { IconCalendar, IconMindMapping, IconNav, IconSubscribed } from '@arco-design/web-react/icon';
import { ProductDemandContext } from '@/store/context-manager';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function ProductMenu() {
  const t = useLocale();
  const { state, dispatch } = useContext(ProductDemandContext);

  const updateMenuKey = (key: string) => {
    dispatch({
      type: 'StepKey',
      payload: key
    });
    // todo
    dispatch({
      type: 'StepList',
      payload: key
    });
  };
  const MenuTree: MenuItemProps[] = [
    {
      name: t['menu.hardware.selection'],
      key: 'menu.hardware.selection',
      icon: <IconMindMapping key={'menu.hardware.selection'} />
    },
    {
      name: t['menu.production.service.selection'],
      key: 'menu.production.service.selection',
      icon: <IconSubscribed key={'menu.production.service.selection'} />,
      child: [
        {
          name: t['menu.production.service.selection.title'],
          key: 'menu.production.service.selection.title',
          icon: <IconCalendar key={'menu.production.service.selection.title'} />
        },
        {
          name: t['menu.production.service.selection.requirements.details'],
          key: 'menu.production.service.selection.requirements.details',
          icon: <IconCalendar key={'menu.production.service.selection.requirements.details'} />,
          child: [
            {
              name: t['menu.production.service.selection.requirements.details.firmware'],
              key: 'menu.production.service.selection.requirements.details.firmware'
            },
            {
              name: t['menu.production.service.selection.requirements.details.mac'],
              key: 'menu.production.service.selection.requirements.details.mac'
            },
            {
              name: t['menu.production.service.selection.requirements.details.burn'],
              key: 'menu.production.service.selection.requirements.details.burn'
            },
            {
              name: t['menu.production.service.selection.requirements.details.pre-fit'],
              key: 'menu.production.service.selection.requirements.details.pre-fit'
            },
            {
              name: t['menu.production.service.selection.requirements.details.custom.label'],
              key: 'menu.production.service.selection.requirements.details.custom.label'
            }
          ]
        },
        {
          name: t['menu.production.service.selection.check'],
          key: 'menu.production.service.selection.check',
          icon: <IconCalendar key={'menu.production.service.selection.check'} />
        }
      ]
    },
    {
      name: t['menu.production.service.selection.overview'],
      key: 'menu.production.service.selection.overview',
      icon: <IconNav key={'menu.production.service.selection.overview'} />
    }
  ];
  const getItemBadge = (key: string) => {
    // eslint-disable-next-line no-console
    console.log(key);
    if (state.stepList.length > 0 && state.stepList.includes(key)) {
      // eslint-disable-next-line no-console
      console.log('kjhhhh');
      return <Badge className={styles['menu-item']} status='success' />;
    }
    return <></>;
  };

  const getMenuItem = (key: MenuItemProps) => {
    return (<>
      {getItemBadge(key.key)}
      {key.icon}
      {key.name}
    </>);
  };

  const getMenu = (item: MenuItemProps[] | MenuItemProps) => {

    if (item instanceof Array) {
      const menu = [];
      item.forEach((i) => {
        if (i.child != null) {
          menu.push(
            <SubMenu key={i.key} title={
              getMenuItem(i)
            }>
              {getMenu(i.child)}
            </SubMenu>
          );
        } else {
          menu.push(<MenuItem key={i.key}> {
            getMenuItem(i)
          }</MenuItem>);
        }
      });
      return menu;
    } else {
      return <MenuItem key={item.key}> {getMenuItem(item)}</MenuItem>;
    }

  };
  return <div className={styles['menu-demo-round']}>

    <Menu style={{ width: 200 }}
          hasCollapseButton
          levelIndent={12}
          onClickMenuItem={updateMenuKey}>
      {getMenu(MenuTree)}
    </Menu></div>;
}
