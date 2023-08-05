import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const data = await prisma.phrase.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                // orderBy: {
                //     createdAt: "desc",
                // }
            })
            res.status(200).json(data)
        } catch (error) {
            return res.status(403).json({ message: "Error fetching phrases"})
        }
    }
   
    
}