import type { SettingName } from "../appSettings";
import { DEFAULT_SETTINGS } from "../appSettings";

import * as React from "react";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type SettingsContextShape = {
  setOption: (name: SettingName, value: boolean) => void;
  settings: Record<SettingName, boolean>;
};

const Context: React.Context<SettingsContextShape> = createContext({
  setOption: (name: SettingName, value: boolean) => {
    return;
  },
  settings: DEFAULT_SETTINGS,
});

export const SettingsContext = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  // 学习 到一种使用 react context的 方式

  // 缓存函数内容
  const setOption = useCallback((setting: SettingName, value: boolean) => {
    // 通过函数式更新返回新的 state
    // 一般操作state，因为涉及到 state 的状态合并，
    // react 认为当你在事件绑定中操作 state 是非常频繁的，
    // 所以为了节约性能 react 会把多次 setState 进行合并为一次，最后在一次性的更新 state
    // 为了避免 异步操作多次操作而不生效的问题
    setSettings((options) => ({
      ...options,
      [setting as string]: value,
    }));
    if (DEFAULT_SETTINGS[setting] === value) {
      setURLParam(setting, null);
    } else {
      setURLParam(setting, value);
    }
  }, []);

  const contextValue = useMemo(() => {
    return {setOption, settings};
  }, [setOption, settings]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useSettings = (): SettingsContextShape => {
  // useContext 方法接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
  return useContext(Context);
};

function setURLParam(param: SettingName, value: null | boolean) {
  // 设置 url 的查询参数
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (value !== null) {
    if (params.has(param)) {
      params.set(param, String(value));
    } else {
      params.append(param, String(value));
    }
  } else {
    if (params.has(param)) {
      params.delete(param);
    }
  }
  url.search = params.toString();
  window.history.pushState(null, '', url.toString());
}
