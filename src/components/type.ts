import { RulesProps } from "@arco-design/web-react";
import { AxiosResponse } from "axios";
import { Data } from "@/utils/httpRequest";
import React from "react";

export type Recordable<T = any> = Record<string, T>;
export type Ref = HTMLElement
export type Props = Recordable
export type ReadonlyRecordable<T = any> = Readonly<Record<string, T>>;

export interface CallBackHandle {
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  data?: any;
}

export interface FormItemProps {
  label?: string;
  type:
    | "input"
    | "select"
    | "date"
    | "multiple"
    | "rate"
    | "password"
    | "number"
    | "text"
    | "tree"
    | "cascader"
    | "upload"
    | "self";
  onChange?: () => void;
  field: string;
  options?: any;
  rules?: RulesProps[];
  placeholder?: string;
  required?: boolean;
  labelCol?: Recordable | number;
  node?: any;
  limit?: number;
  header?: string;
  loading?: boolean;
  style?: any;
}

export interface FormList {
  field: string,
  fieldList: FormItemProps[],
  styles?: any,
  fieldLabel?: any
  limit?: number
}

export interface FormProps {
  title: string;
  formItemLayout?: Recordable;
  formData?: any;
  data?: Recordable;
  onValuesChange?: () => void;
  formItem?: Array<FormItemProps>;
  onSubmit?: (value) => void;
  onRest?: () => void;
  col?: number | number[];
  className?: string | string[];
  children?: any;
  style?: any;
  layout?: "horizontal" | "vertical" | "inline";
  formList?: FormList;
}

export interface TreeProps {
  title?: string;
  data?: any;
  className?: string | string[];
  children?: any;
  checkedKeys: string[];
  ref?: any;
}

export interface SearchItem extends FormItemProps {
  name: string;
}

export interface ModeProps {
  title: string;
  visible?: boolean;
  confirmLoading?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: boolean;
  children: any;
}

export interface DynamicCardProps {
  title?: string;
  help?: string;
  children: any;
  headerStyle?: any;
  bodyStyle?: any;
  style?: any;
  className?: any;
}

export interface ListProps {
  name?: string;
  fetchRemoteData: (props) => Promise<AxiosResponse<Data>>;
  add?: (props) => React.ReactNode;
  addName?: string;
  download: boolean;
  upload: boolean;
  getColumns: (callback: () => void) => any;
  select?: boolean;
  selectItem?: Array<SearchItem>;
  onChange?: boolean;
  size?: "mini" | "small" | "default" | "middle";
  rowSelection?: any;
  tools?: any;
}

export interface MenuItemProps {
  name: string;
  key: string;
  icon?: any;
  path?: string;
  show?: boolean;
  value?: number;
  child?: MenuItemProps | MenuItemProps[];
}

export interface RoleItem {
  id?: string;
  role?: string;
  name?: string;
  description?: string;
  status?: number;
  permissionIds?: Array<number>;
}

export interface MessageItemProps {
  data: RoleItem;
}

export interface UserToken {
  token: string;
  username: string;
}

export interface ProductSelectItem {
  name: string,
  type: string,
  select: string[] | []
}

export interface ManageMenuProps {
  name: string;
  onChange?: (item) => void;
}
