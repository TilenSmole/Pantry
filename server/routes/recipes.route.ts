import { getRecepies , addRecepie} from "../controllers/recipes.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()

  router.get("/", getRecepies)
  router.post("/add-recipe",authenticateMiddleware, addRecepie)
  router.post("/add-recipe-mobile",authenticateMiddlewareM, addRecepie)


  router.post("/add-note",authenticateMiddlewareM, addRecepie)




  module.exports = router
  