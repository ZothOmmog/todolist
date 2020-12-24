import { RootState } from "../../../redux";
import { tasksTableAdapter } from './tasks-table-slice';

export const TasksTableSelectors = {
    ...tasksTableAdapter.getSelectors<RootState>(state => state.tasksTable)
}