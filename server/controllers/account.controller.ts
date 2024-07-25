import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function getAccount(req: Request, res: Response, next: NextFunction) {
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


export async function getAccountM(req: Request, res: Response, next: NextFunction) {
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
console.log(userWithoutPassword);
    console.log('çilj!');
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log('çilj!2');

    console.error('Error:', error);
  }
}

