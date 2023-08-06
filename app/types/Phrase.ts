import { CommentType } from "./Comment"
import { UserType } from "./User"

export type PhraseType = {
    phrase: string
    id: string
    createdAt: string
    user?: UserType
    comments?: CommentType[]
}