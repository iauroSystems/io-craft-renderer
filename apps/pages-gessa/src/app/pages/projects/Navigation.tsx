// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {Box, ClickAwayListener, Divider, Typography} from '@mui/material';
import {useTheme} from '@mui/system';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {IconComponent} from '@iocraft/component-library';
import {useParams} from 'react-router';
import {CustomTreeviewIcon} from './CustomTreeviewIcon';

interface NavigObject {
    menuName: string;
    slectIcon: string;
    connectPage: string;
}

export const Navigation = (props: any) => {
    const [isPreview, setIsPreview] = useState(false);
    const param = useParams();
    const [loader, setLoader] = useState(false);
    const [treeData, setTreeData] = useState<any>();
    const [appMenu, setAppMenu]: any = useState();
    const [showTextBox, setShowTextBox] = useState(false);
    const [textFieldData, settextFieldData] = useState('');
    const [deleteNodeId, setDeleteNodeId] = useState([]);
    const [pageId, setPageId] = useState('');
    const [pageName, setPageName] = useState('');
    const [menu, setMenu] = useState<any>([]);
    const [snackData, setSnackData]: any = useState({
        open: false,
        msg: '',
        duration: 3000,
        severity: 'info',
    });

    const [snack, setSnack] = useState<{
        open: boolean;
        type: string;
        message: string;
    }>({
        open: false,
        type: 'success',
        message: 'default_message',
    });
    const [height, setHeight] = useState(0);
    const ref: any = useRef();
    const PageList: any = [];

    const theme = useTheme();
    const [navigationObject, setNavigationObject] = useState<NavigObject>({
        menuName: '',
        slectIcon: '',
        connectPage: '',
    });

    useEffect(() => {
        if (treeData?.pageId !== '') {
            PageList.map((name1: any) => {
                if (name1.value === treeData?.pageId) {
                    setPageName(name1.label);
                }
            });
        } else {
            setPageName('');
        }
        if (treeData) {
            setNavigationObject({
                menuName: treeData.name,
                slectIcon: treeData.icon,
                connectPage: pageName,
            });
        }
    }, [treeData, pageName]);

    useEffect(() => {
        if (navigationObject.connectPage !== '') {
            PageList.map((name1: any) => {
                if (name1.label === navigationObject.connectPage) {
                    setPageId(name1.value);
                }
            });
        }
    }, [navigationObject.connectPage]);

    const OnSaveHandler = () => {
        setLoader(true);
        const Payload = {
            id: treeData._id,
            data: {
                name: navigationObject.menuName,
                pageId: navigationObject.connectPage === '' ? '' : pageId,
                localName: '',
                description: '',
                localDescription: '',
                icon: navigationObject.slectIcon,
                parentId: treeData.parentId,
                authorization: [
                    {
                        res: '',
                        scope: '',
                        roles: 'test',
                    },
                ],
            },
        };
        setShowTextBox(false);
    };

    function cancleHandler() {
        setNavigationObject({
            menuName: '',
            slectIcon: '',
            connectPage: '',
        });
    }

    function validateText() {
        return true;
    }

    const OnEnterHandler = (e: any) => {
        const Payload = {
            name: textFieldData.trim(),
            pageId: '',
            localName: '',
            description: '',
            localDescription: '',
            icon: '',
            parentId: '',
            authorization: [
                {
                    res: '',
                    scope: '',
                    roles: 'test',
                },
            ],
        };
        if (e.key === 'Enter') {
            if (validateText()) {
                setLoader(true);
                setShowTextBox(false);
            } else {
                setShowTextBox(false);
                settextFieldData('');
            }
        }
    };

    const urlParams = useParams();
    const menuName: any = useMemo(() => {
        let menuChild: any[] = [];
        const menu = urlParams['*']?.split('/')?.[1];
        appMenu?.forEach((item: any, index: any) => {
            if (item.data.name === menu) {
                menuChild = item.child;
            }
        });

        return {menu, menuChild};
    }, [appMenu, urlParams]);

    function IsAddConnectorItemValid(contentName: string) {
        const flag = true;
        return flag;
    }

    const addContentTreeItem = (data: any) => {
        settextFieldData(data.contentName);
        if (data.contentName) {
            setLoader(true);
        }
        if (!IsAddConnectorItemValid(data.contentName)) {
            return;
        }

        const params = {
            content_tree_id: data._id,
            payload: {
                project_id: data.project_id,
                name: data.contentName.trim(),
                type: data.type,
                category: data.type,
                child_allowed: data.child_allowed,
            },
        };
        setMenu(params);
    };

    const testData: any = [];
    if (appMenu) {
        appMenu.map((name: any) => {
            testData.push({...name.data, child_allowed: 1, children: name.child});
        });
    }

    const onHideSnackBar = useCallback(() => {
        setSnack({
            message: '',
            open: false,
            type: 'info',
        });
    }, []);

    return (
        <Box
            sx={{
                paddingLeft: '120px',
                paddingRight: '120px',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    gap: '24px',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        background: theme.palette.background.paper,
                        borderRadius: '4px',
                        marginTop: '24px',
                        marginLeft: '14px',
                        height: 'fit-content',
                        width: '30%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '16px 20px 0px 16px',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingBottom: '16px',
                                    flex: 2,
                                }}
                                variant="body2"
                            >
                                {'Navigation'}{' '}
                            </Typography>
                            <Box sx={{paddingRigth: '36px', marginTop: '4px'}}>
                                <IconComponent
                                    name={'Vector'}
                                    color={'white'}
                                    size={20}
                                    label={'add'}
                                    handleClick={() => setShowTextBox(true)}
                                />
                            </Box>
                        </Box>
                        <Divider/>

                        {showTextBox && (
                            <ClickAwayListener onClickAway={() => setShowTextBox(false)}>
                                <input
                                    style={{
                                        outline: 'none',
                                        fontSize: '12px',
                                        fontWeight: 400,
                                        border: '1px solid blue',
                                        marginLeft: '5px',
                                        marginTop: '5px',
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    className="z-10 w-40 -ml-8 pl-7 h-8 bg-transparent"
                                    value={textFieldData}
                                    onKeyUp={OnEnterHandler}
                                    onChange={(e) => {
                                        settextFieldData(e.target.value);
                                    }}
                                    autoFocus
                                ></input>
                            </ClickAwayListener>
                        )}
                    </Box>
                    {testData.length === 0 && (
                        <Typography
                            sx={{
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '16px',
                                flex: 2,
                            }}
                            variant="body2"
                        >
                            {'No feature available'}
                        </Typography>
                    )}
                    <Box
                        ref={ref}
                        sx={{
                            overflow: 'hidden',
                            overflowY: 'scroll',
                            height: 'fit-content',
                            maxHeight: window.innerHeight * 0.7,
                        }}
                    >
                        <CustomTreeviewIcon
                            deleteNodeId={deleteNodeId}
                            setDeleteNodeId={setDeleteNodeId}
                            addContentTreeItem={addContentTreeItem}
                            setTreeData={setTreeData}
                            data={testData}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Navigation;
