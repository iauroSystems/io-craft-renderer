import {StatCard} from '@iocraft/component-library';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import LoadingData from '../components/LoadingData';
import {SimpleCardDataMapping} from '../data-mapper/card';
import {getChartDataResource} from '../store/gridDataRenderSlice';

export const CardComponent = (props: any) => {
    const [chartData, setChartData] = useState<any>();
    const dispatch = useDispatch();

    useEffect(() => {
        new Promise((resolve, reject) => {
            if (props && props.rawData) {
                resolve(
                    dispatch(
                        getChartDataResource({
                            label: '' || props.rawData.label || '',
                            report: '' || props.rawData.report || '',
                            widget_id: '' || props.rawData.id,
                        })
                    )
                );
            } else {
                const obj = {
                    payload: {
                        data: [],
                    },
                };
                resolve(obj);
            }
        })
            .then((response: any) => {
                const mapperPayload: any = {
                    data: props.rawData,
                    fontData: {},
                };
                const obj = SimpleCardDataMapping(
                    props.rawData,
                    mapperPayload,
                    response
                );
                setChartData(obj);
            })
            .catch((err: any) => {
                console.log(err);
                return err;
            });
    }, []);

    return props ? (
        chartData ? (
            <StatCard
                data={chartData?.data}
                chartProps={chartData?.chartProps}
                onChartClick={props.onChartClick}
            />
        ) : (
            <LoadingData/>
        )
    ) : (
        <StatCard data={{}}/>
    );
};
