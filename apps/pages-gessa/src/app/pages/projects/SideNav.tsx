import { IconComponent } from '@iocraft/component-library';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { IRootState } from 'apps/pages-gessa/src/store';
import themes from 'apps/pages-gessa/src/theme';
import generateRandomString from 'apps/pages-gessa/src/utils/randomString';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsUI from './SettingsUI';
import {
  selectAllSortedMenuById,
  setActiveMenuName,
  setPageId,
} from './store/sortedMenuSlice';

export interface ISideNav {
  menuList: any;
  selectedMenuName: string;
  setSelectedMenuName: (data: any) => any;
}
const SideNav = (props: ISideNav) => {
  const theme = useTheme();
  const themesChart = themes.default;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const [appMenu, setAppMenu]: any = useState<Array<any>>([]);
  const [isClicked, setClicked]: any = useState(false);
  const sortedMenus = selectAllSortedMenuById(rootState);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    params.menuId || props.selectedMenuName
  );

  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
      setAppMenu(sortedMenus[0].data);
    }
  }, [sortedMenus]);

  useEffect(() => {
    if (params && params.menuId) {
      setSelectedMenu(params.menuId);
      dispatch(setActiveMenuName(params.menuId));
    }
  }, [params]);

  const openUserDetailPopup = () => {
    setOpenPopup(true);
  };

  return (
    <Box
      sx={{
        width: '84px',
        height: '93vh',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        overflowY: 'auto',
        background: themesChart?.palette?.background?.bacopWhite,
        borderRight: `1px solid ${themesChart?.palette?.neutral?.neu100}`,
      }}
    >
      <Stack direction="column">
        {appMenu &&
          appMenu.length > 0 &&
          appMenu.map((item: any, index: any) => {
            return (
              <div
                key={generateRandomString()}
                style={{
                  minWidth: '50px',
                  minHeight: '50px',

                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '10px',
                  borderRadius: '4px',
                  background:
                    selectedMenu === item.data.name
                      ? themesChart?.palette?.primary?.pri300Main
                      : themesChart?.palette?.background?.bacopWhite,
                  color:
                    selectedMenu === item.data.name
                      ? theme?.palette?.primary?.main
                      : theme?.palette?.text?.main,
                }}
                onClick={() => {
                  setClicked(isClicked !== index ? index : -1);
                  setSelectedMenu(item.data.name);

                  dispatch(setActiveMenuName(item.data.name));
                  if (item && item.child && item.child.length > 0) {
                    dispatch(setPageId(''));
                  } else {
                    dispatch(setPageId(item.data.pageId));
                  }
                  props.setSelectedMenuName(item.data.name);
                  navigate(
                    `/project/${params.projectId}/${
                      item.data.name || params.menuId
                    }`
                  );
                }}
              >
                <IconComponent
                  name={item.data.icon.trim() || 'Menu-Info'}
                  size={30}
                  label={item.data.name}
                  color={
                    selectedMenu === item.data.name
                      ? themesChart?.palette?.background?.bacopWhite
                      : themesChart?.palette?.text?.tex300Main
                  }
                />
              </div>
              // </Link>
            );
          })}
      </Stack>
      <Stack direction="column">
        <Button
          variant="outlined"
          sx={{
            margin: '10px',
            height: '50px',
            width: '50px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            background: themesChart?.palette?.background?.bacopWhite,
            border: `1px dashed ${themesChart?.palette?.neutral?.neu100}`,
          }}
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          <IconComponent
            name={'Setting'}
            size={35}
            label={'Add Menu'}
            color={theme?.palette?.text?.main}
            handleClick={() => {}}
          />
        </Button>
      </Stack>
      <Dialog
        open={openPopup}
        fullWidth
        maxWidth={'lg'}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'calc(100% - 0px)',
            flex: 100,
            padding: '10px',
          }}
        >
          <Typography variant={'button'} sx={{ textTransform: 'none' }}>
            Add Configuration
          </Typography>
          <Box
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenPopup(!openPopup);
            }}
          >
            <IconComponent
              name={'close_black_24dp'}
              size={25}
              label={'Close'}
              color={theme?.palette?.text?.main}
              handleClick={() => {}}
            />
          </Box>
        </Box>
        <Divider />
        <DialogContent>
          <SettingsUI
            closePopup={() => {
              setOpenPopup(!openPopup);
              window.location.reload();
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SideNav;
