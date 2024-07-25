import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()



export async function getRecepies(req: Request, res: Response, next: NextFunction) {
    try {
        // Fetch all recipes from the database
        const all_recepies = await prisma.recipes.findMany();
console.log(all_recepies.length);
        // Format and send the response
        return res.status(200).json({ Recipies: all_recepies });
    } catch (error) {
        // Handle and log the error
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



  
export async function addRecepie(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.decodedToken.id;
      const { title, ingredients,instructions , imageUrl, prep_time, cook_time} = req.body;
console.log(ingredients);
     const all_recepies = await prisma.recipes.create({ 
        data:{
          name: title,
          ingredients: ingredients,
          instructions: instructions,
          cook_time: cook_time,
          prep_time: prep_time,
          imageUrl : imageUrl,
          userId :userId
        }

     })
  




      return res.status(200).json("success!")
    } catch (error) {
      console.error('Error:', error);
    }
  }