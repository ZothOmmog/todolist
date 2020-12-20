import { Table } from "antd";
import { useTasksTableColumns } from "./hooks";
import { IAgregateTaskInfo } from "./tasks-table-types";

export const TasksTable = () => {
    const columns = useTasksTableColumns();
    const MOCK_DATA: IAgregateTaskInfo[] = [
        {
            keyTask: 1234,
            spendingAll: '24:40:00',
            spendingToday: '4:00:00'
        },
        {
            keyTask: 4321,
            spendingAll: '24:40:00',
            spendingToday: '4:00:00'
        },
        {
            keyTask: 2345,
            spendingAll: '24:40:00',
            spendingToday: '4:00:00'
        },
        {
            keyTask: 5432,
            spendingAll: '8:40:00',
            spendingToday: '4:00:00'
        },
        {
            keyTask: 3456,
            spendingAll: '24:40:00',
            spendingToday: '4:00:00'
        },
        {
            keyTask: 6435,
            spendingAll: '24:40:00',
            spendingToday: '4:00:00'
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={MOCK_DATA}
            className='daly-table'
            bordered
        />
    );
}