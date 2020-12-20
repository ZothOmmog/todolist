import { ColumnsType } from 'antd/lib/table';
import { format } from 'date-fns';
import { IAgregateTaskInfo } from '../tasks-table-types';

export const useTasksTableColumns = () => {
    const columns: ColumnsType<IAgregateTaskInfo> = [
        {
            title: 'Номер таска',
            dataIndex: 'keyTask',
            align: 'right',
            defaultSortOrder: 'ascend'
        },
        {
            title: 'Общие временные затраны',
            dataIndex: 'spendingAll',
            align: 'right',
        },
        {
            title: `Временные затраты за сегодня (${format(new Date(), 'dd.MM.yyyy')})`,
            dataIndex: 'spendingToday',
            align: 'right',
        }
    ];
    return columns;
}