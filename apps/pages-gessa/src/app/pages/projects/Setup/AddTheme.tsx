import { IconComponent } from '@iocraft/component-library';
import { Box, Button, Typography } from '@mui/material';
import { IRThemePalette } from 'apps/pages-gessa/src/store/colorPalleteSlice';
import { IRTheme } from 'apps/pages-gessa/src/store/themeContextSlice';
import {
  getLocalStorage,
  setLocalStorage,
} from 'apps/pages-gessa/src/utils/localStorageService';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomSnackbar from '../../../components/CustomSnackbar';

type Props = {};

const AddTheme = (props: Props) => {
  const inputFile: any = useRef(null);
  const dispatch = useDispatch();
  const [fileload, setFileLoad] = useState<boolean>(false);
  const [saveDetails, setSaveDetails] = useState<any>({ font: {}, color: {} });
  const [themeFile, setThemeFileName] = useState<string>('');
  const [loadStatus, setLoadStatus] = useState<any>({
    fonts: false,
    palette: false,
    file_error: false,
  });
  const [snackData, setSnackData]: any = useState({
    open: false,
    msg: '',
    duration: 0,
    severity: 'info',
  });

  useEffect(() => {
    if (getLocalStorage('appliedTheme')) {
      try {
        const appliedTheme =
          JSON.parse(JSON.stringify(getLocalStorage('appliedTheme'))) || '';
        setThemeFileName(appliedTheme);
      } catch {
        console.log('error');
      }
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

  const handleFileRead = (event: any) => {
    try {
      const content = JSON.parse(event.target.result);
      const themeObject: IRThemePalette = {
        project_id: '123',
        color: {
          statusCode: 200,
          message: 'success',
          result: {
            _id: '63ca80e894461ae48cb57496',
            projectId: '63ca80e894461ae48cb57493',
            colors: content.colors,
            isDelete: 0,
            created_at: '2023-01-20T11:54:16.438Z',
            updated_at: '2023-01-20T11:54:16.438Z',
            __v: 0,
          },
        },
      };
      // dispatch(setThemePaletteContext(themeObject));
      // setLocalStorage('colorData', themeObject);
      setLoadStatus((oldData: any) => {
        return { ...oldData, ...{ palette: true } };
      });

      const themeObject2: IRTheme = {
        project_id: '123',
        font: {
          statusCode: 200,
          message: 'success',
          result: {
            _id: '63ca80e894461ae48cb57495',
            projectId: '63ca80e894461ae48cb57493',
            families: ['poppins'],
            urls: ['https://fonts.googleapis.com/css?family=Poppins'],
            fonts: content.fonts,
            isDelete: 0,
            created_at: '2023-01-20T11:54:16.437Z',
            updated_at: '2023-01-20T11:54:16.437Z',
            __v: 0,
          },
        },
      };
      // dispatch(setThemeContext(themeObject2));
      setLoadStatus((oldData: any) => {
        return { ...oldData, ...{ fonts: true } };
      });
      setFileLoad(true);
      const obj = {
        font: themeObject2,
        color: themeObject,
      };

      setSaveDetails(obj);

      setLoadStatus((oldData: any) => {
        return { ...oldData, ...{ file_error: false } };
      });
    } catch (error) {
      console.log('error while reading json', error);
      setLoadStatus((oldData: any) => {
        return { ...oldData, ...{ file_error: true } };
      });

      setSnackData({
        open: true,
        msg: 'Invalid JSON input',
        duration: 3000,
        severity: 'error',
      });
    }
  };

  const saveTheme = () => {
    setLocalStorage('fontData', saveDetails.font);
    setLocalStorage('colorData', saveDetails.color);
    setSnackData({
      open: true,
      msg: 'Theme applied successfully',
      duration: 3000,
      severity: 'success',
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileLoad(false);
      setThemeFileName(event.target.files[0].name);
      setLocalStorage('appliedTheme', event.target.files[0].name);

      const reader = new FileReader();
      reader.readAsText(event.target.files[0], 'UTF-8');
      reader.onload = handleFileRead;
    }
  };

  useEffect(() => {
    // console.log(loadStatus);
  }, [loadStatus]);

  return (
    <Box
      style={{
        display: 'flex',
        height: '500px',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'space-between',
        gap: '10px',
        flex: 100,
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'space-between',
          gap: '10px',
          flex: 100,
        }}
      >
        <Box style={{ flex: 90 }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography>Add theme JSON file here</Typography>
            <Box>
              <Box sx={{}}>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                  onClick={() => {
                    inputFile?.current?.click();
                  }}
                >
                  <Typography variant="button" sx={{ textTransform: 'none' }}>
                    Import JSON
                  </Typography>
                </Button>
              </Box>
              <input
                accept={'.json'}
                type="file"
                id="file"
                onChange={handleUpload}
                ref={inputFile}
                style={{ display: 'none' }}
              />
            </Box>
          </Box>
          {themeFile && themeFile.length ? (
            <Typography
              variant="body1"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <IconComponent name="Correct" size={25} color={'green'} />
              Applied Theme: {themeFile}
            </Typography>
          ) : null}
          {fileload ? (
            <>
              {loadStatus && loadStatus.palette ? (
                <Typography
                  variant="body1"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <IconComponent name="Correct" size={25} color={'green'} />
                  Palette Loaded successfully
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <IconComponent
                    name="cancel_black_24dp"
                    size={25}
                    color={'red'}
                  />
                  Error while loading color palette
                </Typography>
              )}
              {loadStatus && loadStatus.fonts ? (
                <Typography
                  variant="body1"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <IconComponent name="Correct" size={25} color={'green'} />
                  Fonts Loaded successfully
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  {' '}
                  <IconComponent
                    name="cancel_black_24dp"
                    size={25}
                    color={'red'}
                  />
                  Error while loading fonts
                </Typography>
              )}
            </>
          ) : null}
          {loadStatus && loadStatus.file_error ? (
            <Typography
              variant="body1"
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {' '}
              <IconComponent name="cancel_black_24dp" size={25} color={'red'} />
              Invalid JSON input
            </Typography>
          ) : null}
        </Box>
        <Box
          style={{
            flex: 10,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'end',
          }}
        >
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'end',
            }}
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              saveTheme();
            }}
          >
            <Typography variant="button" sx={{ textTransform: 'none' }}>
              Save
            </Typography>
          </Button>
        </Box>
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

export default AddTheme;
