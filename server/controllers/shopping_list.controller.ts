import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function getShoppingList(req: Request, res: Response, next: NextFunction) {
    try {

        const userId = res.locals.decodedToken.id;

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const { password, ...userWithoutPassword } = user;

        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Error:', error);
    }
}



export async function addShoppingList(req: Request, res: Response, next: NextFunction) {
  try {
      const userId = res.locals.decodedToken.id;
      const { name, items } = req.body as { name: string; items: any[] };
      console.log(items);
console.log(name);

    
      const newList = await prisma.shoppingList.create({
          data: {
              userId: userId,
              name: name, // Ensure name is included
              items: {
                  create: items.map((item) => ({
                      name: item.name,
                      quantity: item.quantity, // Ensure quantity is a string
                      checked:  false, // Default to false if checked is not provided
                  })),
              },
          },
      });
   

     // return res.status(200).json(newList);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}