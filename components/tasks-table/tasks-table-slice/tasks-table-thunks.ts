import { getAgreateTasksData } from "../../../api/tasks-table-api";
import { AppThunk } from "../../../redux";
import { errorModalActions } from "../../error-modal";
import { IAgregateTaskInfo } from "../tasks-table-types";
import { tasksTableActions } from "./tasks-table-slice";

export const tasksTableThunks = {
    fetchAll: (): AppThunk => async dispatch => {
        let isError = false;
        let tasksInfo: IAgregateTaskInfo[];

        try {
            tasksInfo = await getAgreateTasksData();
        }
        catch(e) {
            dispatch(errorModalActions.showError({ 
                title: 'Ошибка при запросе агрегированной информации по таскам',
                message: e.message
            }));
            isError = true;
        }

        if (isError) return;

        dispatch(tasksTableActions.setAll(tasksInfo));
    }
};