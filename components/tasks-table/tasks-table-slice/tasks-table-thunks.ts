import { getAgreateTasksData } from "../../../api/tasks-table-api";
import { AppThunk } from "../../../redux";
import { tasksTableActions } from "./tasks-table-slice";

const tasksTableThunks = {
    fetchAll: (): AppThunk => async dispatch => {
        try {
            const tasksInfo = await getAgreateTasksData();
        }
        catch(e) {
            
        }
    }
};