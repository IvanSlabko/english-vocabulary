"use client"

import Image from "next/image"
import Toggle from "./Toggle"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-hot-toast"

type EditProps = {
    id: string
    avatar: string
    name: string
    phrase: string
    comments?: {
        id: string
        phraseId: string
        userId: string
    }[]
}

export default function EditPhrase({avatar, name, phrase, comments, id}: EditProps) {
    const [toggle, setToggle] = useState(false)
    let deletePhraseID: string
    const queryClient = useQueryClient()

    const {mutate} = useMutation(
        async (id: string) => 
            await axios.delete("/api/phrases/deletePhrase", {data: id}),
        {
            onError: (error) => {
                toast.error('Error deleting that phrase', {id: deletePhraseID})
            },
            onSuccess: (data) => {
                toast.success('Phrase has been deleted', {id: deletePhraseID})
                queryClient.invalidateQueries(["auth-phrases"])
            }
        }
    )

    const deletePhrase = () => {
        mutate(id)
    }

    return(
        <>
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
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length} Comments
                    </p>
                    <button onClick={(e) => setToggle(true)} className="text-sm font-bold text-red-500">Delete</button>
                </div>
            </div>
            {toggle && <Toggle deletePhrase={deletePhrase} setToggle={setToggle}/>}
        </>
    )
}