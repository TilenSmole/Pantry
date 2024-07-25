import { addItemFromListMobile } from "../controllers/recipes.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.post("/add-item-from-sList-mobile",authenticateMiddlewareM, addItemFromListMobile)




  module.exports = router
  