import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

function convert(number1, number2, unit1, unit2) {
    var newAmount = "";
    console.log(unit1);
    console.log(unit2);

    console.log(number1);
    console.log(number2);
    if (unit1 && unit2 && unit1 === unit2 && unit1 === 'g' || unit1 === 'grams') {
        newAmount = (Number(number1) + Number(number2) >= 1000 ? (Number(number1) + Number(number2)) / 1000 + "kg" : Number(number1) + Number(number2) + "g")
    }
    else if (unit1 === 'g' || unit1 === 'grams' && unit2 === 'kg' || unit2 === 'kilograms') {
        newAmount = (Number(number1) + Number(number2) * 1000 >= 1000 ? (Number(number1) + Number(number2) * 1000) / 1000 + "kg" : Number(number1) + Number(number2) + "g")
    }
    else if (unit2 === 'g' || unit2 === 'grams' && unit1 === 'kg' || unit1 === 'kilograms') {
        newAmount = (Number(number1) * 1000 + Number(number2) >= 1000 ? (Number(number1) * 1000 + Number(number2)) / 1000 + "kg" : Number(number1) + Number(number2) + "g")
    }
    else if (unit2 === 'kg' && unit1 === 'kg') {
        newAmount = (Number(number1) + Number(number2) + "kg")
    }

    else if (unit1 && unit2 && unit1 === unit2 && unit1 === 'ml' || unit1 === 'ml') {
        newAmount = (Number(number1) + Number(number2) >= 1000 ? (Number(number1) + Number(number2)) / 1000 + "kg" : Number(number1) + Number(number2) + "g")
    }
    else if (unit1 === 'l' && unit2 === 'ml') {
        newAmount = (Number(number1) * 1000 + Number(number2) >= 1000 ? (Number(number1) * 1000 + Number(number2)) / 1000 + "L" : Number(number1) + Number(number2) + "ml")
    }
    else if (unit2 === 'l' && unit1 === 'ml') {
        newAmount = (Number(number1) + Number(number2) * 1000 >= 1000 ? (Number(number1) + Number(number2) * 1000) / 1000 + "L" : Number(number1) + Number(number2) + "ml")
    }
    else if (unit2 === 'l' && unit1 === 'l') {
        newAmount = (Number(number1) + Number(number2) + "l")
    }
    else
        return "-1"





    console.log(newAmount);

    return newAmount
}



