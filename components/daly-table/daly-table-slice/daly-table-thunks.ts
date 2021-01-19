import { dalyTableApi } from "../../../api/daly-table-api";
import { normalizeTodosFromDb } from "../../../helpers/normalize-todos-from-db";
import { AppThunk } from "../../../redux";
import { dalyTableActions } from "./daly-table-slice";
import { IDalyItemForFetch, IDalyTableItemTaskDB } from "./daly-table-slice-types";

export const dalyTableThunks = {
    fetchDalyItems: (): AppThunk => async (dispatch) => {
        dispatch(
            dalyTableActions.dalyItemsChanged(
                normalizeTodosFromDb(await dalyTableApi.getAll())
            )
        );
    },
    fetchDalyItemAdded: (dalyItem: IDalyItemForFetch): AppThunk => async (dispatch) => {
        const result = await dalyTableApi.addTask(dalyItem);
        dispatch(
            dalyTableActions.dalyItemsChanged(
                normalizeTodosFromDb(result)
            )
        );
    },
    fetchEditItem: (editedItem: IDalyTableItemTaskDB): AppThunk => async (dispatch) => {
        const result = await dalyTableApi.updateTask(editedItem);
        dispatch(
            dalyTableActions.dalyItemsChanged(
                normalizeTodosFromDb(result)
            )
        );
    }
}