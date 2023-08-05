import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
       
        try {
            const data = await prisma.phrase.findUnique({
                where: {
                    id: req.query.details,
                },
                include: {
                    user: true,
                    comments: {
                        orderBy: {
                            createdAt: "desc"
                        },
                        include: {
                            user: true
                        }
                    }
                }
            })
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Error has occured whilst making a phrase"})
        }
    }
   
    
}