async function processItems(amount, ingredient, userId, type, category): Promise<any> {
    const items = await prisma.storage.findMany();
    var newAmount = "";
    var newItem = "" as any;

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


            if (number1 && number2 && ((unit1 && unit2)))
                newAmount = convert(number1, number2, unit1.toLowerCase(), unit2.toLowerCase())
            else if (number1 && number2 && ((!unit1 && !unit2)))
                newAmount = String(Number(number1) + Number(number2))
            else
                newAmount = "-1"

            if (newAmount === "-1")
                continue


            if (category.length > 0) {
                const updatedCategory = Array.from(new Set([...category, ...item["category"]]))



                newItem = await prisma.storage.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        amount: newAmount,
                        category: updatedCategory
                    }

                });


            }

            else {
                newItem = await prisma.storage.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        amount: newAmount,

                    }

                });
            }





            return newItem
        }




    }
    if (category.length > 0) {
        newItem = await prisma.storage.create({
            data: {
                amount: amount,
                ingredient: ingredient,

                category: category,
                userId: userId
            }
        })
    }
    else {
        newItem = await prisma.storage.create({
            data: {
                amount: amount,
                ingredient: ingredient,

                category: [],
                userId: userId
            }
        })
    }




    return newItem
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
            processItems(item.amount, item.ingredient, userId, 0, []);




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
        const userId = res.locals.decodedToken.id;

        const { id } = req.body;

        if (id) {
            await prisma.storage.delete({
                where: {
                    id: id
                }

            });
        }
        const storage = await prisma.storage.findMany({
            where: {
                userId: userId
            }
        })

        return res.status(200).json({ storage: storage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function addItemMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.decodedToken.id;
        const { amount, ingredient, category } = req.body;



        const storage = await processItems(amount, ingredient, userId, 1, category);

        console.log(storage);



        return res.status(200).json({ storage: storage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function updateStorageMobile(req: Request, res: Response, next: NextFunction) {
    try {
        const { amount, ingredient, id } = req.body;
        const userId = res.locals.decodedToken.id;


        await prisma.storage.update({
            where: {
                id: Number(id)
            },
            data: {
                amount: amount,
                ingredient: ingredient,
            },
        });

        const storage = await prisma.storage.findMany({
            where: {
                userId: userId
            }
        })

        return res.status(200).json({ storage: storage });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function updateStorageMobile2(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, category } = req.body;
        const userId = res.locals.decodedToken.id;


        await prisma.storage.update({
            where: {
                id: Number(id)
            },
            data: {
                category: category,
            },
        });

        const storage = await prisma.storage.findMany({
            where: {
                userId: userId
            }
        })

        return res.status(200).json({ storage: storage });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



export async function addToShoppingList(req: Request, res: Response, next: NextFunction) {
    try {
        const {  ingredients, amounts } = req.body;
        const userId = res.locals.decodedToken.id;
        console.log(ingredients);
console.log(amounts);
        for (var i = 0; i < ingredients.length; i++) {
            await prisma.listItem.create({
                data: {
                    ingredient: ingredients[i] ? ingredients[i] : "",
                    amount: amounts[i] ? amounts[i] : "",
                    userId: userId
                },
            });
        }

        return res.status(200).json();

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function cook(req: Request, res: Response, next: NextFunction) {
    try {
        const {  ingredients, amounts } = req.body;
        const userId = res.locals.decodedToken.id;

        const UsersStorage = await prisma.storage.findMany({
            where: {
                userId: userId
            }
        })

        for (var i = 0; i < ingredients.length; i++) {
            for (var item in UsersStorage) {
                if (item["ingredient"] == ingredients[i]) {
                    var number1Match = item["amount"].match(/\d+(\.\d+)?/);
                    var number2Match = amounts[i].match(/\d+(\.\d+)?/);
                    console.log(number2Match);
                    console.log(number1Match);

                    var number1 = number1Match ? number1Match[0].toLowerCase() : null;
                    var number2 = number2Match ? number2Match[0].toLowerCase() : null;


                    var unit1Match = item["amount"].match(/[a-zA-Z]+/);
                    var unit2Match = amounts[i].match(/[a-zA-Z]+/);
                    var unit1 = unit1Match ? unit1Match[0] : null;
                    var unit2 = unit2Match ? unit2Match[0] : null;


                    if (number1 && number2) {
                        var newAmount = "";
                        if (number1 > number2 && unit1 == unit2)
                            newAmount = String(number1 - number2)
                        else if (number1 <= number2 && unit1 == unit2)
                            newAmount = "0g"
                        else if (number1 > (number2 * 1000) && (unit1 == "g" || unit1 == "grams") && (unit2 == "kg"))
                            newAmount = String(number1 - number2 * 1000)
                        else if (number1 <= (number2 * 1000) && (unit1 == "g" || unit1 == "grams") && (unit2 == "kg"))
                            newAmount = "0g"
                        else if (number2 > (number1 * 1000) && (unit2 == "g" || unit2 == "grams") && (unit1 == "kg"))
                            newAmount = String(number2 - number1 * 1000)
                        else if (number2 <= (number1 * 1000) && (unit2 == "g" || unit2 == "grams") && (unit1 == "kg"))
                            newAmount = "0g"


                        await prisma.storage.update({
                            where: {
                                id: item["id"]
                            },
                            data: {
                                amount: newAmount,
                            },
                        });

                    }
                }
            }
        }


        var storage = await prisma.storage.findMany({
            where: {
                id: Number(userId)
            },

        });




        return res.status(200).json({ storage: storage });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
