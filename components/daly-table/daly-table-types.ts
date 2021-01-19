import { IDalyItemForFetch } from "./daly-table-slice";

export interface IInitValuesEdit {
    timeStart: string,
    timeEnd: string,
    keyTask: number,
    desctiption: string
}

export interface IInitValuesCreate {
    timeStart: string,
    timeEnd: string,
    keyTask: number
}

export type InitialValues = IInitValuesCreate | IInitValuesEdit;

export enum CreateEditResultStatuses {
    success,
    noChanges,
    error
}

export interface ICreateModalFormProps {
    onCancel: () => void,
    onCreate: (dalyItem: IDalyItemForFetch) => Promise<CreateEditResultStatuses.success | CreateEditResultStatuses.error>,
    initialValues: IInitValuesCreate,
    isEdit: boolean
}

export interface ICreateModalFormPropsFull extends ICreateModalFormProps {
    visible: boolean
}

export interface ICreateItemData {
    createButtonProps: {
        onClick: () => void
    },
    createModalFormProps: ICreateModalFormProps
}

export interface IEditedDalyItem extends IInitValuesEdit {}

export interface IFullDalyItem extends IInitValuesEdit {
    key: number
}

export interface IEditModalFormProps {
    onCancel: () => void,
    onCreate: (dalyItem: IEditedDalyItem) => Promise<CreateEditResultStatuses>,
    initialValues: IInitValuesEdit,
    isEdit: boolean
}

export interface IEditModalFormPropsFull extends IEditModalFormProps {
    visible: boolean
}

export interface IEditItemData {
    dalyTableProps: {
        onRow: (record: IFullDalyItem) => ({
            onClick: () => void
        });
        components: {
            body: {
                row: React.FC<unknown>
            },
        }
    }
    editModalFormProps: IEditModalFormProps
}

export type ICreateEditModalFormProps = IEditModalFormPropsFull | ICreateModalFormPropsFull;

export enum FormTypes {
    Empty,
    Create,
    Edit
}