//, editNote, GET

import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()



export async function addNote(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.decodedToken.id;
    const {  note, recipeID} = req.body;



    await prisma.notes.create({ 
      data:{
        userId: userId,
        note: note,
        recipeID: recipeID
       
      }

   })





    return res.status(200).json("success!")
  } catch (error) {
    console.error('Error:', error);
  }
}



export async function deleteNote(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.decodedToken.id;
    const { recipeID, noteId} = req.body;



    await prisma.notes.delete({ 
      where:    {
        id: noteId
      }   

     

   })

   const notes = await prisma.notes.findMany({ 
    where:{
      userId: (userId),
      recipeID: recipeID
      
     
    }

 })



    return res.status(200).json({notes: notes})
  } catch (error) {
    console.error('Error:', error);
  }
}


export async function editNote(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.decodedToken.id;
    const { recipeID, noteId, newNote} = req.body;



    await prisma.notes.update	({ 
      where:{
        userId: userId,
        recipeID: recipeID,
        id: noteId,
      },
      data:{
        note: newNote,
        
       
      }

   })

   const notes = await prisma.notes.findMany({ 
    where:{
      userId: userId,
      recipeID: recipeID
      
     
    }

 })



    return res.status(200).json({notes: notes})
  } catch (error) {
    console.error('Error:', error);
  }
}


export async function getNotes(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.decodedToken.id;

    const { recipeID} = req.body;

    if(userId &&  recipeID){
      const notes = await prisma.notes.findMany({ 
        where:{
          userId: userId,
          recipeID: recipeID,
          
         
        }
    
     })
     return res.status(200).json({notes: notes})

    }
  

  } catch (error) {
    console.error('Error:', error);
  }
}