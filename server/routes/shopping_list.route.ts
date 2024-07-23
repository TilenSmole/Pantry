import { addShoppingList , getShoppingList} from "../controllers/shopping_list.controller";
import   {authenticateMiddleware}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.get("/get-users-shopping-list",authenticateMiddleware, getShoppingList)
  router.post("/add-a-shopping-list",authenticateMiddleware, addShoppingList)



  module.exports = router
  