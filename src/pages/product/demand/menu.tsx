import React, { useEffect, useState } from 'react';
import { MenuItemProps } from '@/components/type';
import { Menu } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { ProductMenuInfo, ProductStore } from '@/store/product';
import shallow from 'zustand/shallow';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function ProductMenu(props) {
  const {clickMenuItem } = props;
  const [setStepKey] = ProductStore(state => [state.setStepKey], shallow)
  const [serviceType] = ProductStore(state => [state.serviceType], shallow);
  const menu = ProductMenuInfo(state => state.menu)
  const updateMenuKey = (key: string) => {
    setStepKey(key)
    clickMenuItem(key);
  };
  const getMenuItem = (key: MenuItemProps) => {
    return (
      <>
        {/*{getItemBadge(key.key)}*/}
        {key.icon}
        {key.name}
      </>
    );
  };
  const getMenuInfo = (item: MenuItemProps[] | MenuItemProps, list: number[]) => {
    if (item instanceof Array) {
      item.forEach((i) => {
        if (i.child != null) {
          getMenuInfo(i.child, list)
        } else {
          getMenuInfo(i, list)
        }

      });
    } else {
      if(list.includes(item.value)){
        item.show = true
      } else if(item.show != null){
        item.show = false
      }
    }
    return item
  };

  const getMenu = (item: MenuItemProps[] | MenuItemProps) => {
    if (item instanceof Array) {
      const menu = [];
      item.forEach((i) => {
        if (i.child != null) {
          menu.push(
            <SubMenu key={i.key} title={getMenuItem(i)} selectable={true}>
              {getMenu(i.child)}
            </SubMenu>
          );
        } else {
          if(i.show != false){
          menu.push(<MenuItem key={i.key}> {getMenuItem(i)}</MenuItem>);
          }
        }
      });
      return menu;
    } else {
      if(item.show != false){
        return <MenuItem key={item.key}> {getMenuItem(item)}</MenuItem>;
      }
    }
  };

  const [context, setContext] = useState()

  useEffect(() => {
    console.log("重新渲染")
    const temp = getMenuInfo(menu, serviceType)
     // @ts-ignore
    setContext(getMenu([...temp]));
     return null
  }, [menu,serviceType])

  return <div className={styles['menu-demo-round']}>
    <Menu
      style={{ width: 170 }}
      hasCollapseButton
      autoOpen
      levelIndent={30}
      collapse={false}
      selectable={true}
      onClickMenuItem={updateMenuKey}
    >
      {context}
    </Menu>
  </div>
}
