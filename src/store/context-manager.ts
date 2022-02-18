import React from 'react';
import { RoleItem } from '@/pages/user/role/message-list/item';

export interface InitialRole {
  roleId: string;
  roleInfo?: RoleItem;
  roleList?: RoleItem[];
  permission?: any;
  update: boolean;
}

export const RoleContext = React.createContext(null);

export const initialRole: InitialRole = {
  roleId: '',
  update: false
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
    case 'RoleList': {
      const roleList = action.payload;
      return {
        ...state,
        roleList
      };
    }

    case 'Permission': {
      const permission = action.payload;
      return {
        ...state,
        permission
      };
    }

    case 'Update': {
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


export const ProductDemandContext = React.createContext(null);

export interface InitialProductDemand {
  stepKey: string,
  stepList: string[] | [],
  stepRouter: string
}

export const initialProductDemand: InitialProductDemand = {
  stepKey: '',
  stepList: [],
  stepRouter: ''
};

export function ProductDemandStore(state: InitialProductDemand, action) {
  switch (action.type) {
    case 'StepKey': {
      const stepKey = action.payload;
      return {
        ...state,
        stepKey
      };
    }
    case 'StepRouter': {
      const stepRouter = action.payload;
      return {
        ...state,
        stepRouter
      };
    }
    case 'StepList': {
      const step = action.payload;
      const stepList: string[] = state.stepList;
      stepList.push(step);
      return {
        ...state,
        stepList
      };
    }

    default:
      return state;
  }
}
