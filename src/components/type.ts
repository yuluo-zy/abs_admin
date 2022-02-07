import { RulesProps } from '@arco-design/web-react';
import { AxiosResponse } from 'axios';
import { Data } from '@/utils/httpRequest';
import React from 'react';

export type Recordable<T = never> = Record<string, T>;

export type ReadonlyRecordable<T = never> = Readonly<Record<string, T>>;

export interface CallBackHandle {
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

export interface FormItemProps {
  label?: string,
  type: "input" | "select" | "date" | "multiple" | "rate",
  onChange?: () => void,
  field: string,
  options?: Array<ReadonlyRecordable | string>,
  rules?: RulesProps[],
  placeholder?: string
  node?: never
}

export interface FormProps {
  formItemLayout?: never,
  form?: never
  onValuesChange: () => void,
  formItem: Array<FormItemProps>
  onSubmit: (value) => void
  onRest?: () => void
}

export interface SearchItem extends FormItemProps {
  name: string,
}

export interface ModeProps {
  title: string
  visible: boolean,
  confirmLoading: boolean,
  onCancel: () => void,
  onOk: () => void,
  footer: boolean
  children: never
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
  addCancel?: () => void
  select?: boolean
  selectItem?: Array<SearchItem>
}
