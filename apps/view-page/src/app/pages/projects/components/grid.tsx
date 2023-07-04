import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/view-page/src/context/form';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import 'gridstack/dist/h5/gridstack-dd-native';
import { useEffect, useRef, useState } from 'react';
import { IReportLabel } from '../store/reportLabelSlice';
import { IReport } from '../store/reportSlice';

export interface IGridData {
  rawWidgets: any;
  rawReports: IReport[];
  rawReportLabels: IReportLabel[];
  widgets: any;
  selectedWidget: any;
  setWidgets: any;
  children?: any;
  saveLayoutData: (data: any) => void;
  updateWidgetProps: (data?: any) => void;
  fetchLabels: (data: string) => void;
  setSelectedWidgetProp: (data: any) => any;
  fetchWidgetData: (data: any) => any;
}

const Grid = ({
  rawWidgets,
  rawReports,
  rawReportLabels,
  widgets,
  selectedWidget,
  setWidgets,
  children,
  saveLayoutData,
  updateWidgetProps,
  fetchLabels,
  setSelectedWidgetProp,
  fetchWidgetData,
}: IGridData) => {
  const theme = useTheme();
  const gridRef = useRef<any>();
  const {
    setFormConfig,
    openWidgetConfigDrawer,
    setOpenWidgetConfigDrawer,
    setWidgetToBeUpdated,
    saveFormStatus,
    setSaveFormStatus,
  } = useConfigForm();

  const saveConfigHandler = () => {
    setOpenWidgetConfigDrawer(!openWidgetConfigDrawer);
  };

  const [newFields, setNewFields] = useState<any>([]);
  const [selectedwidget, setSelectedWidget] = useState<any>();
  const [defaultData, setDefaultData] = useState<any>([]);
  const saveLayout = () => {
    const obj: any = { data: [], type: 'save' };
    obj.data = gridRef.current.save();
    obj.type = 'save';

    saveLayoutData(obj);
  };

  useEffect(() => {
    if (saveFormStatus === true) {
      saveLayout();
      setSaveFormStatus(false);
    }
  });

  useEffect(() => {
    gridRef.current = GridStack.init({
      cellHeight: 10,
      cellHeightUnit: 'px',
      minRow: 8, // don't collapse when empty
      margin: 4,
      acceptWidgets: true,
      disableDrag: true,
      disableResize: true,
    });

    const grid = gridRef.current;

    if (grid) {
    }
  }, [setWidgets, setFormConfig]);

  const handleAdd = (el: any, properties?: any) => {
    if (el && gridRef.current) {
      gridRef.current.addWidget(el, {
        id: properties.id,
        type: properties.type,
        x: properties.x,
        y: properties.y,
        h: properties.h,
        w: properties.w,
      });
    }
  };
  const updateWidget = (el: any, obj: any) => {
    updateWidgetProps(obj);
  };
  const handleRemove = (el: any, actualRemove = true) => {
    if (el && gridRef.current) {
      gridRef.current.removeWidget(el, false);
      actualRemove &&
        setWidgets((items: any) =>
          items.filter((item: any) => `${item.id}` !== el.id)
        );
    }
  };
  const handleEnableMove = (flag = true) => {
    if (gridRef.current) {
      gridRef.current.enableMove(flag);
    }
  };
  const ondrag = (data: Event) => {};
  const ondragover = (data: any) => {};
  const onDragEnter = (event: any) => {};

  const elementClicked = (widget: any) => {
    setDefaultData({});
    const _widget = JSON.parse(JSON.stringify(widget));
    const newFieldsArray: any[] = [];
    if (widget) {
      const _rawWidgets = JSON.parse(JSON.stringify(rawWidgets));
      const ind = _rawWidgets.findIndex(
        (value: any) => value.type === _widget.type
      );
      const filterWidget = _rawWidgets.filter(
        (value: any) => value.type === _widget.type
      );
      if (filterWidget && filterWidget.length) {
        for (let i = 0; i < filterWidget[0].properties.length; i += 1) {
          const fieldPayload = {
            type: filterWidget[0].properties[i].datatype,
            value:
              _widget && _widget.formData && _widget.formData.properties
                ? _widget.formData.properties[filterWidget[0].properties[i].key]
                : '',
            label: filterWidget[0].properties[i].key,
            name: filterWidget[0].properties[i].key,
            placeholder: 'Enter ' + filterWidget[0].properties[i].key,
            options: [
              { label: 'l1', value: 'l1' },
              { label: 'l2', value: 'l2' },
              { label: 'l3', value: 'l3' },
            ],
            required: false,
            validation: {
              name: filterWidget[0].properties[i].key,
              required: true,
              errorMessage: filterWidget[0].properties[i].key + ' is required',
              min: 0,
              max: 0,
            },
          };
          newFieldsArray.push(fieldPayload);
        }
      }
      setNewFields(newFieldsArray);
      if (_widget && _widget.formData) {
        if (typeof _widget.formData === 'string') {
          setDefaultData(JSON.parse(_widget.formData));
          const formData = JSON.parse(JSON.stringify(_widget.formData));
          if (formData && formData.formData && formData.formData.report) {
            fetchLabelsFunc(formData.formData.report);
          }
        } else {
          setDefaultData(_widget.formData);
          if (
            _widget.formData &&
            _widget.formData.formData &&
            _widget.formData.formData.report
          ) {
            fetchLabelsFunc(_widget.formData.formData.report);
          }
        }
      }
    }
  };

  useEffect(() => {
    setSelectedWidget(selectedWidget);

    elementClicked(selectedWidget);
  }, [selectedWidget]);

  const saveFormData = (data: any) => {
    let tempWidget: any = {};
    saveConfigHandler();
    setWidgets((prevData: any) => {
      const oldWidget = JSON.parse(JSON.stringify(prevData));
      const index = oldWidget.findIndex(
        (value: any) => value.id === selectedwidget.id
      );
      if (index !== -1) {
        oldWidget[index].x = data.data.properties.x || oldWidget[index].x;
        oldWidget[index].y = data.data.properties.y || oldWidget[index].y;
        oldWidget[index].w = data.data.properties.w || oldWidget[index].w;
        oldWidget[index].h = data.data.properties.h || oldWidget[index].h;
        oldWidget[index].formData = JSON.stringify(data.data);
      }
      tempWidget = oldWidget[index];
      return oldWidget;
    });
    const index2 = widgets.findIndex(
      (value: any) => value.id === tempWidget.id
    );
  };

  const fetchLabelsFunc = (data: string) => {
    fetchLabels(data);
  };

  return (
    <Box
      component={'main'}
      sx={{
        backgroundSize: '100px 70px, 8.33%',
        margin: '4px',
      }}
      className="h-full"
    >
      <div className="grid-stack">
        {children({
          handleAdd,
          handleRemove,
          handleEnableMove,
          ondrag,
          ondragover,
          onDragEnter,
        })}
      </div>
    </Box>
  );
};

export default Grid;
