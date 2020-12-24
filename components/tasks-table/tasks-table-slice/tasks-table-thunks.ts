import { getAgreateTasksData } from "../../../api/tasks-table-api";
import { AppThunk } from "../../../redux";
import { tasksTableActions } from "./tasks-table-slice";

export const tasksTableThunks = {
    fetchAll: (): AppThunk => async dispatch => {
        dispatch(tasksTableActions.setAll(await getAgreateTasksData()));
    }
};