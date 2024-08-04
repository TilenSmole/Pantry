import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

function convert(number1, number2, unit1, unit2){
    var newAmount = "";
    console.log(unit1);
    console.log(unit2);

    console.log(number1);
    console.log(number2);
    if (unit1 && unit2 && unit1 === unit2 && unit1 === 'g' || unit1 === 'grams') {
        newAmount = (Number(number1) + Number(number2) >= 1000 ? (Number(number1) + Number(number2))/1000 + "kg": Number(number1) + Number(number2) +"g")	
    }
    else if(unit1 === 'g' || unit1 === 'grams' && unit2 === 'kg' || unit2 === 'kilograms'){
        newAmount = (Number(number1) + Number(number2)*1000 >= 1000 ? (Number(number1) + Number(number2)*1000)/1000 + "kg": Number(number1) + Number(number2) +"g")		
    }
    else if(unit2 === 'g' || unit2 === 'grams' && unit1 === 'kg' || unit1 === 'kilograms'){
        newAmount = (Number(number1)*1000 + Number(number2) >= 1000 ? (Number(number1)*1000 + Number(number2))/1000 + "kg": Number(number1) + Number(number2) +"g")	 	
    }
    else if(unit2 === 'kg' && unit1 === 'kg' ){
        newAmount = (Number(number1) + Number(number2) + "kg")	 	
    }

    else if (unit1 && unit2 && unit1 === unit2 && unit1 === 'ml' || unit1 === 'ml') {
        newAmount = (Number(number1) + Number(number2) >= 1000 ? (Number(number1) + Number(number2))/1000 + "kg": Number(number1) + Number(number2) +"g")	
    }
    else if(unit1 === 'l' && unit2 === 'ml' ){
        newAmount = (Number(number1)*1000 + Number(number2) >= 1000 ? (Number(number1)*1000 + Number(number2))/1000 + "L": Number(number1) + Number(number2) +"ml")		
    }
    else if(unit2 === 'l' && unit1 === 'ml'){
        newAmount = (Number(number1) + Number(number2)*1000 >= 1000 ? (Number(number1) + Number(number2)*1000)/1000 + "L": Number(number1) + Number(number2) +"ml")	 	
    }
    else if(unit2 === 'l' && unit1 === 'l' ){
        newAmount = (Number(number1) + Number(number2) + "l")	 	
    }
    else
    return "-1"





console.log(newAmount);

    return newAmount
}



async function processItems(amount, ingredient, userId) {
    const items = await prisma.storage.findMany();
    var newAmount = "";

    for (const item of items) {
        if (item.ingredient == ingredient) {
            var number1Match = item.amount.match(/\d+(\.\d+)?/);
            var number2Match = amount.match(/\d+(\.\d+)?/);
            console.log(number2Match);
            console.log(number1Match);

            var number1 = number1Match ? number1Match[0] : null; 
            var number2 = number2Match ? number2Match[0] : null;


            var unit1Match = item.amount.match(/[a-zA-Z]+/);
            var unit2Match = amount.match(/[a-zA-Z]+/);
            var unit1 = unit1Match ? unit1Match[0] : null; 
            var unit2 = unit2Match ? unit2Match[0] : null;


            if(number1 &&  number2 && ((unit1 && unit2)  ))
                newAmount = convert(number1, number2, unit1.toLowerCase(), unit2.toLowerCase())
            else if(number1 &&  number2 && ((!unit1 && !unit2)  ))
                newAmount =  String(Number(number1) + Number(number2))
            else
                newAmount = "-1"

            if(newAmount === "-1")
                continue           
           





            await prisma.storage.update({
                where: {
                    id: item.id
                },
                data: {
                    amount: newAmount,	

                }

            });

            
            return true
        }




    }

    await prisma.storage.create({
        data: {
            amount: amount,
            ingredient: ingredient,

            category: [],
            userId: userId
        }
    })



    return false
};





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

        if (item && id)
            processItems(item.amount, item.ingredient, userId);




        if (id) {
            await prisma.listItem.update({
                where: {
                    id: id
                },
                data: {
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


        const userId = res.locals.decodedToken.id;
        const storage = await prisma.storage.findMany({
            where: {
                userId: userId
            }
        }

        );
        return res.status(200).json({ storage: storage });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function deleteItemMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const  {id}  = req.body;

        if(id){
            await prisma.storage.delete({
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

export async function addItemMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.decodedToken.id;
        const { amount, ingredient, category } = req.body ;
 


        await prisma.storage.create({
            data: {
                userId: userId,
                amount: amount,
                ingredient: ingredient, 
                category : category
               
            },
        });


        return res.status(200).json("Success!");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function updateStorageMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const { amount, ingredient, id } = req.body;
   

            await prisma.storage.update({
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
