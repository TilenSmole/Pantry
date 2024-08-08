"use strict";
//, editNote, GET
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotes = exports.editNote = exports.deleteNote = exports.addNote = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addNote(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        const { note, recipeID } = req.body;
        await prisma.notes.create({
            data: {
                userId: userId,
                note: note,
                recipeID: recipeID
            }
        });
        return res.status(200).json("success!");
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.addNote = addNote;
async function deleteNote(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        const { recipeID, noteId } = req.body;
        await prisma.notes.delete({
            where: {
                id: noteId
            }
        });
        const notes = await prisma.notes.findMany({
            where: {
                userId: (userId),
                recipeID: recipeID
            }
        });
        return res.status(200).json({ notes: notes });
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.deleteNote = deleteNote;
async function editNote(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        const { recipeID, noteId, newNote } = req.body;
        await prisma.notes.update({
            where: {
                userId: userId,
                recipeID: recipeID,
                id: noteId,
            },
            data: {
                note: newNote,
            }
        });
        const notes = await prisma.notes.findMany({
            where: {
                userId: userId,
                recipeID: recipeID
            }
        });
        return res.status(200).json({ notes: notes });
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.editNote = editNote;
async function getNotes(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        const { recipeID } = req.body;
        if (userId && recipeID) {
            const notes = await prisma.notes.findMany({
                where: {
                    userId: userId,
                    recipeID: recipeID,
                }
            });
            return res.status(200).json({ notes: notes });
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.getNotes = getNotes;
