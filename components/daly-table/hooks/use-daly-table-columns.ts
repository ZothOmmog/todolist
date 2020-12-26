import { ColumnsType } from 'antd/lib/table';
import { format } from 'date-fns';
import { IDalyTableItemTask } from '../daly-table-slice';

export const useDalyTableColumns = () => {
    const renderTimeFromUtc = (dateStrUtc: string) => format(new Date(dateStrUtc), 'HH:mm');
    const columns: ColumnsType<IDalyTableItemTask> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            render: (dateStrUtc: string) => format(new Date(dateStrUtc), 'dd.MM.yyyy'),
            align: 'right'
        },
        {
            title: 'Номер таска',
            dataIndex: 'keyTask',
            align: 'right'
        },
        {
            title: 'Время начала',
            dataIndex: 'timeStart',
            render: renderTimeFromUtc,
            align: 'right'
        },
        {
            title: 'Время конца',
            dataIndex: 'timeEnd',
            render: renderTimeFromUtc,
            align: 'right'
        },
        {
            title: 'Описание',
            dataIndex: 'desctiption'
        }
    ];
    return columns;
};