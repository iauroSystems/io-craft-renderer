import {HeaderComponent} from '@iocraft/component-library';
import {Box, Stack} from '@mui/material';
import keycloak from 'apps/pages-gessa/src/keycloak/keycloak';
import {IRootState} from 'apps/pages-gessa/src/store';
import themes from 'apps/pages-gessa/src/theme';
import {clearLocalStorage, getLocalStorage, setLocalStorage,} from 'apps/pages-gessa/src/utils/localStorageService';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate, useParams, useSearchParams,} from 'react-router-dom';
import {useAppDispatch} from '../../../context/redux';
import CustomSnackbar from '../../components/CustomSnackbar';
import AppLayout from '../../layouts/AppLayout';
import SideNav from './SideNav';
import {selectActiveMenuName, selectAllSortedMenuById, setSortedMenus,} from './store/sortedMenuSlice';

export function Project() {
    const params: any = useParams();
    const theme = themes.default;
    const rootState = useSelector((state: IRootState) => state);

    const [widgetData, setWidgetData] = useState([]);
    const sortedMenus = selectAllSortedMenuById(rootState) || [];
    const [appMenu, setAppMenu]: any = useState();
    const [isClicked, setClicked]: any = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string>(params.menuId || '');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const _userInfo = getLocalStorage('userInfo');
    const menus = getLocalStorage('navigatedMenus');
    const [sortedData, setSortedData] = useState<any>([]);
    const _selectedMenuName = selectActiveMenuName(rootState);
    const [snackData, setSnackData]: any = useState({
        open: false,
        msg: '',
        duration: 0,
        severity: 'info',
    });

    useEffect(() => {
        if (menus) {
            const obj = JSON.parse(JSON.stringify(menus));
            dispatch(setSortedMenus(obj));
        }
    }, []);
    const onHideSnackBar = useCallback(() => {
        setSnackData({
            msg: '',
            open: false,
            severity: 'info',
            duration: 0,
        });
    }, []);

    useEffect(() => {
        if (sortedMenus && sortedMenus.length > 0) {
            setSortedData(sortedMenus[0].data);
        }
    }, [sortedMenus]);

    useEffect(() => {
        if (params && params.projectId) {
            const userInfo = {
                ..._userInfo,
                ...{projectId: params.projectId},
            };
            setLocalStorage('userInfo', userInfo);
        }
    }, [params]);
    const location = useLocation();
    const headerComponentProps = {
        logoImagePath:
            'https://gessa-fileservice.s3.eu-central-1.amazonaws.com/Logo.svg',
        searchData: {
            label: 'Search',
            placeholder: 'Search',
            value: '',
        },
        headerBackgroundColor: themes.default.palette?.background?.bacopWhite,

        notificationData: {
            name: 'Notification_24dp',
            size: 25,
            color: themes.default.palette?.neutral?.neu400,
            label: 'notification',
        },
        chartProps: {
            background_color: themes.default.palette?.background?.bacopWhite,
            border_color: themes.default.palette?.neutral?.neu100,
        },

        userData: {
            text: _userInfo.userName,
            email: _userInfo.email || '',
            image:
                'https://gessa-fileservice.s3.eu-central-1.amazonaws.com/userCircle_Filled.svg',
        },
    };

    const urlParams = useParams();
    const menuName: any = useMemo(() => {
        let menuChild: any[] = [];
        const menu = urlParams['*']?.split('/')?.[1];
        if (selectedMenu) {
            appMenu?.forEach((item: any, index: any) => {
                if (
                    item.data.name === selectedMenu ||
                    item.data.name === params.menuId
                ) {
                    menuChild = item.child;
                }
            });
        }
        return {menu, menuChild};
    }, [appMenu, urlParams, params]);

    useEffect(() => {
    }, [appMenu]);

    const logoutUser = (data?: any): any => {
        clearLocalStorage();
        keycloak.logout();
    };

    useEffect(() => {
        setInterval(() => {
            try {
                const logoutSession = getLocalStorage('logout');
                if (logoutSession && logoutSession === true) {
                    setLocalStorage('logout', false);
                    handleKeycloakLogout();
                }
            } catch (err: any) {
            }
        }, 200);
    }, []);
    const handleKeycloakLogout = () => {
        navigate(`/project/${params.projectId}`);
        clearLocalStorage();

        keycloak.logout().then(() => {
        });
    };

    return (
        <Box
            sx={{
                background: theme.palette?.background?.bacopWhite,
                overflow: 'hidden !important',
            }}
        >
            <HeaderComponent
                logoImagePath={headerComponentProps.logoImagePath || 'NA'}
                searchData={headerComponentProps.searchData}
                notificationData={headerComponentProps.notificationData}
                userData={headerComponentProps.userData}
                headerBackgroundColor={headerComponentProps.headerBackgroundColor}
                chartProps={headerComponentProps.chartProps}
                logoutClickAction={(e: any) => {
                    logoutUser(e);
                }}
            />
            <Stack direction="row">
                <Box
                    sx={{
                        width: '84px',
                        height: '93vh',
                        justifyContent: 'center',
                        display: 'flex',
                        background: theme.palette?.background?.bacopWhite,
                        borderRight: `1px solid ${theme.palette?.neutral?.neu100}`,
                    }}
                >
                    <Stack direction="column">
                        <SideNav
                            menuList={sortedData}
                            selectedMenuName={selectedMenu}
                            setSelectedMenuName={(data: any) => {
                                setSelectedMenu(data);
                            }}
                        />
                    </Stack>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden',
                    }}
                >
                    <AppLayout/>
                </Box>
            </Stack>
            <CustomSnackbar
                msg={snackData.msg}
                open={snackData.open}
                onClose={onHideSnackBar}
                duration={snackData.duration}
                severity={snackData.severity}
            />
        </Box>
    );
}

export default memo(Project);
