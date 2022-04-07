import React from 'react';
import { ReadonlyRecordable, RoleItem } from '@/components/type';

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
  update: false,
};

export default function RoleStore(state: InitialRole, action) {
  switch (action.type) {
    case 'RoleId': {
      const roleId = action.payload;
      return {
        ...state,
        roleId,
      };
    }
    case 'RoleInfo': {
      const roleInfo = action.payload;
      return {
        ...state,
        roleInfo,
      };
    }
    case 'RoleList': {
      const roleList = action.payload;
      return {
        ...state,
        roleList,
      };
    }

    case 'Permission': {
      const permission = action.payload;
      return {
        ...state,
        permission,
      };
    }

    case 'Update': {
      const update = action.payload;
      return {
        ...state,
        update,
      };
    }
    default:
      return state;
  }
}

export const ProductDemandContext = React.createContext(null);

export interface InitialProductDemand {
  stepKey: string;
  stepList: string[] | [];
  stepRouter: string;
  moduleInfo?: ReadonlyRecordable;
  collapse: boolean;
  demandId: number;
}

export const initialProductDemand: InitialProductDemand = {
  // 设置当前的菜单 key
  stepKey: '',
  stepList: [],
  stepRouter: '',
  moduleInfo: {},
  // 设置是否收起当前的菜单
  collapse: true,
  demandId: null
};

export function ProductDemandStore(state: InitialProductDemand, action) {
  switch (action.type) {
    case 'StepKey': {
      const stepKey = action.payload;
      return {
        ...state,
        stepKey,
      };
    }
    case 'StepRouter': {
      const stepRouter = action.payload;
      return {
        ...state,
        stepRouter,
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

    case 'ModuleInfo': {
      const moduleInfo = action.payload;
      return {
        ...state,
        moduleInfo
      };
    }

    case 'Collapse':
      // 设置是否收起菜单
      const collapse = action.payload;
      return {
        ...state,
        collapse
      };

    case 'DemandId':
      // 设置需求条目 Id
      const demandId = action.payload;
      return {
        ...state,
        demandId
      };

    default:
      return state;
  }
}
