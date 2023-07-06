import {createContext, FC, ReactNode, useContext, useState} from 'react';

export const ConfigFormContext = createContext<any>(null);

export const ConfigFormProvider: FC<ReactNode> = ({children}: any) => {
    const [formConfig, setFormConfig] = useState<any>({});

    return (
        <ConfigFormContext.Provider value={{formConfig, setFormConfig}}>
            {children}
        </ConfigFormContext.Provider>
    );
};

export const useConfigForm = () => useContext(ConfigFormContext);

export default ConfigFormProvider;
