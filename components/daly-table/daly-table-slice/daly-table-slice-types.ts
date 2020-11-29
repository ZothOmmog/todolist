export interface IDalyTableItemTask {
    key: number,
    date: string,
    timeStart: string,
    timeEnd: string,
    keyTask: number,
    desctiption: string
}

export interface ISliceState {
    items: IDalyTableItemTask[]
}

export interface IDalyItemsReceivedAction {
    type: string,
    payload: IDalyTableItemTask[]
}

export interface IDalyItemForFetch {
    date: string,
    timeStart: string,
    timeEnd: string,
    keyTask: number,
    desctiption: string
}