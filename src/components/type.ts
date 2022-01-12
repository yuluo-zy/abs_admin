import { RulesProps } from '@arco-design/web-react';

export interface CallBackHandle {
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

export interface SearchItem {
  name: string,
  field: string,
  type: 'input' | 'select' | 'date' | 'multiple',
  options?: Array<string>,
  rules?: RulesProps[]
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
