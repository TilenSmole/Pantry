import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function getShoppingListMobile(req: Request, res: Response, next: NextFunction) {
    try {

        const userId = res.locals.decodedToken.id;

        const items = await prisma.listItem.findMany({
            where: {
                userId: userId
            }
        })

        console.log(items);
        return res.status(200).json({ items: items });
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


       /* const newList = await prisma.shoppingList.create({
            data: {
                userId: userId,
                name: name, // Ensure name is included
                items: {
                    create: items.map((item) => ({
                        name: item.name,
                        quantity: item.quantity, // Ensure quantity is a string
                        checked: false, // Default to false if checked is not provided
                    })),
                },
            },
        });*/


        // return res.status(200).json(newList);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




export async function addShoppingListMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.decodedToken.id;
        const {   amount, ingredient } = req.body;  


        await prisma.listItem.create({
            data: {
                amount : amount, 
                ingredient : ingredient,
                userId : userId,
            },
        });


         return res.status(200).json();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export async function deleteItemMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.decodedToken.id;
        console.log('¸dsfdsasdds');

        const  {id}  = req.body;

        if(id){
            await prisma.listItem.delete({
                where: {
                    id : id
                }
                
            });
        }
   


         return res.status(200).json("Success!");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function updateShoppingListMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.decodedToken.id;
        const { amount, ingredient,item, id } = req.body;
   

            await prisma.listItem.update({
                where: {
                    id : Number(id)
                },
                data: {
                    amount : amount, 
                ingredient : ingredient,
                },
            });
    


         return res.status(200).json();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}