import {Box, Button} from '@mui/material';
import {getLocalStorage} from 'apps/pages-gessa/src/utils/localStorageService';
import {useCallback, useEffect, useRef, useState} from 'react';
import CustomSnackbar from '../../../components/CustomSnackbar';
import MenuDetails from './MenuDetails';
import MenuTree, {IMenuTree} from './MenuTree';

export interface Props {
    closePopup: (data?: any) => void;
}

const AddMenu = (props: Props) => {
    const [tree, setTree] = useState<IMenuTree[]>([]);
    const [activatedMenu, setActivatedMenu] = useState<IMenuTree>({
        child: [],
        icon: '',
        _id: '',
        name: '',
        pageId: '',
    });
    const [snackData, setSnackData]: any = useState({
        open: false,
        msg: '',
        duration: 0,
        severity: 'info',
    });

    const onHideSnackBar = useCallback(() => {
        setSnackData({
            msg: '',
            open: false,
            severity: 'info',
            duration: 0,
        });
    }, []);

    const menus = getLocalStorage('configuredMenus');
    const childRef = useRef<any>(null);

    const handleChildSubmitClick = () => {
        if (childRef.current) {
            // console.log(childRef.current);
            childRef.current.saveTree2();
            setSnackData({
                open: true,
                msg: 'Navigation menu saved successfully',
                duration: 3000,
                severity: 'success',
            });
            props.closePopup();
        }
    };

    useEffect(() => {
        if (menus && menus.length) {
            setTree(JSON.parse(JSON.stringify(menus)));
        }
    }, []);

    const setActiveMenu = (data: IMenuTree) => {
        setActivatedMenu(data);
    };
    useEffect(() => {
    }, [activatedMenu]);

    const updateNodeIntree = (data: any) => {
        const newNodes = [...tree];

        const updateNode = (id: string, targetNode: IMenuTree): any => {
            if (targetNode._id === id) {
                targetNode.icon = data.icon;
                targetNode.pageId = data.page;
                targetNode.name = data.name;
                targetNode.child = [];
                return targetNode;
            }
            if (targetNode.child) {
                targetNode.child = targetNode.child.filter((childNode: IMenuTree) => {
                    const newChildNode = updateNode(id, childNode);
                    return newChildNode !== null;
                });
            }

            return targetNode;
        };

        const _newNodes: IMenuTree[] = [];
        for (let i = 0; i < newNodes.length; i += 1) {
            _newNodes.push(updateNode(activatedMenu._id, newNodes[i]));
        }
        setTree(_newNodes);
        setSnackData({
            open: true,
            msg: `${data.name} menu saved successfully`,
            duration: 3000,
            severity: 'success',
        });
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'space-between',
                minHeight: '500px',
                height: '500px',
                gap: '10px',
            }}
        >
            <Box
                style={{display: 'flex', flex: 90, flexDirection: 'row', gap: '10px'}}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 50,
                        gap: '20px',
                        height: '100%',
                        borderRadius: 4,
                        border: '1px dashed rgba(255, 255, 255, 0.12)',
                    }}
                >
                    <MenuTree
                        ref={childRef}
                        tree={tree}
                        activeMenu={setActiveMenu}
                        saveTree={setTree}
                    />
                </Box>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 50,
                        gap: '20px',
                        height: '100%',

                        borderRadius: 4,
                        border: '1px dashed rgba(255, 255, 255, 0.12)',
                    }}
                >
                    <MenuDetails
                        data={{
                            name: activatedMenu.name,
                            page: activatedMenu.pageId,
                            icon: activatedMenu.icon,
                        }}
                        submittedData={(data: any) => {
                            updateNodeIntree(data);
                        }}
                    />
                </Box>
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flex: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Button
                    variant="contained"
                    size="small"
                    sx={{textTransform: 'none'}}
                    onClick={handleChildSubmitClick}
                >
                    Save
                </Button>
            </Box>
            <CustomSnackbar
                msg={snackData.msg}
                open={snackData.open}
                onClose={onHideSnackBar}
                duration={snackData.duration}
                severity={snackData.severity}
            />
        </Box>
    );
};

export default AddMenu;
