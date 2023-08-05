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
            return res.status(401).json({ message: "Please sign in"})
        }

        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })

        try {
            const {message, phraseId} = req.body.data
            if (!message.length) {
                return res.status(403).json({ message: "Comment cannot be empty"})
            }
            if (message.length > 300) {
                return res.status(403).json({ message: "Please write a shorter comment"})
            }
            const result = await prisma.comment.create({
                data: {
                    message: message,
                    userId: prismaUser?.id,
                    phraseId, 
                },
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Error has occured whilst making a phrase"})
        }
    }
   
    
}