export interface MappedError {
    source: "http" | "api" | "ui" | "system" | "other"
    code: number
    message: string
}

