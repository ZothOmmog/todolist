export interface ErrorMessage {
    title: string,
    message: string
}

export interface IShowErrorAction {
    type: string,
    payload: ErrorMessage
}