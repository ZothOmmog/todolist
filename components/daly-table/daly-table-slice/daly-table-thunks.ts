import { dalyTableApi } from "../../../api/daly-table-api";
import { normalizeTodosFromDb } from "../../../helpers/normalize-todos-from-db";
import { AppThunk } from "../../../redux";
import { dalyTableActions } from "./daly-table-slice";

export const dalyTableThunks = {
    fetchDalyItems: (): AppThunk => async (dispatch) => {
        dispatch(
            dalyTableActions.dalyItemsChanged(
                normalizeTodosFromDb(await dalyTableApi.getAll())
            )
        );
    }
}