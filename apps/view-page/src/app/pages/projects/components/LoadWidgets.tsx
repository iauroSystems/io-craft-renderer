import generateRandomString from 'apps/view-page/src/utils/randomString';
import React from 'react';
import GridCard from './gridCards';
import LoadingData from './LoadingData';
import {IComponent, IWidgetType, WIDGETS_V1} from './widgets';

type Props = {};

const LoadWidgets = (props: any) => {
    const getData = (widgetData: any): IComponent => {
        const index = WIDGETS_V1.findIndex(
            (value: IWidgetType) => value.type === widgetData.type
        );
        if (index !== -1) {
            return WIDGETS_V1[index].data;
        } else {
            return {
                component: () => <div>No Data Found</div>,
                props: {},
                label: 'noDataFound',
                w: 4,
                h: 4,
            };
        }
    };
    const {component: Widget, label} = getData(props.widget);

    return (
        <div>
            <GridCard
                key={props.widget.id}
                x={props.widget.x}
                y={props.widget.y}
                w={props.widget.w}
                h={props.widget.h}
                id={props.widget.id}
                type={props.widget.type}
                title={props.widget.data?.label || ''}
                selectedWidget={props.widget}
                data={props.widget.data}
                actions={{}}
                {...props.widget.data}
                editWidget={(data: any) => {
                }}
            >
                {props.widget.formProps ? (
                    <Widget
                        key={generateRandomString()}
                        headerData={props.widget.formProps.headerData}
                        chartData={props.widget.formProps.chartData}
                        actionClicked={(e: any) => {
                        }}
                        searchAction={(e: any) => {
                            console.log(e);
                        }}
                    />
                ) : (
                    <LoadingData/>
                )}
            </GridCard>
        </div>
    );
};

export default LoadWidgets;
