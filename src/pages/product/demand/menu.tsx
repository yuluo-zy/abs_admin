import React, { useContext } from 'react';
import { MenuItemProps } from '@/components/type';
import { Badge, Menu } from '@arco-design/web-react';
import styles from './style/index.module.less';
import  ProductStore  from "@/store/product";
import shallow from "zustand/shallow";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function ProductMenu(props) {
  const { menu, clickMenuItem } = props;
  const [setStepKey, stepList, collapse] = ProductStore(state => [state.setStepKey, state.stepList, state.collapse], shallow)

  const updateMenuKey = (key: string) => {
    setStepKey(key)
    clickMenuItem(key);
  };

  const getItemBadge = (key: string) => {
    if (stepList.length > 0 && stepList.includes(key)) {
      return <Badge className={styles['menu-item']} status="success" />;
    }
    return <></>;
  };

  const getMenuItem = (key: MenuItemProps) => {
    return (
      <>
        {getItemBadge(key.key)}
        {key.icon}
        {key.name}
      </>
    );
  };

  const getMenu = (item: MenuItemProps[] | MenuItemProps) => {
    if (item instanceof Array) {
      const menu = [];
      item.forEach((i) => {
        if (i.child != null) {
          menu.push(
            <SubMenu key={i.key} title={getMenuItem(i)}>
              {getMenu(i.child)}
            </SubMenu>
          );
        } else {
          menu.push(<MenuItem key={i.key}> {getMenuItem(i)}</MenuItem>);
        }
      });
      return menu;
    } else {
      return <MenuItem key={item.key}> {getMenuItem(item)}</MenuItem>;
    }
  };
  return (
    <div className={styles['menu-demo-round']}>
      <Menu
        style={{ width: 200 }}
        hasCollapseButton
        autoOpen
        levelIndent={12}
        collapse={collapse}
        onClickMenuItem={updateMenuKey}
      >
        {getMenu(menu)}
      </Menu>
    </div>
  );
}
