import { IconComponent } from '@iocraft/component-library';
import { Box, Button, Typography } from '@mui/material';
import { IRootState } from 'apps/pages-gessa/src/store';
import {
  getLocalStorage,
  setLocalStorage,
} from 'apps/pages-gessa/src/utils/localStorageService';
import generateRandomString from 'apps/pages-gessa/src/utils/randomString';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackbar from '../../../components/CustomSnackbar';
import './AddPage.css';

interface fileObj {
  fileName: string;
  data: any;
}
interface IPageObject {
  pageID: string;
  pageName: string;
  fileData: fileObj;
}
type Props = {};

const AddPages = (props: Props) => {
  const inputFile: any = useRef(null);
  const [field, setField] = useState<any>(null);
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const [rows, setRows] = useState<Array<IPageObject>>([]);
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

  useEffect(() => {
    const existPages = JSON.parse(JSON.stringify(getLocalStorage('allpages')));
    if (existPages && existPages.length) {
      const oldRows = [];
      for (let i = 0; i < existPages.length; i += 1) {
        const item: IPageObject = existPages[i];
        oldRows.push(item);
      }
      setRows([...oldRows, ...rows]);
    }
  }, []);
  const handleAddRow = (index: string) => {
    const item: IPageObject = {
      pageID: index,
      pageName: 'page-' + index.substr(index.length - 3),
      fileData: { fileName: '', data: {} },
    };
    setRows([...rows, item]);
  };
  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };
  const handleRemoveSpecificRow = (deleterow: IPageObject) => {
    const _rows = rows.filter(
      (row: IPageObject) => row.pageID !== deleterow.pageID
    );
    setRows(_rows);
  };

  const saveJSON = (rows: IPageObject[]) => {
    const pagesJson: any = [];
    const pagesOrigJson: IPageObject[] = [];
    const getAllPages = getLocalStorage('allpages');
    setLocalStorage('allpages', rows);

    setSnackData({
      open: true,
      msg: 'Pages saved successfully',
      duration: 3000,
      severity: 'success',
    });
  };

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    pageID: string
  ) => {
    const _rows: IPageObject[] = JSON.parse(JSON.stringify(rows));
    let fileName = '';
    const handleFileRead = (event2: any) => {
      try {
        const content = JSON.parse(event2.target.result);
        const pageData = {
          page_id: pageID,
          widgets: content.widgets,
        };
        const rowIndex = _rows.findIndex(
          (value: IPageObject) => value.pageID === pageID
        );

        _rows[rowIndex].fileData.fileName = fileName;
        _rows[rowIndex].fileData.data = pageData;
        setRows(_rows);
        setSnackData({
          open: true,
          msg: 'Json file load successfully',
          duration: 3000,
          severity: 'success',
        });
      } catch (error) {
        setSnackData({
          open: true,
          msg: 'Invalid JSON input',
          duration: 3000,
          severity: 'error',
        });
      }
    };

    if (event.target.files) {
      const reader = new FileReader();
      fileName = event.target.files[0].name;
      reader.readAsText(event.target.files[0], 'UTF-8');
      reader.onload = handleFileRead;
    }
  };

  return (
    <div
      style={{
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        gap: '10px',
      }}
    >
      <Box style={{ height: '450px', overflowY: 'auto', flex: 90 }}>
        <table>
          <thead>
            <tr style={{ height: '50px', zIndex: 1000 }}>
              <th style={{ width: '10%' }}> # </th>
              <th style={{ width: '25%' }}> Page Id </th>
              <th style={{ width: '25%' }}> Page Name </th>
              <th style={{ width: '30%' }}> Upload JSON </th>
              <th style={{ width: '10%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.length > 0 &&
              rows.map((item: IPageObject, idx: any) => (
                <tr style={{ height: '70px' }} key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <Typography> {item.pageID}</Typography>
                  </td>
                  <td>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography> {item.pageName}</Typography>
                      {/* <IconComponent
                        handleClick={(data: any) => {
                          // setField(item.pageID,);
                        }}
                        name="edit_black_24dp"
                        size={25}
                        color={'#0958fa'}
                        label={'Import JSON'}
                      /> */}
                    </Box>
                  </td>
                  <td>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            inputFile?.current?.click();
                          }}
                          sx={{ textTransform: 'none' }}
                        >
                          Upload File
                        </Button>
                      </Box>
                      <input
                        accept={'.json'}
                        type="file"
                        id="file"
                        onChange={(e: any) => handleUpload(e, item.pageID)}
                        ref={inputFile}
                        style={{ display: 'none' }}
                      />
                      <Typography> {item.fileData.fileName}</Typography>
                    </Box>
                  </td>
                  <td>
                    <Button
                      variant="text"
                      color="error"
                      onClick={(e: any) => handleRemoveSpecificRow(item)}
                      sx={{ textTransform: 'none' }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <table hidden style={{ width: '100%' }}>
          <thead style={{ position: 'fixed', width: 'calc(100% - 0px)' }}>
            <th> # </th>
            <th> Page Id </th>
            <th> Page Name </th>
            <th> Upload JSON </th>
            <th> </th>
          </thead>
          <tbody>
            {rows &&
              rows.length > 0 &&
              rows.map((item: IPageObject, idx: any) => (
                <tr style={{ height: '70px' }} key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <Typography> {item.pageID}</Typography>
                  </td>
                  <td>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography> {item.pageName}</Typography>
                      <IconComponent
                        handleClick={(data: any) => {
                          // setField(item.pageID,);
                        }}
                        name="edit_black_24dp"
                        size={25}
                        color={'#0958fa'}
                        label={'Import JSON'}
                      />
                    </Box>
                  </td>
                  <td>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            inputFile?.current?.click();
                          }}
                          sx={{ textTransform: 'none' }}
                        >
                          Upload File
                        </Button>
                      </Box>
                      <input
                        accept={'.json'}
                        type="file"
                        id="file"
                        onChange={(e: any) => handleUpload(e, item.pageID)}
                        ref={inputFile}
                        style={{ display: 'none' }}
                      />
                      <Typography> {item.fileData.fileName}</Typography>
                    </Box>
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={(e: any) => handleRemoveSpecificRow(item)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            handleAddRow(generateRandomString());
          }}
          sx={{ textTransform: 'none' }}
        >
          {' '}
          Add Row
        </Button>
        <Button
          variant="contained"
          onClick={(e: any) => saveJSON(rows)}
          sx={{ textTransform: 'none' }}
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
    </div>
  );
};

export default AddPages;
