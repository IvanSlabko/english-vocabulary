'use client'

import AddComment from "@/app/components/AddComment"
import Phrase from "@/app/components/Phrase"
import { PhraseType } from "@/app/types/Phrase"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/phrases/${slug}`)
    return response.data
}

export default function PhraseDetail(url: URL) {
    const {data, isLoading} = useQuery({
        queryKey: ['detail-phrase'],
        queryFn: () => fetchDetails(url.params.slug)
    })
    if (isLoading) return "Loading..."
    return(
        <div>
            <Phrase 
                id={data?.id} 
                name={data.user.name} 
                avatar={data.user.image} 
                phrase={data.phrase} 
                comments={data.comments}
            />
            <AddComment id={data?.id}/>
            {data?.comments.map((comment) => (
                <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image
                            width={24}
                            height={24}
                            src={comment.user?.image}
                            alt="avatar"
                        />
                        <h3 className="font-bold">{comment.user?.name}</h3>
                        <h2 className="text-sm">{comment.createdAt}</h2>
                    </div>
                    <div className="py-4">
                        {comment.message}
                    </div>
                </div>
            ))}
        </div>
    )
}