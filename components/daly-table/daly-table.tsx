import React, { useEffect } from 'react';
import { Table } from 'antd';
import { dalyTableSelectors, dalyTableThunks, IDalyTableItemTask } from './daly-table-slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux';
import { CreateButton } from './create-button';
import { format } from 'date-fns';

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    return (
        <tr {...props} />
    );
}

export const DalyTable: React.FC = () => {
    const dataSource = useSelector(dalyTableSelectors.selectAll);
    
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
                onRow={(record, rowIndex) => ({
                    onClick() {
                        
                    }
                })}
            />
        </>
    )
}