'use client'

import axios from "axios"
import AddPhrase from "./components/AddPhrase"
import { useQuery } from "@tanstack/react-query"
import Phrase from "./components/Phrase"
import { PhrasesType } from "./types/Phrases"

const allPhrases = async() => {
  const response = await axios.get("/api/phrases/getPhrases")
  return response.data
}

export default function Home() {
  const {data, error, isLoading} = useQuery<PhrasesType[]>({
    queryFn: allPhrases,
    queryKey: ["phrases"],
  })
  if (error) return error
  if (isLoading) return "Loading..."

  return (
    <main>
      <AddPhrase/>
      {data?.map((phrase) => (
        <Phrase
          comments={phrase.comments}
          key={phrase.id}
          name={phrase.user.name} 
          avatar={phrase.user.image} 
          phrase={phrase.phrase}
          id={phrase.id}
        />
        )) 
      }
    </main>
  )
}
