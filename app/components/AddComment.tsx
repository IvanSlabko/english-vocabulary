'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { type } from "os"
import { useState } from "react"
import { toast } from "react-hot-toast"

type PhraseProps = {
    id?: string
}

type Comment = {
    phraseId?: string
    message: string
}

export default function AddComment({id}: PhraseProps) {
    const [message, setMessage] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let commentToastId: string

    const {mutate} = useMutation(
        async (data: Comment) => await axios.post("/api/phrases/addComment", {data}),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, {id: commentToastId})
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                setMessage("")
                setIsDisabled(false)
                queryClient.invalidateQueries(["detail-phrase"])
                toast.success("Added your comment", {id: commentToastId})
            }
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate({message, phraseId: id})
    }

    return (
        <form onSubmit={submitComment} className="my-8">
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    name="message"
                    className="p-4 text-lg rounded-md my-2"
                />
            </div>
            <div className="flex items-center gap-2">
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Add Comment
                </button>
                <p className={`font-bold ${message.length > 300 ? "text-red-700" : "text-grey-700"}`}
                >
                    {`${message.length}/300`}
                </p>
            </div>
        </form>
    )
}