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

export const BubbleChartDataMapping = (
  response: any,
  inputData: chartData
): any => {
  const themeObj: any = themes.default;
  let dataResponse: IDataResponse = {
    chartData: {},
    headerData: {},
    cardProps: {},
  };
  let finalObj: any = {
    labels: [],
    datasets: [],
  };

  if (
    response &&
    response.payload &&
    response.payload.data &&
    response.payload.data.datasets
  ) {
    const _rawData = JSON.parse(JSON.stringify(response.payload.data));
    for (let i = 0; i < _rawData.datasets.length; i += 1) {
      const newDataset = _rawData.datasets[i];
      const datasetDataArrBubble = [];

      for (let j = 0; j < newDataset.data.length; j += 1) {
        const obj = {
          x: +newDataset.data[j],
          y: +newDataset.data[j],
          r: Math.floor(Math.random() * 20),
        };
        datasetDataArrBubble.push(obj);
      }
      const datasetObj = {
        label: newDataset.label,
        data: datasetDataArrBubble,
        bgColor: themeObj.palette?.[`systemColor${i + 1}`]?.sys300Main
          ? themeObj.palette?.[`systemColor${i + 1}`]?.sys300Main
          : '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
        pointRadius: 5,
        borderColor: themeObj.palette?.[`systemColor${i + 1}`]?.sys300Main
          ? themeObj.palette?.[`systemColor${i + 1}`]?.sys300Main
          : '#dadce0',
      };
      finalObj.datasets.push(datasetObj);
      finalObj.labels = _rawData.labels;
    }
  }

  dataResponse = {
    headerData: {
      title: inputData.data?.formData?.Title,
      actions: cardheaderData.actions,
    },
    chartData: {
      data: finalObj,

      stacked: false,
      xLabel: inputData?.data?.formData?.properties?.X_axis_label,
      yLabel: inputData?.data?.formData?.properties?.Y_axis_label,
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
      },
    },
    cardProps: {},
  };
  return dataResponse.chartData;
};
