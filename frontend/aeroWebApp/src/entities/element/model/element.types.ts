
export interface ElementDto {
    id: number
    code: string
    type: "balance" | "power" | "flexibility" | "extra"
    sportsmen_number: number
    equipment: string
    score: number
    description: string
    image: string
}

export interface Element {
    id: number
    code: string
    type: string
    sportsmenCount: number
    equipment: string
    score: number
    description: string
    imageUrl: string
}