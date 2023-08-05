import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(401).json({ message: "Please sign in to add a phrase"})
        }
        const phrase: string = req.body.phrase
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })
        if (!phrase.length) {
            return res.status(403).json({ message: "Phrase cannot be empty"})
        }
        if (phrase.length > 300) {
            return res.status(403).json({ message: "Please write a shorter phrase"})
        }
        console.log(prismaUser.id)
        try {
            const result = await prisma.phrase.create({
                data: {
                    phrase,
                    userId: prismaUser.id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Error has occured whilst making a phrase"})
        }
    }
   
    
}