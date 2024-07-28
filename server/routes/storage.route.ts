import { addItemFromListMobile , getStorage} from "../controllers/storage.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.put("/add-item-from-sList-mobile",authenticateMiddlewareM, addItemFromListMobile)
  router.get("/",authenticateMiddlewareM, getStorage)




  module.exports = router
  