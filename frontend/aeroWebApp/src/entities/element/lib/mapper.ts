import type { ElementDto, Element } from "../model/element.types";

enum Categories {
    balance = "Баланс",
    power = "Сила",
    flexibility = "Гибкость",
    extra = "Другое"
}


export function elementsMapper(dto: ElementDto[]): Element[] {
    return dto.map((elementDto): Element => {
        return {
            id: elementDto.id,
            code: elementDto.code,
            type: Categories[elementDto.type],
            sportsmenCount: elementDto.sportsmen_number,
            equipment: elementDto.equipment,
            score: elementDto.score,
            description: elementDto.description,
            imageUrl: elementDto.image
        }
    })
}