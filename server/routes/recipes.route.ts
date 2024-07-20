import { getRecepies , addRecepie} from "../controllers/recipes.controller";
import   {authenticateMiddleware}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.get("/", getRecepies)
  router.post("/add-recipe",authenticateMiddleware, addRecepie)




  module.exports = router
  