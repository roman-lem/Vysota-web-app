export interface Notification{
    id: string
    type: "error" | "info" | "success" | "warning"
    message: string
    createdAt: number
    duration: number
    persistent: boolean
    source: "http" | "api" | "ui" | "system" | "other"
    dedupeKey: string
}