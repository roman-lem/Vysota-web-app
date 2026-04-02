import type { ElementDto } from "../model/element.types"

export interface ElementResponse {
    message:string
    data: ElementDto[]
    meta: object
}