import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(401).json({ message: "Please sign in"})
        }

        try {
            const phraseId = req.body
            const result = await prisma.phrase.delete({
                where: {
                    id: phraseId,
                },
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Error has occured whilst making a phrase"})
        }
    }
   
    
}