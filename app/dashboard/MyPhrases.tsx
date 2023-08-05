'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPhrases } from "../types/AuthPhrases"
import EditPhrase from "./EditPhrase"

const fetchAuthPhrases = async () => {
    const response = await axios.get("/api/phrases/authPhrases")
    return response.data
}

export default function MyPhrases() {
    const {data, isLoading} = useQuery<AuthPhrases>({queryFn: fetchAuthPhrases, queryKey: ["auth-phrases"]})
    if (isLoading) return <h1>Phrases are loading...</h1>
    console.log(data)
    return(
        <div>
            {data?.phrases?.map((phrase) => (
                <EditPhrase 
                    id={phrase.id}
                    key={phrase.id} 
                    avatar={data.image} 
                    name={data.name} 
                    phrase={phrase.phrase} 
                    comments={phrase.comments}/>
            ))}
        </div>
    )
}