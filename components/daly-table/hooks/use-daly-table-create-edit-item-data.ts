import { useState } from "react";
import { IDalyTableItemTask } from "../daly-table-slice";
import { FormTypes, ICreateModalFormPropsFull, IEditModalFormPropsFull } from "../daly-table-types";
import { useDalyTableCreateItemData } from "./use-daly-table-create-item-data";
import { useDalyTableEditItemData } from "./use-daly-table-edit-item-data";

export const useDalyTableCreateEditItemData = (dataSource: IDalyTableItemTask[]) => {
    const [visibleCreateEditModalForm, setVisibleCreateEditModalForm] = useState(false);
    const [formType, setFormType] = useState(FormTypes.Empty);

    const setVisibleCreateModalForm = (visible: boolean) => {
        setFormType(FormTypes.Create);
        setVisibleCreateEditModalForm(visible);
    }

    const setVisibleEditModalForm = (visible: boolean) => {
        setFormType(FormTypes.Edit);
        setVisibleCreateEditModalForm(visible);
    }

    const { createButtonProps, createModalFormProps } = useDalyTableCreateItemData(dataSource, setVisibleCreateModalForm);
    const { dalyTableProps, editModalFormProps } = useDalyTableEditItemData(setVisibleEditModalForm);

    let createEditModalForm: ICreateModalFormPropsFull | IEditModalFormPropsFull = null;
    switch(formType) {
        case FormTypes.Create:
            createEditModalForm = {
                ...createModalFormProps,
                visible: visibleCreateEditModalForm
            };
            break;
        case FormTypes.Edit:
            createEditModalForm = {
                ...editModalFormProps,
                visible: visibleCreateEditModalForm
            };
            break;
    }

    return { createButtonProps, createEditModalForm, dalyTableProps };
}