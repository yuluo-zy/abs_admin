import create from "zustand";

export const HelpSetting = create(() => ({
  helpKey: ""
}));

export const setHelpKey = (helpKey) => HelpSetting.setState({ helpKey });
