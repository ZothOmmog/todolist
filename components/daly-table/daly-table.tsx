import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { dalyTableSelectors, dalyTableThunks, IDalyTableItemTask } from './daly-table-slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux';
import { CreateButton } from './create-button';
import { format } from 'date-fns';
import moment, { Moment } from 'moment';
import { CreateEditModalForm } from './create-edit-modal-form';
import { fetchErrors } from '../../common-types';

const EditableRow: React.FC<unknown> = (props) => {
    return (
        <tr {...props} style={{ cursor: 'pointer' }} />
    );
}

export const DalyTable: React.FC = () => {
    const dataSource = useSelector(dalyTableSelectors.selectAll);
    const [visibleEditForm, setVisibleEditForm] = useState(false);
    const [editFormData, setEditFormData] = useState<{
        date: Moment,
        timeStart: Moment,
        timeEnd: Moment,
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
            <CreateButton />
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
                            date: moment(record.date),
                            timeStart: moment(record.timeStart),
                            timeEnd: moment(record.timeEnd),
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
                onCreate={() => {
                    return new Promise<void>((resolve, reject) => {
                        return dispatch(dalyTableThunks.fetchEditItem({
                            key: keyEditItem,
                            date: editFormData.date.toDate().toUTCString(),
                            timeStart: editFormData.timeStart.toDate().toUTCString(),
                            timeEnd: editFormData.timeEnd.toDate().toUTCString(),
                            desctiption: editFormData.desctiption,
                            keyTask: editFormData.keyTask
                        })).then((value) => {
                            if (value.payload === fetchErrors.common) reject();
                            else resolve();
                        });
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