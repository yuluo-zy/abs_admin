import { RulesProps } from '@arco-design/web-react';
import { AxiosResponse } from 'axios';
import { Data } from '@/utils/httpRequest';
import React from 'react';

export type Recordable<T = any> = Record<string, T>;

export type ReadonlyRecordable<T = any> = Readonly<Record<string, T>>;

export interface CallBackHandle {
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

export interface FormItemProps {
  label?: string,
  type: 'input' |
    'select' |
    'date' |
    'multiple' |
    'rate' |
    'password',
  onChange?: () => void,
  field: string,
  options?: Array<ReadonlyRecordable | string>,
  rules?: RulesProps[],
  placeholder?: string,
  required?: boolean,
  node?: never
}

export interface FormProps {
  title: string,
  formItemLayout?: Recordable,
  form?: any,
  // 这里的数据是说明这是预填充数据
  data?: Recordable
  onValuesChange?: () => void,
  formItem: Array<FormItemProps>
  onSubmit: (value) => void
  onRest?: () => void
}

export interface SearchItem extends FormItemProps {
  name: string,
}

export interface ModeProps {
  title: string
  visible?: boolean,
  confirmLoading?: boolean,
  onCancel?: () => void,
  onOk?: () => void,
  footer?: boolean
  children: any
}

export interface DynamicCardProps {
  title: string;
  children: any;
}

export interface ListProps {
  name: string,
  fetchRemoteData: (props) => Promise<AxiosResponse<Data>>,
  add?: (props) => React.ReactNode,
  addName?: string,
  download: boolean,
  upload: boolean,
  getColumns: (callback: () => void) => any
  select?: boolean
  selectItem?: Array<SearchItem>
}
