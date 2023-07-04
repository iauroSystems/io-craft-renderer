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

export const DoughnutChartDataMapping = (
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
    response.payload.data.datasets
  ) {
    response.payload.data.datasets.map((element: any, index: number) => {
      const bgColorArr = [];
      for (let i = 0; i < response.payload.data.labels.length; i += 1) {
        const color = themeObj.palette?.[`systemColor${i + 1}`]?.sys300Main
          ? themeObj.palette?.[`systemColor${i + 1}`]?.sys300Main
          : '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);

        bgColorArr.push(color);
      }
      return (element.backgroundColor = bgColorArr);
    });
  }

  dataResponse = {
    headerData: {
      title: inputData.data?.formData?.Title,
      actions: cardheaderData.actions,
    },
    chartData: {
      data: response.payload.data,
      legend: 'right',

      xLabel: inputData?.data?.formData?.properties?.X_axis_label,
      yLabel: inputData?.data?.formData?.properties?.Y_axis_label,
      fontData: inputData.fontData,
      chartProps: {
        doughnut_cutout: '80%',
        doughnut_radius: '70%',
        background_color: themes.default?.palette?.background?.bacopWhite,
        legend_text_color: themes.default?.palette?.text?.tex400,
      },
    },
    cardProps: {},
  };
  return dataResponse.chartData;
};
