import {CssBaseline} from '@mui/material';
import {StyledEngineProvider} from '@mui/material/styles';
import {useEffect} from 'react';
import {
    AuthProvider,
    MicroFrontendProvider,
    ReduxProvider,
    RouteProvider,
    SettingProvider,
    ThemeProvider,
} from '../context';
import Intermediate from './intermediate';

export interface IAppProps {
    pageId: string;
    themeObject: any;
}

export function App(props: any) {
    if (process.env.NODE_ENV !== 'development') {
        console.log = () => {
        };
    }

    useEffect(() => {
    }, [props]);
    return (
        <MicroFrontendProvider>
            <ReduxProvider>
                <ThemeProvider {...{name: 'vishal'}}>
                    <SettingProvider>
                        <AuthProvider>
                            <RouteProvider>
                                <StyledEngineProvider injectFirst>
                                    <CssBaseline/>
                                    <Intermediate
                                        page_id={JSON.parse(JSON.stringify(props)).pageId}
                                    />
                                </StyledEngineProvider>
                            </RouteProvider>
                        </AuthProvider>
                    </SettingProvider>
                </ThemeProvider>
            </ReduxProvider>
        </MicroFrontendProvider>
    );
}

export default App;
