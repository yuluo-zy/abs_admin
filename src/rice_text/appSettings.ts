export type SettingName =
  | 'disableBeforeInput'
  | 'isRichText'
  | 'isCharLimit'
  | 'isMaxLength'
  | 'isCharLimitUtf8'
  | 'emptyEditor'
  | 'onlyRead';

export type Settings = Record<SettingName, boolean>;

export const DEFAULT_SETTINGS: Settings = {
  disableBeforeInput: false,
  emptyEditor: true,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: true,
  onlyRead: false,
  isRichText: true,
};
