import { Table } from "antd";
import { DetailTasksTable } from "./components";
import { useTasksTableColumns } from "./hooks";
import { IAgregateTaskInfo } from "./tasks-table-types";

export const TasksTable = () => {
    const columns = useTasksTableColumns();
    const MOCK_DATA: IAgregateTaskInfo[] = [
        {
            key: 1234,
            durationAll: '24:40:00',
            durationToday: '4:00:00'
        },
        {
            key: 4321,
            durationAll: '24:40:00',
            durationToday: '4:00:00'
        },
        {
            key: 2345,
            durationAll: '24:40:00',
            durationToday: '4:00:00'
        },
        {
            key: 5432,
            durationAll: '8:40:00',
            durationToday: '4:00:00'
        },
        {
            key: 3456,
            durationAll: '24:40:00',
            durationToday: '4:00:00'
        },
        {
            key: 6435,
            durationAll: '24:40:00',
            durationToday: '4:00:00'
        },
    ];

    return (
        <Table<IAgregateTaskInfo>
            columns={columns}
            dataSource={MOCK_DATA}
            className='daly-table'
            expandable={{
                expandedRowRender: record => <DetailTasksTable keyTask={record.key} />
            }}
            pagination={false}
            bordered
        />
    );
}