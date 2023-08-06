import { UserType } from "./User"

export type CommentType = {
    createdAt: string
    id: string
    phraseId: string
    userId: string
    message: string
    user: UserType
}