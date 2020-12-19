interface IInitValuesEdit {
    timeStart: string,
    timeEnd: string,
    keyTask: number,
    desctiption: string
}

interface IInitValuesCreate {
    timeStart: string,
    timeEnd: string,
    keyTask: number
}

export type InitialValues = IInitValuesCreate | IInitValuesEdit;