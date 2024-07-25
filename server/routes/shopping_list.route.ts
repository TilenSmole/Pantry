import { addShoppingList , getShoppingListMobile, addShoppingListMobile, deleteItemMobile} from "../controllers/shopping_list.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.get("/get-users-shopping-list-mobile",authenticateMiddlewareM, getShoppingListMobile)
  router.post("/add-a-shopping-list",authenticateMiddleware, addShoppingList)
  router.post("/add-a-shopping-list-mobile",authenticateMiddlewareM, addShoppingListMobile)
  router.delete("/delete-item-mobile", authenticateMiddlewareM, deleteItemMobile)

  module.exports = router
  