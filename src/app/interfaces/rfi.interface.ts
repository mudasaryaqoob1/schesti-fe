import { IUserInterface } from "./user.interface"

export interface IRFI {
    user: string | IUserInterface
    projectId: string
    description: string
    type: string
    file: File
    _id: string
    createdAt: string
    updatedAt: string
}
interface File {
    url: string
    type: string
    extension: string
    name: string
}
