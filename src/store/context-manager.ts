import React from 'react';

export interface InitialRole {
  roleId: string;
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

    default:
      return state;
  }
}

