export interface Response<T> {
    message: string
    data: T
    meta: object
}