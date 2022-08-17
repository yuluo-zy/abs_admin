import React, { useMemo } from "react";
import { GlobalState } from "@/store";
import { useSelector } from "react-redux";
import authentication, { AuthParams } from "@/utils/authentication";

type PermissionWrapperProps = AuthParams & {
  is_role?: boolean
};

// 权限hook 用来判断是否具有对应的权限或者角色
export const usePermissionWrapper = (
  props: PermissionWrapperProps
) => {

  const { is_role, requiredPermissions, oneOfPerm } = props;
  const userInfo = useSelector((state: GlobalState) => state.userInfo);

  return useMemo(() => {
    return () => {
      if (!!is_role) {
        // todo 根据角色信息进行内容判断
      }
      // 进行账户认证操作
      return authentication(
        { requiredPermissions, oneOfPerm },
        userInfo.permissions
      );
    };
  }, [userInfo.permissions]);

};

