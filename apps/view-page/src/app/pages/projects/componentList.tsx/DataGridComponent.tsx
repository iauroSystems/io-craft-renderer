import {DataGridV1} from '@iocraft/component-library';
import generateRandomString from 'apps/view-page/src/utils/randomString';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import LoadingData from '../components/LoadingData';
import {DataGridDataMapping} from '../data-mapper/data-grid';
import {getGridDataResource} from '../store/gridDataRenderSlice';

export const DataGridComponent = (props: any) => {
    const [tableData, setTableData] = useState<any>();
    const dispatch = useDispatch();
    useEffect(() => {
        new Promise((resolve, reject) => {
            if (props && props.rawData) {
                resolve(
                    dispatch(
                        getGridDataResource({
                            label: '',
                            report: props.rawData?.report || '',
                            widget_id: props.rawData.id || '',
                            projections: '',
                            filter: '',
                            size: '1000',
                            page: '0',
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
                const obj = DataGridDataMapping(
                    JSON.parse(JSON.stringify(response)),
                    JSON.parse(JSON.stringify(mapperPayload))
                );
                setTableData(obj);
            })
            .catch((err: any) => {
                console.log(err);
                return err;
            });
    }, []);

    return props ? (
        tableData && tableData?.chartData ? (
            <div
                key={generateRandomString()}
                style={{
                    height: 'calc(100% - 0px)',
                    width: 'calc(100% - 0px)',
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 100,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 100,
                        overflowX: 'auto',
                    }}
                >
                    <DataGridV1
                        key={generateRandomString()}
                        columnData={tableData?.chartData?.data?.columns || []}
                        rowData={tableData?.chartData?.data?.rows || []}
                        columnResizable={false}
                        pagination={tableData?.chartData?.pagination || false}
                        height={tableData.height || 300}
                        width={tableData.width || 500}
                        chartProps={tableData?.chartData?.chartProps}
                        menuClicked={tableData?.chartData?.menuClicked}
                        onSearchInput={tableData?.chartData?.onSearchInput}
                        rowClicked={props.rowClicked}
                    />
                </div>
            </div>
        ) : (
            <LoadingData/>
        )
    ) : (
        <DataGridV1
            columnData={[]}
            rowData={[]}
            columnResizable
            pagination={false}
            height={0}
            width={0}
        />
    );
};
