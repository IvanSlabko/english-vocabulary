export type PhraseType = {
    phrase: string
    id: string
    createdAt: string
    user: {
        name: string
        image: string
        email: string
        id: string
    }
    comments?: {
        createdAt: string
        id: string
        phraseId: string
        userId: string
        message: string
        user: {
            name: string
            image: string
            email: string
            id: string
        }
    }[]
}