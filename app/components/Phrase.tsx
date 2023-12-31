'use client'
import Image from "next/image"
import Link from "next/link"

type PhraseProps = {
    avatar: string
    name: string
    phrase: string
    id: string,
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

export default function Phrase({avatar, name, phrase, id, comments}: PhraseProps) {
    return(
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{phrase}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
                <Link href={`/phrase/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length} Comments
                    </p>
                </Link>
            </div>
        </div>
    )
}