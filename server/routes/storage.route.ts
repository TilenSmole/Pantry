import { addItemFromListMobile , getStorage, deleteItemMobile, addItemMobile, updateStorageMobile} from "../controllers/storage.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.delete("/delete-storage-item-mobile",authenticateMiddlewareM, deleteItemMobile)



  router.put("/add-item-from-sList-mobile",authenticateMiddlewareM, addItemFromListMobile)
  router.get("/",authenticateMiddlewareM, getStorage)
  router.post("/add-storage-item-mobile",authenticateMiddlewareM, addItemMobile)
  router.put("/update-storage-mobile",authenticateMiddlewareM, updateStorageMobile)

  

  module.exports = router
  