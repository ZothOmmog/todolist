import { Table } from "antd";
import { useTasksTableColumns } from "./hooks";
import { IAgregateTaskInfo } from "./tasks-table-types";

export const TasksTable = () => {
    const columns = useTasksTableColumns();
    const MOCK_DATA: IAgregateTaskInfo[] = [
        {
            key: 1234,
            durationAll: 800,
            durationToday: 90
        },
        {
            key: 4321,
            durationAll: 400,
            durationToday: 180
        },
        {
            key: 2345,
            durationAll: 350,
            durationToday: 60
        },
        {
            key: 5432,
            durationAll: 520,
            durationToday: 200
        },
        {
            key: 3456,
            durationAll: 420,
            durationToday: 300
        },
        {
            key: 6435,
            durationAll: 700,
            durationToday: 200
        },
    ];

    return (
        <Table<IAgregateTaskInfo>
            columns={columns}
            dataSource={MOCK_DATA}
            className='daly-table'
            pagination={false}
            bordered
        />
    );
}