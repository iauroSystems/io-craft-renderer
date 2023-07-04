import { useTheme } from '@mui/system';
import ConfigFormProvider from 'apps/view-page/src/context/form';
import { IRootState } from 'apps/view-page/src/store';
import themes from 'apps/view-page/src/theme';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackbar from '../../components/CustomSnackbar';
import Demo2Ui from './components/Demo2Ui';
import { getPageDataByIdApi } from './newStore/pageDetail';
import { selectPageWidgetDataById } from './newStore/pageWidgetData';
import { selectThemeContext } from './newStore/themeContextSlice';
import { getChartDataResource } from './store/gridDataRenderSlice';
import {
  deleteAllStore,
  savePageConfigurationApi,
  selectGridData,
} from './store/gridSlice';
import { getAllReportsLabelApi } from './store/reportLabelSlice';
import { selectAllReports } from './store/reportSlice';
import { selectAllWidgets } from './store/widgetsSlice';

export interface IGridProps {
  page_id: string;
}

const DemoWrapper = (props: IGridProps) => {
  const theme: any = useTheme();
  const themeObj: any = themes.default;
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const themeData = selectThemeContext(rootState);
  const [fontData, setFontData] = useState<any>();

  const gridDataStore = selectPageWidgetDataById(
    rootState,
    props.page_id || ''
  );
  const [gridData, setGridData] = useState<any>([]);
  const widgets = selectAllWidgets(rootState);
  const reports = selectAllReports(rootState);
  // const reportLabels = selectAllReportsLabel(rootState);
  const [report_label_collection, setReportLabelCollection] = useState<any>([]);
  const [snackData, setSnackData]: any = useState({
    open: false,
    msg: '',
    duration: 3000,
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
  }, [report_label_collection]);


  const [reportLabels, setReportLabels] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const keysArray: any = [];
    const promiseArray: any = [];
    setGridData([]);
    if (gridDataStore && gridDataStore && gridDataStore.widgets) {
      for (let i = 0; i < gridDataStore.widgets.length; i += 1) {
        keysArray.push([
          gridDataStore.widgets[i].key,
          gridDataStore.widgets[i].value,
        ]);
      }
      const collectionReportLabel: any = [];

      setReportLabelCollection(collectionReportLabel);

      const obj = keysArray.reduce(function (o: any, currentArray: any) {
        const key = currentArray[0];
        const value = currentArray[1];
        o[key] = value;
        return o;
      }, {});

      if (gridDataStore && gridDataStore.widgets.length) {
        const gridLoadWidget: any = [];
        for (let i = 0; i < gridDataStore.widgets.length; i += 1) {
          const payload: any = {
            id: gridDataStore.widgets[i].layout.find((o: any) => o.key === 'id')
              .value,
            type: gridDataStore.widgets[i].layout.find(
              (o: any) => o.key === 'type'
            ).value,
            w: gridDataStore.widgets[i].layout.find((o: any) => o.key === 'w')
              .value,
            h: gridDataStore.widgets[i].layout.find((o: any) => o.key === 'h')
              .value,
            x: gridDataStore.widgets[i].layout.find((o: any) => o.key === 'x')
              .value,
            y: gridDataStore.widgets[i].layout.find((o: any) => o.key === 'y')
              .value,
            widgetHeight: gridDataStore.widgets[i].layout.find(
              (o: any) => o.key === 'widgetHeight'
            ).value,
            widgetWidth: gridDataStore.widgets[i].layout.find(
              (o: any) => o.key === 'widgetWidth'
            ).value,
          };
          const dataIndex = gridDataStore.widgets[i].layout.findIndex(
            (value: any) => value.key === 'formData'
          );

          if (dataIndex !== -1) {
            const data = JSON.parse(
              gridDataStore.widgets[i].layout.find(
                (o: any) => o.key === 'formData'
              ).value
            );
            payload.formData = data;
            payload.label = data.formData.label;
            payload.report = data.formData.report;

            if (payload.type === 'grid' || payload.type === 'card') {
              if (payload.type === 'card') {
                payload.formProps = {
                  title: data?.formData?.title || payload.formData.title || '',
                  stat: 650,
                  icon: {
                    name: 'Search',
                    size: 30,
                    color: theme?.default?.palette?.primary?.pri400,
                  },
                };
              } else {
                // payload.formProps = {};
              }
            }

            gridLoadWidget.push(payload);
          } else {
            // payload.formProps = {};

            gridLoadWidget.push(payload);
          }
        }
        Promise.all(promiseArray).then(() => {
          setGridData(gridLoadWidget);
        });
      }
    }
  }, [gridDataStore]);

  useEffect(() => {}, []);

  useEffect(() => {
    const payload = {
      page: 0,
      size: 500,
    };
    if (widgets && widgets.length > 0) {
    } else {
    }

    if (props && props.page_id) {
      const payload2 = {
        page_id: props.page_id,
        page: 0,
        size: 100,
      };
      dispatch(deleteAllStore());

      new Promise((resolve, reject) => {
        resolve(dispatch(getPageDataByIdApi(payload2)));
      })
        .then((response: any) => {
          if (
            response &&
            response.payload &&
            response.payload.data &&
            response.payload.data.statusCode &&
            response.payload.data.statusCode === 403
          ) {
            setSnackData({
              msg: response.payload.data.message,
              open: true,
              severity: 'info',
              duration: 3000,
            });
          }
        })
        .catch((error) => error);

      // }
    }
    const payload3 = {
      page: 0,
      size: 500,
    };
    if (reports && reports.length > 0) {
    } else {
    }
  }, [props, props.page_id]);

  const saveLayout = (data: any) => {
    const layout = [];
    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        const keysArray = Object.keys(data[i]);
        const layoutObj = [];
        for (let j = 0; j < keysArray.length; j += 1) {
          const payld = {
            key: keysArray[j],
            value: data[i][keysArray[j]],
          };
          layoutObj.push(payld);
        }
        const payld2 = {
          key: 'name',
          value: 'card-widget',
          layout: layoutObj,
        };
        layout.push(payld2);
      }
    }
    const payload: any = {
      page_id: props.page_id,
      // is_delete: 0,
      widgets: layout,
    };

    for (let i = 0; i < payload.widgets.length; i += 1) {
      const dataIndex = payload.widgets[i].layout.findIndex(
        (value: any) => value.key === 'formData'
      );
      if (dataIndex !== -1) {
        payload.widgets[i].layout[dataIndex].value =
          typeof payload.widgets[i].layout[dataIndex].value === 'string'
            ? payload.widgets[i].layout[dataIndex].value
            : JSON.stringify(payload.widgets[i].layout[dataIndex].value);
      }
      const dataIndex2 = payload.widgets[i].layout.findIndex(
        (value: any) => value.key === 'formProps'
      );
      if (dataIndex2 !== -1) {
        payload.widgets[i].layout.splice(dataIndex2, 1);
      }
    }
    const obc = new Promise((resolve, reject) => {
      resolve(dispatch(savePageConfigurationApi(payload)));
    });
    obc.then((response: any) => {
    });
  };

  const getProjectsApiCall = () => {
    const newGridData = selectGridData(rootState);
    if (newGridData && newGridData.length) {
      const rawData = JSON.parse(JSON.stringify(newGridData[0]));
      setGridData([]);
      setGridData(rawData);
    }
  };
  const fetchReportLabel = (data: string) => {
    const payload = {
      reportName: data,
      params: {
        projections: '',
        filter: '',
        size: 2,
        page: 0,
      },
    };
    const obc = new Promise((resolve, reject) => {
      resolve(dispatch(getAllReportsLabelApi(payload)));
    });
    obc.then((response: any) => {
      if (response && response.payload && response.payload.length) {
        setReportLabels([]);
        setReportLabels(response.payload);
      } else {
        setReportLabels([]);
      }
    });
  };

  const fetchReportLabelData = (data: any) => {
    const formData =
      typeof data.formData === 'string'
        ? JSON.parse(data.formData)
        : data.formData;
    const obj = new Promise((resolve, reject) => {
      new Promise((resolve, reject) => {
        resolve(
          dispatch(
            getChartDataResource({
              label: formData.formData.label,
              report: formData.formData.report,
              widget_id: data.id,
            })
          )
        );
      }).then((response: any) => {
        if (response && response.payload && response.payload.data) {
          setGridData((oldWidgets: any) => {
            const _oldWidgets = JSON.parse(JSON.stringify(oldWidgets));
            const widgetIndex = _oldWidgets.findIndex(
              (value: any) => value.id === data.id
            );
            if (widgetIndex !== -1) {
              _oldWidgets[widgetIndex].formProps = {
                data: response.payload.data,
              };
            }

            return _oldWidgets;
          });
        }
      });
    });
  };

  return (
    <ConfigFormProvider>
      <div className="relative box-border w-full h-full">
        {gridData && reports && (
          <Demo2Ui
            data={gridData}
            rawWidgets={widgets}
            rawReports={reports}
            rawReportLabels={reportLabels}
            saveLayout={saveLayout}
            fetchReportLabel={fetchReportLabel}
            fetchReportLabelData={fetchReportLabelData}
          ></Demo2Ui>
        )}
      </div>
      <CustomSnackbar
        msg={snackData.msg}
        open={snackData.open}
        onClose={onHideSnackBar}
        duration={snackData.duration}
        severity={snackData.severity}
      />
    </ConfigFormProvider>
  );
};

export default DemoWrapper;
