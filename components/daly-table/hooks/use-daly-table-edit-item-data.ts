import { startOfMinute } from "date-fns";
import { useState } from "react";
import { useAppDispatch } from "../../../redux";
import { errorModalActions } from "../../error-modal";
import { ResultsThunkExecute, useThunk } from "../../use-thunk";
import { EditableRow } from "../components/EditableRow";
import { dalyTableThunks } from "../daly-table-slice";
import { CreateEditResultStatuses, IEditedDalyItem, IEditItemData, IFullDalyItem } from "../daly-table-types";

export const useDalyTableEditItemData = (setVisibleEditForm: (visible: boolean) => void): IEditItemData => {
    const [editFormData, setEditFormData] = useState<{
        timeStart: string,
        timeEnd: string,
        keyTask: number,
        desctiption: string
    }>(null);
    const [keyEditItem, setKeyEditItem] = useState<number>();

    const [editItem] = useThunk({
        thunkCreator: dalyTableThunks.fetchEditItem,
        titleError: 'Ошибка при редактировании записи'
    });

    const dispatch = useAppDispatch();

    const components = {
        body: {
            row: EditableRow
        },
    };

    const onRow = (record: IFullDalyItem) => ({
        onClick() {
            setEditFormData({
                timeStart: record.timeStart,
                timeEnd: record.timeEnd,
                desctiption: record.desctiption,
                keyTask: record.keyTask
            });
            setKeyEditItem(record.key);
            setVisibleEditForm(true);
        }
    });

    const onCancel = () => {
        setEditFormData(null);
        setKeyEditItem(null);
        setVisibleEditForm(false);
    };

    const onCreate = (newDalyItem: IEditedDalyItem) => {
        return new Promise<CreateEditResultStatuses>(async (resolve) => {
            if(Object.getOwnPropertyNames(newDalyItem).every(
                key => newDalyItem[key] === editFormData[key]
            )) {
                resolve(CreateEditResultStatuses.noChanges);
                return;
            }

            const result = await editItem({
                key: keyEditItem,
                timeStart: newDalyItem.timeStart,
                timeEnd: newDalyItem.timeEnd,
                desctiption: newDalyItem.desctiption,
                keyTask: newDalyItem.keyTask
            });

            switch(result) {
                case ResultsThunkExecute.success: {
                    setVisibleEditForm(false);
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
        })
    };

    const createEditModalFormInitValues = {
        desctiption: editFormData?.desctiption,
        keyTask: editFormData?.keyTask,
        timeEnd: editFormData ? startOfMinute(new Date(editFormData.timeEnd)).toUTCString() : null,
        timeStart: editFormData ? startOfMinute(new Date(editFormData.timeStart)).toUTCString() : null
    };

    return {
        dalyTableProps: { onRow, components },
        editModalFormProps: {
            onCancel,
            onCreate,
            initialValues: createEditModalFormInitValues,
            isEdit: true
        }
    };
}