/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {HeatMap} from '@iocraft/component-library';
import {TextField, Typography, useTheme} from '@mui/material';
import {
    barData,
    bubbleData,
    doughnutData,
    lineData,
    piechartData,
    polarData,
    radarData,
    scatterData,
} from 'apps/view-page/src/fake-db/scatterData';
import {useEffect, useState} from 'react';
import {IWidget} from '../store/widgetsSlice';
import {
    constBarchartLabel,
    constBarChartType,
    constHorizontalBarChartType,
    constLineChartLabel,
    constLineChartWithFilled,
    constLineChartWithTension,
    constLineChartWithTensionFilled,
    constStackHorizontalBarChartType,
    constStackHorizontalFullBarChart,
    constStackVerticalBarChartType,
    constStackVerticalFullBarChartType,
} from 'apps/view-page/src/utils/constantString';
import {BarChartComponent} from '../componentList.tsx/BarChartComponent';
import {BubbleChartComponent} from '../componentList.tsx/BubbleChartComponent';
import {CardComponent} from '../componentList.tsx/CardComponent';
import {DataGridComponent} from '../componentList.tsx/DataGridComponent';
import {DoughnutChartComponent} from '../componentList.tsx/DoughnutChartComponent';
import {HorizontalBarChartComponent} from '../componentList.tsx/HorizontalBarChartComponent';
import {LineChartComponent} from '../componentList.tsx/LineChart';
import {LineChartFilledComponent} from '../componentList.tsx/LineChartFilled';
import {LineChartTensionFilledComponent} from '../componentList.tsx/LineChartTensionFilled';
import {LineChartWithTensionComponent} from '../componentList.tsx/LineChartWithTension';
import {PieChartComponent} from '../componentList.tsx/PieChartComponent';
import {PolarChartComponent} from '../componentList.tsx/PolarComponent';
import {RadarChartComponent} from '../componentList.tsx/RadarComponent';
import {ScatterChartComponent} from '../componentList.tsx/ScatterChartComponent';
import {StackHorizontalBarChart} from '../componentList.tsx/StackHorizontalBarChart';
import {StackHorizontalFullBarChart} from '../componentList.tsx/StackHorizontalFullBarChart';
import {StackVerticalBarChart} from '../componentList.tsx/StackVerticalBarChart';
import {StackVerticalFullBarChart} from '../componentList.tsx/StackVerticalFullBarChart';
import LoadingData from './LoadingData';

export interface IWidgetProps {
    rawWidget: IWidget[];
}

export interface IComponent {
    component?: any;
    props: any;
    label: string;
    w?: number;
    h?: number;
    x?: number;
    y?: number;
}

export interface IWidgetFormProps {
    key: string;
    value: string;
}

export interface IWidgetType {
    id: string;
    type: string;
    data: IComponent;
}

const ScatterData = scatterData;
const BarData: any = barData;
const BubbleData: any = bubbleData;
const PolarData: any = polarData;
const DouhnutData: any = doughnutData;
const PiechartData: any = piechartData;
const RadarData: any = radarData;
const LineData: any = lineData;

const fakeData = false;

