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


  
export async function addRecepie(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.decodedToken.id;
      const { title, ingredients,instructions , imageUrl, prep_time, cook_time} = req.body;

     const all_recepies = await prisma.recipes.create({ 
        data:{
          name: title,
          ingredients: ingredients,
          instructions: instructions,
          cook_time: cook_time,
          prep_time: prep_time,
          imageUrl : imageUrl
        }

     })
  




      return res.status(200).json("success!")
    } catch (error) {
      console.error('Error:', error);
    }
  }