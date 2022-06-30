import React, { useEffect, useState } from "react";
import { MenuItemProps } from "@/components/type";
import { Menu } from "@arco-design/web-react";
import styles from "./style/index.module.less";
import { ProductMenuInfo, ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { useDebounce, useWindowSize } from "react-use";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function ProductMenu(props) {
  const { clickMenuItem } = props;
  const [setStepKey, collapse, setCollapse] = ProductStore(state => [state.setStepKey, state.collapse, state.setCollapse], shallow);
  const [serviceType] = ProductStore(state => [state.serviceType], shallow);
  const menu = ProductMenuInfo(state => state.menu);
  const updateMenuKey = (key: string) => {
    setStepKey(key);
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
          getMenuInfo(i.child, list);
        } else {
          getMenuInfo(i, list);
        }

      });
    } else {
      if (list.includes(item.value)) {
        item.show = true;
      } else if (item.show != null) {
        item.show = false;
      }
    }
    return item;
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
          if (i.show != false) {
            menu.push(<MenuItem key={i.key}> {getMenuItem(i)}</MenuItem>);
          }
        }
      });
      return menu;
    } else {
      if (item.show != false) {
        return <MenuItem key={item.key}> {getMenuItem(item)}</MenuItem>;
      }
    }
  };

  const [context, setContext] = useState();

  useEffect(() => {
    const temp = getMenuInfo(menu, serviceType);
    // @ts-ignore
    setContext(getMenu([...temp]));
    return null;
  }, [menu, serviceType]);

  // 设置 窗口监测 如果小于 1200px, 设置收起
  const {width} = useWindowSize();
  const [, cancel] = useDebounce(
    () => {
      if(width < 1300){
        setCollapse(true)
      }
    },
    1000,
    [width]
  );

  return <div className={styles['menu-demo-round']}>
    <Menu
      style={{ width: 170 }}
      hasCollapseButton
      autoOpen
      levelIndent={30}
      collapse={collapse}
      selectable={true}
      onClickMenuItem={updateMenuKey}
      onCollapseChange={(value) => {
        setCollapse(value);
        }
      }
    >
      {context}
    </Menu>
  </div>;
}
