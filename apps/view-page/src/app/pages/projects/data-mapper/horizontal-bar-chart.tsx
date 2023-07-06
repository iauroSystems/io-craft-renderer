import {cardheaderData} from 'apps/view-page/src/fake-db/scatterData';
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

export const HorizontalBarChartDataMapping = (
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
            title: inputData.data?.formData?.Title || inputData.data?.type,
            actions: cardheaderData.actions,
        },
        chartData: {
            data: response.payload.data,
            horizontal: true,

            stacked: false,
            xLabel: inputData?.data?.formData?.properties?.X_axis_label || '',
            yLabel: inputData?.data?.formData?.properties?.Y_axis_label || '',
            fontData: inputData.fontData,
            chartProps: {
                chartjs_default_color: themes.default?.palette?.background?.bacopWhite,
                chartjs_grid_color: themes.default?.palette?.neutral?.neu100,
                bar_thickness: 25,
                axis_border_Color: themes.default?.palette?.neutral?.neu100,
                display_grid: {x: true, y: false},
                axis_ticks_color: themes.default?.palette?.text?.tex400,
                background_color: themes.default?.palette?.background?.bacopWhite,
                legend_text_color: themes.default?.palette?.text?.tex600,
            },
        },
        cardProps: {},
    };
    return dataResponse.chartData;
};
