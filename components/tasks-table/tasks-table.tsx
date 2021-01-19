import { Table } from "antd";
import { useFetch } from "../../helpers/use-fetch";
import { useTasksTableColumns } from "./hooks";
import { TasksTableSelectors } from "./tasks-table-slice/tasks-table-selectors";
import { tasksTableThunks } from "./tasks-table-slice/tasks-table-thunks";
import { IAgregateTaskInfo } from "./tasks-table-types";

export const TasksTable = () => {
    const columns = useTasksTableColumns();
    const { data, isLoading } = useFetch<IAgregateTaskInfo>(
        async dispatch => dispatch(tasksTableThunks.fetchAll()),
        TasksTableSelectors.selectAll
    );

    return (
        <Table<IAgregateTaskInfo>
            columns={columns}
            loading={isLoading}
            dataSource={data}
            className='daly-table'
            pagination={false}
            bordered
        />
    );
}