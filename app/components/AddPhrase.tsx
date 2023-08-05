'use client'

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function AddPhrase() {
    const [phrase, setPhrase] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient()
    let toastPhraseId: string

    const { mutate } = useMutation(
        async (phrase: string) => await axios.post("api/phrases/addPhrase", { phrase }),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, {id: toastPhraseId})
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success('Phrase has been added', {id: toastPhraseId})
                queryClient.invalidateQueries(["phrases"])
                setPhrase("")
                setIsDisabled(false)
            }
        }
    )

    const submitPhrase = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate(phrase)
    }

    return (
        <form onSubmit={submitPhrase} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea 
                    onChange={(e) => setPhrase(e.target.value)} 
                    name="word" 
                    value={phrase}
                    placeholder="Add a phrase"
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                ></textarea>
            </div>
            <div className={`flex items-center justify-between gap-2`}>
                <p className={`font-bold text-sm ${phrase.length > 300 ? "text-red-700" : "text-gray-700"}`}>
                    {`${phrase.length} / 300`}
                </p>
                <button 
                    disabled={isDisabled}
                    className="text=sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Add a phrase
                </button>
            </div>
        </form>
    )
}