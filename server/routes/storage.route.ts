import { addItemFromListMobile , getStorage, deleteItemMobile, addItemMobile, updateStorageMobile,updateStorageMobile2,cook,addToShoppingList} from "../controllers/storage.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.delete("/delete-storage-item-mobile",authenticateMiddlewareM, deleteItemMobile)



  router.put("/add-item-from-sList-mobile",authenticateMiddlewareM, addItemFromListMobile)
  router.get("/",authenticateMiddlewareM, getStorage)
  router.post("/add-storage-item-mobile",authenticateMiddlewareM, addItemMobile)
  router.put("/update-storage-mobile",authenticateMiddlewareM, updateStorageMobile)
  router.put("/update-storage-mobile2",authenticateMiddlewareM, updateStorageMobile2)
  router.put("/cook",authenticateMiddlewareM, cook)
  router.post("/add-to-shopping-list",authenticateMiddlewareM, addToShoppingList)

  

  module.exports = router
  