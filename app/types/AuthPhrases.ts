import { type } from "os";

export type AuthPhrases = {
    email: string
    id: string
    image: string
    name: string
    phrases: {
        createdAt: string
        id: string
        phrase: string
        comments?: {
            createdAt: string
            id: string
            phraseId: string
            phrase: string
            userId: string
        }
    }
}