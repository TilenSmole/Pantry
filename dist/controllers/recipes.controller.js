"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecepie = exports.getRecepies = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getRecepies(req, res, next) {
    try {
        // Fetch all recipes from the database
        const all_recepies = await prisma.recipes.findMany();
        console.log(all_recepies.length);
        // Format and send the response
        return res.status(200).json({ Recipies: all_recepies });
    }
    catch (error) {
        // Handle and log the error
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getRecepies = getRecepies;
async function addRecepie(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        console.log(userId);
        const { title, ingredients, instructions, amounts, imageUrl, prep_time, cook_time } = req.body;
        const all_recepies = await prisma.recipes.create({
            data: {
                name: title,
                ingredients: ingredients,
                amounts: amounts,
                instructions: instructions,
                cook_time: cook_time,
                prep_time: prep_time,
                imageUrl: imageUrl,
                userId: 1,
            }
        });
        return res.status(200).json("success!");
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.addRecepie = addRecepie;
