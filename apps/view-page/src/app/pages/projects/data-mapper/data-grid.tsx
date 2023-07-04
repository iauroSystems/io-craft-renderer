import { cardheaderData } from 'apps/view-page/src/fake-db/scatterData';
import themes from 'apps/view-page/src/theme';

interface IDataResponse {
  headerData: any;
  chartData: any;
  cardProps: any;
}

interface chartData {
  data: any;
  fontData: any;
}

export const DataGridDataMapping = (
  response: any,
  inputData: chartData
): any => {
  const themeObj: any = themes.default;
  let dataResponse: IDataResponse = {
    chartData: {},
    headerData: {},
    cardProps: {},
  };

  if (
    response &&
    response.payload &&
    response.payload.data &&
    response.payload.data.datasets &&
    response.payload.data.datasets.length > 0
  ) {
    response.payload.data.datasets.map((element: any, index: number) => {
      element.borderColor =
        themeObj.palette?.[`systemColor${index + 1}`]?.sys300Main;
      element.borderRadius = 5;
      return (element.backgroundColor = themeObj.palette?.[
        `systemColor${index + 1}`
      ]?.sys300Main
        ? themeObj.palette?.[`systemColor${index + 1}`]?.sys300Main
        : '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6));
    });
  }
  dataResponse = {
    headerData: {
      title: inputData.data?.formData?.formData?.Title,
      searchData: {
        label: 'Search',
        placeholder: 'Search by Customer Name, SSE ID, Phone Numbe',
        value: '',
      },
      chartProps: {
        background_color: themes.default.palette?.background?.bacopWhite,
        border_color: themes.default.palette?.neutral?.neu100,
      },

      actions: [
        {
          menu: 'Filter',
          icon: {
            name: 'filter_alt_black_24dp',
            size: 25,
            color: themes.default.palette.neutral.neu400,
            label: 'Filter',
          },
          submenu: [],
        },
        {
          menu: 'Download',
          icon: {
            name: 'file_upload_black_24dp-1',
            size: 25,
            color: themes.default.palette.neutral.neu400,
            label: 'Download',
          },
          submenu: [],
        },
      ],
      cardExtraProps: {
        title_color: themes.default.palette.text.tex600,
        bottom_border_color: themes.default.palette.neutral.neu100,
        background_color: themes.default.palette.background.bacopWhite,
        backgroundColor: themes.default?.palette?.background?.bacopWhite,
      },
    },
    chartData: {
      data: response.payload.data,
      columnResizable: true,
      pagination: true,
      height: inputData?.data?.widgetHeight,
      width: inputData?.data.widgetWidth,
      fontData: inputData.fontData,
      chartProps: {
        chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
        chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
        bar_thickness: 25,
        axis_border_Color: themes.default?.palette?.neutral?.neu100,
        display_grid: { x: true, y: false },
        axis_ticks_color: themes.default?.palette?.text?.tex400,
        background_color: themes.default?.palette?.background?.bacopWhite,
        legend_text_color: themes.default?.palette?.text?.tex600,
        backgroundColor: themes.default?.palette?.background?.bacopWhite,
      },
    },
    cardProps: {},
  };
  return dataResponse;
};
