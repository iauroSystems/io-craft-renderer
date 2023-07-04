import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import themes from '../../theme/index';
import AppMain from './AppMain/AppMain';
import AppMenu from './AppMenu/AppMenu';
// import './Classic.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IRootState } from '../../store';
import { selectAllMenu } from '../pages/projects/store/appMenuSlice';
import {
  selectActiveMenuName,
  selectActivePageId,
  selectAllSortedMenuById,
} from '../pages/projects/store/sortedMenuSlice';

function Classic({ right = false }) {
  const theme = themes.default;
  const rootState = useSelector((state: IRootState) => state);
  const [menuData, setMenuData] = useState<any>();
  // const childMenus: any = useContext(childMenuContext);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const params: any = useParams();
  const allMenus = selectAllMenu(rootState);
  const sortedMenus = selectAllSortedMenuById(rootState) || [];
  const [openMenuPage, setOpenMenuPage] = useState<any>();
  const [openSubmenu, setOpenSubmenu] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const _selectActivePageId = selectActivePageId(rootState);
  const _selectActiveMenuName = selectActiveMenuName(rootState);
  const [subMenuList, setSubMenuList] = useState<any>([]);
  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event && event.type === 'keydown') {
        return;
      }
      setDrawerOpen(open);
    };

  useEffect(() => {
    if (_selectActiveMenuName && sortedMenus && sortedMenus.length > 0) {
      const subMenuIndex =
        sortedMenus &&
        sortedMenus.length &&
        sortedMenus[0]?.data.findIndex(
          (value: any) => value.data.name === _selectActiveMenuName
        );
      if (subMenuIndex !== -1) {
        setSubMenuList(sortedMenus[0].data[subMenuIndex].child);
      } else {
        setSubMenuList([]);
      }
    }
  }, [_selectActiveMenuName]);

  useEffect(() => {
    if (params && params.menuId && subMenuList.length === 0) {
      if (sortedMenus && sortedMenus.length > 0) {
        const menuIndex = sortedMenus[0].data.findIndex(
          (value: any) => value.data.name === params.menuId
        );
        if (menuIndex !== -1) {
          if (sortedMenus[0].data[menuIndex].child.length > 0) {
            setOpenMenuPage(sortedMenus[0].data[menuIndex].child);
            const pageIndex = sortedMenus[0].data[menuIndex].child.findIndex(
              (value: any) => value.name === params.subMenuId
            );
            setSubMenuList(sortedMenus[0].data[menuIndex].child);
            if (pageIndex !== -1) {
              setSelectedPage(
                sortedMenus[0].data[menuIndex].child[pageIndex].pageId
              );
            }
          } else {
            setOpenMenuPage(sortedMenus[0].data[menuIndex].data);
            setSelectedPage(sortedMenus[0].data[menuIndex].data.pageId);
          }
        }
      }
    } else if (subMenuList && subMenuList.length > 0) {
      setOpenMenuPage({});
      const pageIndex =
        subMenuList &&
        subMenuList.findIndex((value: any) => value.name === params.subMenuId);
      if (pageIndex !== -1) {
        setSelectedPage(subMenuList[pageIndex].pageId);
      }
    }
  }, [params, sortedMenus]);

  useEffect(() => {}, [subMenuList]);

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 'calc(100vh - 7vh)',
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: '100%',
      }}
    >
      {subMenuList && subMenuList.length > 0 && (
        <Box
          sx={{
            backgroundColor: theme.palette?.background?.bacopWhite,
            color: theme.palette.text?.tex300Main,
            borderRight: `1px solid ${theme.palette?.neutral?.neu100}`,
            height: 'calc(100vh - 7vh)',
            width: '216px',
            overflowY: 'auto',
          }}
        >
          <AppMenu
            menuList={subMenuList}
            menuType="classic"
            openPage={(e: any) => {
              setMenuData(e);
              setOpenMenuPage(e);
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',

          backgroundColor: theme.palette.background?.bacopWhite,
          color: theme.palette.text?.tex300Main,
          height: 'calc(100vh - 7vh)',
          width:
            subMenuList && subMenuList.length > 0
              ? 'calc(100% - 216px)'
              : '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background?.bacmain,
            color: theme.palette.text?.tex300Main,
            width: '100%',
            overflowY: 'auto',
          }}
        >
          {selectedPage && selectedPage !== '' && (
            <AppMain pageId={selectedPage || _selectActivePageId || ''} />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Classic;
