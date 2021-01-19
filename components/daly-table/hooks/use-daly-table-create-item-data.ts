import { compareAsc, startOfDay, startOfMinute } from "date-fns";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux";
import { errorModalActions } from "../../error-modal";
import { useThunk, ResultsThunkExecute } from "../../../helpers/use-thunk";
import { IDalyItemForFetch, IDalyTableItemTask } from "../daly-table-slice";
import { dalyTableThunks } from "../daly-table-slice/daly-table-thunks";
import { ICreateItemData, IInitValuesCreate } from "../daly-table-types";
import { CreateEditResultStatuses } from '../daly-table-types';

export const useDalyTableCreateItemData = (
    dalyItems: IDalyTableItemTask[],
    setVisibleCreateModalForm: (visible: boolean) => void
): ICreateItemData => {
    const [createModalFormInitValues, setCreateModalFormInitValues] = useState<IInitValuesCreate>();

    const [createItem] = useThunk({
        thunkCreator: dalyTableThunks.fetchDalyItemAdded,
        titleError: 'Ошибка при попытке создать новую запись'
    });

    const dispatch = useAppDispatch();

    const onCancel = () => {
        setVisibleCreateModalForm(false);
    };
    
    const onCreate = (dalyItem: IDalyItemForFetch) => new Promise<CreateEditResultStatuses.success | CreateEditResultStatuses.error>(async (resolve) => {
        const result = await createItem(dalyItem);

        switch(result) {
            case ResultsThunkExecute.success: {
                setVisibleCreateModalForm(false);
                resolve(CreateEditResultStatuses.success);
                break;
            }
            case ResultsThunkExecute.error: {
                resolve(CreateEditResultStatuses.error);
                break;
            }
            default: {
                dispatch(errorModalActions.showError({ 
                    title: 'Ошибка при редактировании записи',
                    message: `Ожидается, что промис при редактировании элемента может разрешится, 
                    как ${ResultsThunkExecute.success} или ${ResultsThunkExecute.error}. Зафиксировано ${result}`
                }));

                resolve(CreateEditResultStatuses.error);
                break;
            }
        }
    });

    useEffect(() => {
        if (dalyItems && dalyItems.length !== 0) {
            const dalyItemsSorted = dalyItems.sort(
                (itemA, itemB) => compareAsc(new Date(itemA.timeStart), new Date(itemB.timeStart))
            );
            const dalyItemLast = dalyItemsSorted[dalyItemsSorted.length - 1];
            setCreateModalFormInitValues({
                keyTask: dalyItemLast.keyTask,
                timeStart: startOfDay(new Date(dalyItemLast.timeStart)) === startOfDay(new Date())
                    ? startOfMinute(new Date(dalyItemLast.timeStart)).toUTCString()
                    : startOfMinute(new Date()).toUTCString(),
                timeEnd: startOfMinute(new Date()).toUTCString(),
            });
        }
    }, [dalyItems]);

    return {
        createButtonProps: {
            onClick() {
                setVisibleCreateModalForm(true);
            }
        },
        createModalFormProps: {
            onCancel,
            onCreate,
            initialValues: createModalFormInitValues,
            isEdit: false
        }
    };
}