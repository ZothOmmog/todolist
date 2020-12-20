import { compareAsc, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { fetchErrors } from "../../../common-types";
import { useAppDispatch } from "../../../redux";
import { dalyTableActions, dalyTableThunks, IDalyItemForFetch, IDalyTableItemTask } from "../daly-table-slice";
import { ICreateItemData, IInitValuesCreate } from "../daly-table-types";

export const useDalyTableCreateItemData = (
    dalyItems: IDalyTableItemTask[],
    setVisibleCreateModalForm: (visible: boolean) => void
): ICreateItemData => {
    const [createModalFormInitValues, setCreateModalFormInitValues] = useState<IInitValuesCreate>();
    const dispatch = useAppDispatch();

    const onCancel = () => {
        setVisibleCreateModalForm(false);
        dispatch(dalyTableActions.cancelAddItem());
    };
    
    const onCreate = (dalyItem: IDalyItemForFetch) => {
        return new Promise<0>(async (resolve, reject) => {
            const result = await dispatch(dalyTableThunks.fetchDalyItemAdded(dalyItem));

            if (result.payload === fetchErrors.common) reject();
            else {
                setVisibleCreateModalForm(false);
                resolve(0);
            }
        })
    };

    useEffect(() => {
        if (dalyItems) {
            const dalyItemsSorted = dalyItems.sort(
                (itemA, itemB) => compareAsc(new Date(itemA.timeStart), new Date(itemB.timeStart))
            );
            const dalyItemLast = dalyItemsSorted[dalyItemsSorted.length - 1];

            setCreateModalFormInitValues({
                keyTask: dalyItemLast.keyTask,
                timeStart: startOfDay(new Date(dalyItemLast.timeStart)) === startOfDay(new Date())
                    ? dalyItemLast.timeStart
                    : new Date().toUTCString(),
                timeEnd: new Date().toUTCString(),
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