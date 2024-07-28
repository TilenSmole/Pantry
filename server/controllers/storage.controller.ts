import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import { deleteItemMobile } from "./shopping_list.controller"


const prisma = new PrismaClient()


export async function addItemFromListMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.decodedToken.id;
        const { id } = req.body;
        console.log(id);
        const item = await prisma.listItem.findFirst({
            where: {
                id: id
            }

        })
        console.log(item);


        if (item) {
            await prisma.storage.create({
                data: {
                    item: item.item,
                    category: [],
                    userId: userId
                }
            })
        }

        if (id) {
            await prisma.listItem.update({
                where: {
                    id: id
                },
                data:{
                    checked: true
                }

            });
        }



        return res.status(200).json("success!")
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function getStorage(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("userId");

        const userId = res.locals.decodedToken.id;
        console.log(userId);
        const storage = await prisma.storage.findMany({
            where: {
                userId: userId
            }
        }

        );
        console.log(storage);
        return res.status(200).json({ storage: storage });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
