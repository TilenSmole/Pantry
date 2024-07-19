import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function getRecepies(req: Request, res: Response, next: NextFunction) {
    try {
     const all_recepies = await prisma.recipes.findMany({ })
  




      return res.status(200).json(all_recepies)
    } catch (error) {
      //console.error('Error:', error);
    }
  }