export type PhrasesType = {
    phrase: string
    id: string
    createdAt: string
    user: {
        name: string
        image: string
    }
    comments?: {
        createdAt: string
        id: string
        phraseId: string
        userId: string
    }[]
}