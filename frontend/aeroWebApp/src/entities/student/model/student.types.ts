export interface StudentDto {
    id: number
    name: string
    level: string
    parent_name: string
    parent_phone: string
    birth_date: string
}

export interface Student {
    id: number
    name: string
    level: string
    parentName: string
    parentPhone: string
    birthDate: Date
}

export interface NewStudent extends Omit<StudentDto, "id">{}