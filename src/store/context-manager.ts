import React from "react";
import { RoleItem } from "@/components/type";

export interface InitialRole {
  roleId: string;
  roleInfo?: RoleItem;
  roleList?: RoleItem[];
  permission?: any;
  update: boolean;
}

export const RoleContext = React.createContext(null);

export const initialRole: InitialRole = {
  roleId: "",
  update: false
};

export default function RoleStore(state: InitialRole, action) {
  switch (action.type) {
    case "RoleId": {
      const roleId = action.payload;
      return {
        ...state,
        roleId
      };
    }
    case "RoleInfo": {
      const roleInfo = action.payload;
      return {
        ...state,
        roleInfo
      };
    }
    case "RoleList": {
      const roleList = action.payload;
      return {
        ...state,
        roleList
      };
    }

    case "Permission": {
      const permission = action.payload;
      return {
        ...state,
        permission
      };
    }

    case "Update": {
      const update = action.payload;
      return {
        ...state,
        update
      };
    }
    default:
      return state;
  }
}

