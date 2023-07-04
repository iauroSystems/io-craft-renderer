import { createContext, useState, FC, ReactNode, useContext } from 'react';

const initValue = {
  settings: { layout: 'classic-ltr', showHeader: true },
  setSettings: () => '',
};
export const SettingContext = createContext<SettingContextType>(initValue);

export const SettingProvider: FC<ReactNode> | any = ({ children }: any) => {
  const [settings, setSettings] = useState<ISettings>({
    layout: 'default',
    showHeader: true,
  });

  return (
    <SettingContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
