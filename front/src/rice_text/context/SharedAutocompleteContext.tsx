import * as React from "react";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Suggestion = null | string;
type CallbackFn = (newSuggestion: Suggestion) => void;
type SubscribeFn = (callbackFn: CallbackFn) => () => void;
type PublishFn = (newSuggestion: Suggestion) => void;
type ContextShape = [SubscribeFn, PublishFn];
type HookShape = [suggestion: Suggestion, setSuggestion: PublishFn];
// 一个订阅发布机制
const Context: React.Context<ContextShape> = createContext([
  (_cb) => () => {
    return;
  },
  (_newSuggestion: Suggestion) => {
    return;
  }
]);

export const SharedAutocompleteContext = ({
                                            children
                                          }: {
  children: ReactNode;
}): JSX.Element => {
  const context: ContextShape = useMemo(() => {
    let suggestion: Suggestion | null = null;
    const listeners: Set<CallbackFn> = new Set();
    return [
      (cb: (newSuggestion: Suggestion) => void) => {
        cb(suggestion);
        listeners.add(cb);
        return () => {
          listeners.delete(cb);
        };
      },
      (newSuggestion: Suggestion) => {
        suggestion = newSuggestion;
        for (const listener of listeners) {
          listener(newSuggestion);
        }
      }
    ];
  }, []);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useSharedAutocompleteContext = (): HookShape => {
  const [subscribe, publish]: ContextShape = useContext(Context);
  const [suggestion, setSuggestion] = useState<Suggestion>(null);
  useEffect(() => {
    return subscribe((newSuggestion: Suggestion) => {
      setSuggestion(newSuggestion);
    });
    // 回调
  }, [subscribe]);
  return [suggestion, publish];
};
