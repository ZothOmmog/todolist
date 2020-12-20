import { useState } from "react";
import { fetchErrors } from "../../common-types";
import { useAppDispatch } from "../../redux";
import { EditableRow } from "./components/EditableRow";
import { dalyTableThunks } from "./daly-table-slice";
import { IEditedDalyItem, IEditItemData, IFullDalyItem } from "./daly-table-types";

export const useDalyTableEditItemData = (setVisibleEditForm: (visible: boolean) => void): IEditItemData => {
    const [editFormData, setEditFormData] = useState<{
        timeStart: string,
        timeEnd: string,
        keyTask: number,
        desctiption: string
    }>(null);
    const [keyEditItem, setKeyEditItem] = useState<number>();

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

    const dispatch = useAppDispatch();
    const onCreate = (newDalyItem: IEditedDalyItem) => {
        return new Promise<0 | 1>(async (resolve, reject) => {
            if(Object.getOwnPropertyNames(newDalyItem).every(
                key => newDalyItem[key] === editFormData[key]
            )) resolve(1);
            else {
                const value = await dispatch(dalyTableThunks.fetchEditItem({
                    key: keyEditItem,
                    timeStart: newDalyItem.timeStart,
                    timeEnd: newDalyItem.timeEnd,
                    desctiption: newDalyItem.desctiption,
                    keyTask: newDalyItem.keyTask
                }));

                if (value.payload === fetchErrors.common) reject();
                else {
                    setVisibleEditForm(false);
                    resolve(0);
                }
            }
        })
    };

    const createEditModalFormInitValues = {
        desctiption: editFormData?.desctiption,
        keyTask: editFormData?.keyTask,
        timeEnd: editFormData?.timeEnd,
        timeStart: editFormData?.timeStart
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