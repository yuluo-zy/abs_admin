import type { SettingName } from "../appSettings";
import { DEFAULT_FUNCTION, DEFAULT_SETTINGS, FunctionName, Functions } from "../appSettings";

import * as React from "react";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type FunctionContextShape = {
  setFunction: (name: FunctionName, value: any) => void;
  functions: Functions;
};
const _FunctionsContext: React.Context<FunctionContextShape> = createContext({
  setFunction: (name: FunctionName, value: any) => {
  },
  functions: DEFAULT_FUNCTION
});

export const FunctionsContext = ({
                                   children,
                                   defaultFunction
                                 }: { children: ReactNode, defaultFunction: Record<string, any> }): JSX.Element => {
  const [functions, setData] = useState({
    ...DEFAULT_FUNCTION,
    ...defaultFunction
  });
  const setFunction = useCallback((name: FunctionName, value: any) => {
    setData((options) => {
      return {
        ...options,
        [name as string]: value
      };
    });
  }, []);

  const contextValue = useMemo(() => {
    return { setFunction, functions };
  }, [setFunction, functions]);

  return <_FunctionsContext.Provider value={contextValue}>{children}</_FunctionsContext.Provider>;
};
export const useFunctions = (): FunctionContextShape => {
  // useContext 方法接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
  return useContext(_FunctionsContext);
};

type SettingsContextShape = {
  setOption: (name: SettingName, value: boolean) => void;
  settings: Record<SettingName, boolean>;
};

const Context: React.Context<SettingsContextShape> = createContext({
  setOption: (name: SettingName, value: boolean) => {
    return;
  },
  settings: DEFAULT_SETTINGS
});

export const SettingsContext = ({
                                  children
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
      [setting as string]: value
    }));
    if (DEFAULT_SETTINGS[setting] === value) {
      setURLParam(setting, null);
    } else {
      setURLParam(setting, value);
    }
  }, []);

  const contextValue = useMemo(() => {
    return { setOption, settings };
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
  window.history.pushState(null, "", url.toString());
}
