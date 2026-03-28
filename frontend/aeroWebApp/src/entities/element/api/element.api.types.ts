import type { Element } from "../model/element.types"

export interface ElementResponse {
    message:string
    data: Element[]
    meta: object
}