import { getAccount, addShoppingList, getShoppingList } from "../controllers/account.controller";
import   {authenticateMiddleware}  from "../middleweartester"


  const express = require("express")
  
  const router = express.Router()

  router.get("/",authenticateMiddleware, getAccount)
  router.get("/get-users-shopping-list",authenticateMiddleware, getShoppingList)
  router.get("/add-a-shopping-list",authenticateMiddleware, addShoppingList)


  module.exports = router
  