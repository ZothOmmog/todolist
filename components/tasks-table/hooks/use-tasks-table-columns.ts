import { ColumnsType } from 'antd/lib/table';
import { format } from 'date-fns';
import { IAgregateTaskInfo } from '../tasks-table-types';

export const useTasksTableColumns = () => {
    const columns: ColumnsType<IAgregateTaskInfo> = [
        {
            title: 'Номер таска',
            dataIndex: 'key',
            align: 'right',
            defaultSortOrder: 'ascend',
            width: 200
        },
        {
            title: 'Продолжительность работы общая',
            dataIndex: 'durationAll',
            align: 'right',
            width: 400
        },
        {
            title: `Продолжительность работы сегодня (${format(new Date(), 'dd.MM.yyyy')})`,
            dataIndex: 'durationToday',
            align: 'right',
            width: 400
        }
    ];
    return columns;
}