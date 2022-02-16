import React from 'react';
import { MenuItemProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { Menu } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { IconCalendar, IconMindMapping, IconNav, IconSubscribed } from '@arco-design/web-react/icon';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function ProductMenu() {
  const t = useLocale();
  const MenuTree: MenuItemProps[] = [
    {
      name: t['menu.hardware.selection'],
      key: 'menu.hardware.selection',
      icon: <IconMindMapping />
    },
    {
      name: t['menu.production.service.selection'],
      key: 'menu.production.service.selection',
      icon: <IconSubscribed />,
      child: [
        {
          name: t['menu.production.service.selection.title'],
          key: 'menu.production.service.selection.title',
          icon: <IconCalendar />
        },
        {
          name: t['menu.production.service.selection.requirements.details'],
          key: 'menu.production.service.selection.requirements.details',
          icon: <IconCalendar />,
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
          icon: <IconCalendar />
        }
      ]
    },
    {
      name: t['menu.production.service.selection.overview'],
      key: 'menu.production.service.selection.overview',
      icon: <IconNav />
    }
  ];

  const getMenu = (item: MenuItemProps[] | MenuItemProps) => {

    if (item instanceof Array) {
      const menu = [];
      item.forEach((i) => {
        if (i.child != null) {
          menu.push(
            <SubMenu key={i.key} title={[i.icon, i.name]}>
              {getMenu(i.child)}
            </SubMenu>
          );
        } else {
          menu.push(<MenuItem key={i.key}> {[i.icon, i.name]}</MenuItem>);
        }
      });
      return menu;
    } else {
      return <MenuItem key={item.key}> {[item.icon, item.name]}</MenuItem>;
    }

  };
  return <div className={styles['menu-demo-round']}>

    <Menu style={{ width: 200 }} hasCollapseButton>
      {getMenu(MenuTree)}
    </Menu></div>;
}
