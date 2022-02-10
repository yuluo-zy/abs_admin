import React from 'react';
import { RoleItem } from '@/pages/user/role/message-list/item';

export interface InitialRole {
  roleId: string;
  roleInfo?: RoleItem;
}

export const RoleContext = React.createContext(null);

export const initialRole: InitialRole = {
  roleId: ''
};

export default function RoleStore(state: InitialRole, action) {
  switch (action.type) {
    case 'RoleId': {
      const roleId = action.payload;
      return {
        ...state,
        roleId
      };
    }
    case 'RoleInfo': {
      const roleInfo = action.payload;
      return {
        ...state,
        roleInfo
      };
    }
    default:
      return state;
  }
}