export const WIDGETS_V1: IWidgetType[] = [
    {
        id: '0',
        type: 'card',
        data: {
            component: (props: any) => {
                return <CardComponent {...props} />;
            },
            props: {},
            label: 'Card',
            w: 4,
            h: 2,
            x: 4,
            y: 10,
        },
    },
    {
        id: '1',
        type: 'grid',
        data: {
            component: (props: any) => {
                return <DataGridComponent {...props} />;
            },
            props: {},
            label: 'Grid',
            w: 6,
            h: 4,
            x: 4,
            y: 10,
        },
    },
    {
        id: '2',
        type: constBarChartType,
        data: {
            component: (props: any) => {
                return <BarChartComponent {...props} />;
            },
            props: {},
            label: 'Bar Chart',
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '3',
        type: 'radarchart',
        data: {
            component: (props: any) => {
                return <RadarChartComponent {...props} />;
            },
            props: {},
            label: 'Radar Chart',
            x: 0,
            y: 5,
            w: 3,
            h: 4,
        },
    },
    {
        id: '4',
        type: 'doughnutchart',
        data: {
            component: (props: any) => {
                return <DoughnutChartComponent {...props} />;
            },
            props: {},
            label: 'Doughnut Chart',
            x: 0,
            y: 5,
            w: 3,
            h: 4,
        },
    },
    {
        id: '5',
        type: 'piechart',
        data: {
            component: (props: any) => {
                return <PieChartComponent {...props} />;
            },
            props: {},
            label: 'Pie Chart',
            x: 0,
            y: 5,
            w: 3,
            h: 4,
        },
    },

    {
        id: '6',
        type: 'linechart',
        data: {
            component: (props: any) => {
                return <LineChartComponent {...props} />;
            },
            props: {},
            label: 'Line Chart',
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '7',
        type: 'scatterchart',
        data: {
            component: (props: any) => {
                return <ScatterChartComponent {...props} />;
            },
            props: {},
            label: 'Scatter Chart',
            x: 0,
            y: 5,
            w: 6,
            h: 7,
        },
    },
    {
        id: '8',
        type: 'heatmapchart',
        data: {
            component: (props: any) => {
                return props ? (
                    <HeatMap
                        columnAxisLabel={[]}
                        data={[]}
                        rowAxisLabel={[]}
                        threshold={[]}
                        colLabel={''}
                        rowLabel={''}
                    />
                ) : (
                    // <HeatMap
                    //   columnAxisLabel={props.columnAxisLabel || []}
                    //   data={props.data || []}
                    //   rowAxisLabel={props.rowAxisLabel || []}
                    //   threshold={props.threshold || []}
                    //   colLabel={props.colLabel || ''}
                    //   rowLabel={props.rowLabel || ''}
                    // />
                    // <></>
                    <HeatMap
                        columnAxisLabel={[]}
                        data={[]}
                        rowAxisLabel={[]}
                        threshold={[]}
                        colLabel=""
                        rowLabel=""
                    />
                );
            },
            props: {},
            label: 'Heat Map Chart',
            x: 0,
            y: 5,
            w: 10,
            h: 5,
        },
    },
    {
        id: '9',
        type: 'polarchart',
        data: {
            component: (props: any) => {
                return <PolarChartComponent {...props} />;
            },
            props: {},
            label: 'Polar Chart',
            x: 0,
            y: 5,
            w: 6,
            h: 8,
        },
    },
    {
        id: '9',
        type: 'bubblechart',
        data: {
            component: (props: any) => {
                return <BubbleChartComponent {...props} />;
            },
            props: {},
            label: 'Bubble Chart',
            x: 0,
            y: 5,
            w: 6,
            h: 7,
        },
    },
    {
        id: '12',
        type: constStackVerticalBarChartType,
        data: {
            component: (props: any) => {
                return <StackVerticalBarChart {...props} />;
            },
            props: {},
            label: constBarchartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '13',
        type: constStackVerticalFullBarChartType,
        data: {
            component: (props: any) => {
                return <StackVerticalFullBarChart {...props} />;
            },
            props: {},
            label: constBarchartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '14',
        type: constStackHorizontalBarChartType,
        data: {
            component: (props: any) => {
                return <StackHorizontalBarChart {...props} />;
            },
            props: {},
            label: constBarchartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '15',
        type: constStackHorizontalFullBarChart,
        data: {
            component: (props: any) => {
                return <StackHorizontalFullBarChart {...props} />;
            },
            props: {},
            label: constBarchartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '16',
        type: constLineChartWithTension,
        data: {
            component: (props: any) => {
                return <LineChartWithTensionComponent {...props} />;
            },
            props: {},
            label: constLineChartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '17',
        type: constLineChartWithFilled,
        data: {
            component: (props: any) => {
                return <LineChartFilledComponent {...props} />;
            },
            props: {},
            label: constLineChartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '18',
        type: constLineChartWithTensionFilled,
        data: {
            component: (props: any) => {
                return <LineChartTensionFilledComponent {...props} />;
            },
            props: {},
            label: constLineChartLabel,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: '19',
        type: constHorizontalBarChartType,
        data: {
            component: (props: any) => {
                return <HorizontalBarChartComponent {...props} />;
            },
            props: {},
            label: constHorizontalBarChartType,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
    {
        id: 'noDataFound',
        type: 'any',
        data: {
            component: (props: any) => {
                return <LoadingData/>;
            },
            props: {},
            label: constHorizontalBarChartType,
            x: 0,
            y: 5,
            w: 6,
            h: 4,
        },
    },
];

const makeSerializedWidget = (widgetData: IWidget[]): any => {
    const serializeWidgets: any = [];

    if (widgetData && widgetData.length) {
        for (let i = 0; i < widgetData.length; i += 1) {
            const dataObj = WIDGETS_V1.filter(
                (value: any) => value.type === widgetData[i].type
            );
            if (dataObj && dataObj.length > 0 && dataObj[0].data) {
                const payload = {
                    id: (i + 100).toString(),
                    type: widgetData[i].type,
                    data: JSON.parse(JSON.stringify(dataObj[0].data)),
                };
                serializeWidgets.push(payload);
            }
        }
    }
    return serializeWidgets;
};

export default function Widgets(props: IWidgetProps) {
    const theme = useTheme();
    const [dragableWidgets, setDragableWidgets] = useState(WIDGETS_V1);
    const [_dragableWidgets, _setDragableWidgets] = useState(WIDGETS_V1);

    useEffect(() => {
        const w2: IWidgetType[] = makeSerializedWidget(props.rawWidget);
    }, [props, props.rawWidget]);

    return (
        <div className="sticky top-0 w-full h-full flex flex-col border-box">
            <Typography className="ml-2" variant="h5">
                Add Widgets
            </Typography>

            <div>
                <TextField
                    className="m-2"
                    size="small"
                    variant="outlined"
                    placeholder="Search"
                    onChange={(e) => {
                        setDragableWidgets(
                            e.target.value === ''
                                ? _dragableWidgets
                                : dragableWidgets.filter((widget: any) =>
                                    widget.data.label
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase())
                                )
                        );
                    }}
                />
            </div>
        </div>
    );
}
