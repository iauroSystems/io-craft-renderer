import { SearchInput } from '@iocraft/component-library';
import { Box, Dialog, Menu, MenuItem, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { environment } from 'apps/view-page/src/environments/environment';
import themes from 'apps/view-page/src/theme';
import html2canvas from 'html2canvas';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomSnackbar from '../../../components/CustomSnackbar';
import IconComponent from '../../../components/gridComponents/icon-component/icon-component';
import { uploadImageApi } from '../store/widgetsSlice';
import ShareTray from './ShareTray';
export interface IMenuClicked {
  menu: string;
  data: any;
}
export interface IGridCard {
  widgets: any;
  id: string;
  title: string;
  w: number;
  h: number;
  x: number;
  y: number;
  type?: string;
  selectedWidget: any;
  data: any;
  actions: any;
  children: any;
  editWidget: (data: any) => void;
}

const StyledIconComponent = styled(Menu)(({ theme }) => {
  return {
    '& .MuiMenu-list': {
      padding: 0,
    },
  };
});

const BootstrapDialog = styled(Dialog)(({ theme }) => {
  return {
    '& .MuiDialogContent-root': {
      padding: 2,
    },
    '& .MuiDialogActions-root': {
      padding: 2,
    },
  };
});

export default function GridCard(props: IGridCard) {
  const menuArray = ['Preview', 'Share', 'Download'];
  const { widgets } = props;
  const theme = useTheme();
  const inputFile = useRef<any>(null);

  const dispatch = useDispatch();
  const themeChart = themes.default;
  const ref = useRef(null);
  const [_selectedWidget, _setselectedWidget] = useState<any>({});
  const [toggle, setToggle] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openShareTray, setOpenShareTray] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loadingData, setloadingData] = useState<any>(false);
  const [snackData, setSnackData]: any = useState({
    open: false,
    msg: '',
    duration: 3000,
    severity: 'info',
  });
  const [rawData, setRawData] = useState<any>({});

  const onHideSnackBar = useCallback(() => {
    setSnackData({
      msg: '',
      open: false,
      severity: 'info',
      duration: 0,
    });
  }, []);
  const [currentCompomponent, setCurrentComponent] = useState<any>(
    props.children
  );

  const [open, setOpen] = useState<any>(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(Boolean(event.currentTarget));
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    if (props.selectedWidget) {
      _setselectedWidget(props.selectedWidget);
    }
  }, [props.selectedWidget]);

  useEffect(() => {
    props.actions.handleRemove(ref.current, false);
    props.actions.handleAdd(ref.current, props);
  }, [props]);

  const closePopup = () => {
    // setOpen(false);
  };

  const shareAsPngJpeg = (input: any) => {
    const abc: any = document.getElementById(input?.ref?.current?.id);
    html2canvas(abc, {
      allowTaint: true,
      useCORS: true,
    })
      .then(function (canvas) {
        // It will return a canvas element
        // let image = canvas.toDataURL('image/png', 0.5);
        const image = canvas.toDataURL('image/png', 0.5);
        const href = image;
        const link = document.createElement('a');
        link.href = href;
        const newFileName = input?.ref?.current?.innerText + '.png';
        link.download = newFileName;
        setSnackData({
          msg: newFileName + ' downloaded successfully',
          open: true,
          severity: 'success',
          duration: 3000,
        });

        // link.click();
        inputFile?.current?.click();

        const formData = new FormData();
        formData.append('files', href);
        const Payload1 = { data: formData };

        dispatch(uploadImageApi(Payload1));
        setRawData(image);
      })
      .catch((e) => {
        // Handle errors
        console.log(e);
      });
  };

  const localDownload = (data: any) => {
    if (data && data.type === 'localDownload') {
      const link = document.createElement('a');
      link.href = data.data;
      link.download = 'Download.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSnackData({
        msg: 'File downloaded successfully',
        open: true,
        severity: 'success',
        duration: 3000,
      });
    }
  };

  const shareAsPngJpeg2 = (input: any) => {
    const abc: any = document.getElementById(input?.ref?.current?.id);
    html2canvas(abc, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvasElt: any) {
      const imageUrl = canvasElt.toBlob((blob: any) => {
        const file = new File([blob], 'mycanvas.png');
        const dT: any = new DataTransfer();
        dT.items.add(file);
        const formData = new FormData();
        formData.append('files', dT.files[0]);
        const Payload1 = { data: formData };
        new Promise((resolve, reject) => {
          resolve(dispatch(uploadImageApi(Payload1)));
        })
          .then((responseObj: any) => {
            setloadingData(false);
            if (responseObj?.payload?.data?.result) {
              setRawData(responseObj?.payload?.data?.result[0].file_path);
              setOpenShareTray(true);
            }
          })
          .catch((error: any) => {
            setloadingData(false);
          });
      });
      // dispatch(uploadImageApi(Payload1));
    });
  };

  const menuCategoryClicked = (input: any) => {
    if (input) {
      switch (input.menu.toLowerCase()) {
        case 'download':
          if (_selectedWidget) {
            downloadJSON(_selectedWidget, input?.input);
          } else {
          }
          break;
        case 'preview':
          setOpenDialog(true);
          break;
        case 'share':
          if (_selectedWidget) {
            shareAsPngJpeg2(input);
          } else {
          }
          break;
        default:
          break;
      }
    }
  };

  const convertToCSV = (json: any): any => {
    if (json && json.length > 0) {
      const fields = Object.keys(json[0]);
      const replacer = function (key: any, value: any) {
        return value === null ? '' : value;
      };
      let csv = json.map(function (row: any) {
        return fields
          .map(function (fieldName) {
            return JSON.stringify(row[fieldName], replacer);
          })
          .join(',');
      });
      csv.unshift(fields.join(',')); // add header column
      csv = csv.join('\r\n');
      return csv;
    } else {
      return [];
    }
  };
  const downloadJSON = (data: any, input: any) => {
    const fileName = environment.fileName;
    new Promise((resolve, reject) => {
      resolve(
        true
        // dispatch(
        //   downloadWidgetDataApi({
        //     label: '',
        //     report: data.report,
        //     widget_id: data.id,
        //     projections: '',
        //     filter: '',
        //     size: '1000',
        //     page: '0',
        //   })
        // )
      );
    })
      .then((response: any) => {
        const json = JSON.parse(
          JSON.stringify(response?.payload?.data?.result?.data || [])
        );
        const csv = convertToCSV(json);
        const blob = new Blob([csv], {
          type: 'application/csv',
        });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        const newFileName =
          (data.formData?.formData?.Title ||
            input?.current?.innerText ||
            fileName) + '.csv';

        link.download = newFileName;
        setSnackData({
          msg: newFileName + ' downloaded successfully',
          open: true,
          severity: 'success',
          duration: 3000,
        });
        link.click();
      })
      .catch((err: any) => {
        setSnackData({
          msg: 'Error while downloading file.',
          open: true,
          severity: 'error',
          duration: 3000,
        });

        return err;
      });

    // }
    if (data && data.formProps) {
      const json = JSON.stringify(data.formProps);
      const blob = new Blob([json], {
        type: 'application/json',
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = (data.formData?.formData?.Title || fileName) + '.json';
      link.click();
    }
  };

  function toggleModal() {
    setOpen(!open);
  }

  return (
    <div
      className="grid-stack-item "
      style={{
        overflow: 'hidden',
      }}
      id={props.id} // convert to string
      w={props.w}
      h={props.h}
      x={props.x}
      y={props.y}
      {...props.data}
      ref={ref}
    >
      <div
        className="grid-stack-item-content overflow-hidden"
        style={{
          border: `1px solid ${themeChart.palette?.neutral?.neu100}`,
          borderRadius: '4px',
          backgroundColor: themeChart.palette?.background?.bacopWhite,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
          }}
        >
          {_selectedWidget && _selectedWidget.type != 'card' && (
            <div
              style={{
                height: '48px',
                padding: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                variant={'body2'}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '20px',

                  color: themes?.default?.palette?.text?.tex600,
                }}
              >
                {_selectedWidget &&
                _selectedWidget.formData &&
                _selectedWidget.formData.formData &&
                _selectedWidget.formData.formData.Title
                  ? _selectedWidget.formData.formData.Title
                  : _selectedWidget.type}
              </Typography>

              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    marginRight: '5px',
                  }}
                  onClick={(e: any) => {}}
                >
                  {_selectedWidget && _selectedWidget.type === 'grid' && (
                    <div
                      style={{
                        width: '100%',
                        backgroundColor:
                          themes.default?.palette?.background?.bacopWhite,
                      }}
                    >
                      <SearchInput
                        label={'Search'}
                        placeholder={'Search'}
                        value={''}
                        chartProps={{
                          background_color:
                            themes.default.palette?.background?.bacopWhite,
                          border_color: themes.default.palette?.neutral?.neu100,
                        }}
                        onChange={(e: any) => {}}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{ position: 'relative' }}
                  onClick={(e: any) => {
                    const payload: any = {
                      menu: 'preview',
                    };
                    menuCategoryClicked(payload);
                  }}
                >
                  <IconComponent
                    {...{
                      name: 'fullscreen_black_24dp',
                      color: themes?.default?.palette?.neutral?.neu400,
                      size: 27,
                      label: 'Full Screen',
                    }}
                  ></IconComponent>
                </div>
                <div
                  style={{ position: 'relative' }}
                  onClick={(e: any) => {
                    const payload: any = {
                      menu: 'download',
                      input: ref,
                    };
                    menuCategoryClicked(payload);
                  }}
                >
                  <IconComponent
                    {...{
                      name: 'file_download_black_24dp-1-1',
                      color: themes?.default?.palette?.neutral?.neu400,
                      size: 26,
                      label: 'Download',
                    }}
                  ></IconComponent>
                </div>
                <div
                  style={{ position: 'relative' }}
                  onClick={(e: any) => {
                    handleClick(e);
                  }}
                >
                  <IconComponent
                    {...{
                      name: 'more_vert_black_24dp',
                      color: themes?.default?.palette?.neutral?.neu400,
                      size: 27,
                      label: 'More',
                    }}
                  ></IconComponent>
                </div>
              </Box>
              <StyledIconComponent
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                sx={{ paddingTop: 0, paddingBottom: 0 }}
                anchorEl={anchorEl}
                style={{ padding: '0px !important' }}
                open={open}
                onClick={(e: any) => {
                  handleClose();
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <div
                  style={{
                    padding: '0px',
                    backgroundColor: themeChart.palette?.background?.bacopWhite,
                    color: themes?.default?.palette?.text?.tex600,
                  }}
                >
                  {menuArray &&
                    menuArray.map((menu: string) => {
                      return (
                        <MenuItem
                          onClick={(e) => {
                            const payload: any = {
                              menu,
                              data: e,
                              ref: ref,
                            };
                            menuCategoryClicked(payload);
                          }}
                        >
                          {menu}
                        </MenuItem>
                      );
                    })}
                </div>
              </StyledIconComponent>
            </div>
          )}
        </div>
        <div
          style={{
            // top: '10px',
            padding: '5px',
            height: 'calc(100% - 10px)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {currentCompomponent}
        </div>
        <Dialog
          onClose={handleClose}
          open={openDialog}
          maxWidth={'xl'}
          PaperProps={{
            sx: {
              width: '95%',
              height: '95%',
            },
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              backgroundColor: themeChart.palette?.background?.bacopWhite,
              color: themes?.default?.palette?.text?.tex600,
              height: '100%',
              width: '100%',
            }}
          >
            <div
              style={{
                borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
              }}
            >
              <div
                style={{
                  height: '48px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflow: 'hidden',
                  padding: 10,
                  backgroundColor: theme.palette?.light?.c50,
                }}
              >
                <header
                  style={{
                    height: '48px',
                    width: '100%',
                    padding: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant={'body2'}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: '20px',

                      color: themes?.default?.palette?.text?.tex600,
                    }}
                  >
                    {_selectedWidget &&
                    _selectedWidget.formData &&
                    _selectedWidget.formData.formData &&
                    _selectedWidget.formData.formData.Title
                      ? _selectedWidget.formData.formData.Title
                      : _selectedWidget?.type}
                  </Typography>

                  <Box sx={{ ml: 'auto' }}>
                    <div
                      style={{ position: 'relative' }}
                      onClick={() => {
                        closePopup();
                        setOpenDialog(false);
                      }}
                    >
                      <IconComponent
                        {...{
                          name: 'close_black_24dp',
                          color: themes?.default?.palette?.text?.tex600,
                          size: 25,
                          label: 'Close',
                        }}
                      ></IconComponent>
                    </div>
                  </Box>
                </header>
              </div>
            </div>
            <div
              style={{
                height: 'calc(100% - 48px)',
                backgroundColor: theme.palette?.light?.c50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {currentCompomponent}
            </div>{' '}
          </div>
        </Dialog>
        <Dialog
          onClose={(data: any) => {
            setOpenShareTray(!openShareTray);
          }}
          open={openShareTray}
          maxWidth={'sm'}
          fullWidth={true}
        >
          <ShareTray
            data={rawData}
            onClose={(data: any) => {
              setOpenShareTray(!openShareTray);
              localDownload(data);
            }}
          />
        </Dialog>

        <CustomSnackbar
          msg={snackData.msg}
          open={snackData.open}
          onClose={onHideSnackBar}
          duration={snackData.duration}
          severity={snackData.severity}
        />
      </div>
    </div>
  );
}
