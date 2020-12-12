import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { dalyTableSelectors, dalyTableThunks, IDalyTableItemTask } from './daly-table-slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux';
import { CreateButton } from './create-button';
import { addHours, format, startOfDay } from 'date-fns';
import moment, { Moment } from 'moment';
import { CreateEditModalForm } from './create-edit-modal-form';
import { fetchErrors } from '../../common-types';
import { timeEnd } from 'console';

const EditableRow: React.FC<unknown> = (props) => {
    return (
        <tr {...props} style={{ cursor: 'pointer' }} />
    );
}

export const DalyTable: React.FC = () => {
    const dataSource = useSelector(dalyTableSelectors.selectAll);
    const [visibleEditForm, setVisibleEditForm] = useState(false);
    const [editFormData, setEditFormData] = useState<{
        date: string,
        timeStart: string,
        timeEnd: string,
        keyTask: number,
        desctiption: string
    }>(null);
    const [keyEditItem, setKeyEditItem] = useState<number>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(dalyTableThunks.fetchDalyItems());
    }, []);

    const renderTimeFromUtc = (dateStrUtc: string) => format(new Date(dateStrUtc), 'HH:mm:ss');

    const columnsForTable = [
        {
            title: 'Дата',
            dataIndex: 'date',
            render: (dateStrUtc: string) => format(new Date(dateStrUtc), 'dd.MM.yyyy')
        },
        {
            title: 'Номер таска',
            dataIndex: 'keyTask'
        },
        {
            title: 'Время начала',
            dataIndex: 'timeStart',
            render: renderTimeFromUtc
        },
        {
            title: 'Время конца',
            dataIndex: 'timeEnd',
            render: renderTimeFromUtc
        },
        {
            title: 'Описание',
            dataIndex: 'desctiption'
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (_text: any, record: IDalyTableItemTask) => {
                
                return 'В разработке :)';
            }
        }
    ];

    const components = {
        body: {
            row: EditableRow
        },
    };

    return (
        <>
            <CreateButton
                initialValues={{
                    date: startOfDay(new Date()).toUTCString(),
                    keyTask: dataSource[dataSource.length - 1]?.keyTask,
                    timeStart: dataSource[dataSource.length - 1]?.timeEnd,
                    timeEnd: new Date().toUTCString()
                }}
            />
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                className='daly-table'
                bordered
                dataSource={dataSource}
                columns={columnsForTable}
                onRow={(record) => ({
                    onClick() {
                        setEditFormData({
                            date: record.date,
                            timeStart: record.timeStart,
                            timeEnd: record.timeEnd,
                            desctiption: record.desctiption,
                            keyTask: record.keyTask
                        });
                        setKeyEditItem(record.key);
                        setVisibleEditForm(true);
                    }
                })}
            />
            <CreateEditModalForm
                onCancel={() => {
                    setEditFormData(null);
                    setKeyEditItem(null);
                    setVisibleEditForm(false);
                }}
                onCreate={(newDalyItem) => {
                    return new Promise<0 | 1>(async (resolve, reject) => {
                        if(Object.getOwnPropertyNames(newDalyItem).every(
                            key => newDalyItem[key] === editFormData[key]
                        )) resolve(1);
                        else {
                            const value = await dispatch(dalyTableThunks.fetchEditItem({
                                key: keyEditItem,
                                date: newDalyItem.date,
                                timeStart: newDalyItem.timeStart,
                                timeEnd: newDalyItem.timeEnd,
                                desctiption: newDalyItem.desctiption,
                                keyTask: newDalyItem.keyTask
                            }));
    
                            if (value.payload === fetchErrors.common) reject();
                            else {
                                setVisibleEditForm(false);
                                resolve(0);
                            }
                        }
                    })
                }}
                visible={visibleEditForm}
                initialValues={{
                    date: editFormData?.date,
                    desctiption: editFormData?.desctiption,
                    keyTask: editFormData?.keyTask,
                    timeEnd: editFormData?.timeEnd,
                    timeStart: editFormData?.timeStart
                }}
                isEdit
            />
        </>
    )
}