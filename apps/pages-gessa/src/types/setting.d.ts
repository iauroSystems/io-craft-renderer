interface ISettings {
  layout?: string;
  showHeader: boolean;
}

type SettingContextType = {
  settings: ISettings;
  setSettings: (setting: ISettings) => void;
};
