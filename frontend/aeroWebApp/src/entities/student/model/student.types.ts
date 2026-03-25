export interface Student {
    id: number
    name: string
    level: string
    parent_name: string
    parent_phone: string
    birth_date: string
}

export interface NewStudent extends Omit<Student, "id">{}