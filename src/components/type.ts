import { RulesProps } from "@arco-design/web-react";

export type Recordable<T = any> = Record<string, T>;

export type ReadonlyRecordable<T = any> = Readonly<Record<string, T>>;

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
  onSubmit: () => void
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
  formItem: Array<SearchItem>
}
